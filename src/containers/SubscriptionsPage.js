import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getAllSubscriptions } from "../actions/subscriptions";
import SubscriptionsPage from "../components/account/subscriptions/SubscriptionsPage";
import { push } from "react-router-redux";
import { getOrders } from "../actions/orders";
import { getSearchQuery } from "../selectors/search";
import groupBy from "lodash/groupBy";
import _isEmpty from "lodash/isEmpty";
import _flow from "lodash/flow";
import _differenceBy from "lodash/differenceBy";
import { getAllOfEntity } from "../selectors/entities";

/**
 * Maps a subscription to the props of a subscription.
 *
 * @param   {Object} subscription Subscription in the state
 * @returns {Object}              Subscription for the component.
 */
function mapSubscriptionToProps( subscription ) {
	const hasSites = ! (
		subscription.product.productGroups.length === 1 &&
		subscription.product.productGroups[ 0 ].slug === "all-courses"
	);

	return {
		id: subscription.id,
		icon: subscription.product.icon,
		name: subscription.name,
		used: subscription.used,
		limit: subscription.limit,
		subscriptionNumber: subscription.subscriptionNumber,
		requiresManualRenewal: subscription.requiresManualRenewal,
		hasNextPayment: subscription.nextPayment !== null,
		nextPayment: new Date( subscription.nextPayment ),
		hasEndDate: subscription.endDate !== null,
		endDate: new Date( subscription.endDate ),
		billingAmount: subscription.price,
		billingCurrency: subscription.currency,
		status: subscription.status,
		hasSites,
		product: subscription.product || {},
		renewalUrl: subscription.renewalUrl,
	};
}

/**
 * Filters a list of subscriptions based on the given search query.
 *
 * @param   {string} query         The typed search query.
 * @param   {Array}  subscriptions Given subscriptions already filtered by mapSubscriptionToProps
 * @returns {Array}                The filtered list of subscriptions.
 */
function filterSubscriptionsByQuery( query, subscriptions ) {
	if ( query.length < 1 ) {
		return subscriptions;
	}
	return subscriptions.filter( ( subscription ) => {
		const formattedDate = new Intl.DateTimeFormat( "en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		} ).format( subscription.nextPayment );

		return subscription.name.toUpperCase().includes( query.toUpperCase() ) ||
			subscription.limit.toString() === query ||
			subscription.used.toString() === query ||
			formattedDate.toUpperCase().includes( query.toUpperCase() ) ||
			(
				subscription.billingAmount / 100
			).toString().includes( query.toUpperCase() );
	} );
}

/**
 * Groups subscriptions into an object, behind a key that is the subscription's product's glNumber.
 *
 * @param   {Object}  subscriptionsByType The subscriptions that should be grouped.
 * @returns {Object}                      An object with subscription type as key,
 *                                        and all subscriptions belonging to that type,
 *                                        grouped in an object with glNumbers as keys.
 */
function groupSubscriptionsByProduct( subscriptionsByType ) {
	const subscriptionTypes = Object.keys( subscriptionsByType );
	return subscriptionTypes.reduce( ( groupedObject, key ) => {
		groupedObject[ key ] = groupBy( subscriptionsByType[ key ], subscription => subscription.product.glNumber );
		return groupedObject;
	}, {} );
}

/**
 * Determines whether this subscription is an individual subscription or a "grouped" subscription (gives access to multiple products).
 *
 * @param   {Object}  subscription The subscription to check.
 * @returns {boolean}              Whether the subscription is grouped or not.
 */
function isGrouped( subscription ) {
	if ( ! Array.isArray( subscription.product.productGroups ) || ! subscription.product.productGroups.length > 0 ) {
		return false;
	}
	const grantsAccessToMultipleProducts = subscription.product.productGroups.length > 1;
	const productGroupHasParent = subscription.product.productGroups[ 0 ].parentId;
	return  grantsAccessToMultipleProducts || ! productGroupHasParent;
}

/**
 * Filters the active subscriptions.
 *
 * @param   {Array} subscriptions The subscriptions to be filtered.
 * @returns {Array}               The active subscriptions.
 */
function filterActiveSubscriptions( subscriptions ) {
	return subscriptions.filter( ( subscription ) => {
		if ( ! subscription.hasEndDate ) {
			return true;
		}

		const currentDate = new Date();
		const endDate = new Date( subscription.endDate );
		endDate.setMonth( endDate.getMonth() + 1 );

		return currentDate.getTime() <= endDate.getTime();
	} );
}

/**
 * Sorts a list of subscriptions by either the nextPaymentDate (for WooCommerce subscriptions),
 * or endDate (in the case of EDD subscriptions that are active).
 *
 * @param   {Array} subscriptions Given subscriptions already filtered by mapSubscriptionToProps
 *
 * @returns {Array}               The sorted list of subscriptions.
 */
function sortByUpcomingPayment( subscriptions ) {
	return subscriptions
		.map( ( subscription ) => {
			let paymentDate;
			if ( subscription.hasEndDate && subscription.status === "active" ) {
				paymentDate = subscription.endDate;
			} else {
				paymentDate = subscription.nextPaymentDate;
			}
			subscription.paymentDate = paymentDate;
			return subscription;
		} )
		.sort( ( a, b ) => a.paymentDate - b.paymentDate );
}

/**
 * Function to check if the date is within one month from now
 * @param { Date } date Contains the date that needs to be checked
 * @returns {boolean} True if date is within one month from now, false otherwise.
 */
function dateWithinOneMonth( date ) {
	const currentDate = new Date();
	currentDate.setMonth( currentDate.getMonth() + 1 );
	return date.getTime() <= currentDate.getTime();
}

/**
 * Returns true if the status is active
 *
 * @param   { Object }  subscription The subscription
 * @returns { boolean }              True if subscription.status is "active", false otherwise
 */
function isActive( subscription ) {
	return subscription.status === "active";
}

/**
 * Returns true if the status is on-hold
 *
 * @param   { Object }  subscription The subscription
 * @returns { boolean }              True if subscription.status is "on-hold", false otherwise
 */
function isOnHold( subscription ) {
	return subscription.status === "on-hold";
}

/**
 * Returns true if the status is expired, false otherwise
 * @param   { Object }  subscription The subscription
 * @returns { boolean }              True if subscription.status is "expired", false otherwise
 */
function isExpired( subscription ) {
	return subscription.status === "expired";
}

/**
 * Returns true if the status is active and the subscription needs to be renewed manually within a month.
 *
 * @param   { Object }  subscription The subscription
 * @returns { boolean }              See above.
 */
function shouldBeManuallyRenewedWithinMonth( subscription ) {
	return ( subscription.hasNextPayment &&
		isActive( subscription ) &&
		dateWithinOneMonth( subscription.nextPayment ) &&
		subscription.requiresManualRenewal
	);
}

/**
 * Returns true if the status is active and the subscription is ending within a month.
 *
 * @param   { Object }  subscription The subscription
 * @returns { boolean }              See above.
 */
function endsWithinMonth( subscription ) {
	return ( subscription.hasEndDate &&
		isActive( subscription ) &&
		dateWithinOneMonth( subscription.endDate )
	);
}

/**
 * Function that returns whether or not a subscription needs attention
 * @param { subscription } subscription A subscription object
 * @returns { boolean } True when the subscription needs attention, False otherwise
 */
function needsAttention( subscription ) {
	if ( _isEmpty( subscription.renewalUrl ) ) {
		return false;
	}

	const pastNeedsAttention = isOnHold( subscription ) || isExpired( subscription );
	const futureNeedsAttention = shouldBeManuallyRenewedWithinMonth( subscription ) || endsWithinMonth( subscription );

	return ( pastNeedsAttention || futureNeedsAttention );
}

/**
 * Transforms the array of subscriptions to an object in which the array is split according to type.
 * @param {Array}   subscriptions The array to be transformed.
 * @returns {Object}               The object with the array split according to type.
 */
function splitSubscriptionsByType( subscriptions ) {
	const needsAttentionSubscriptions = subscriptions.filter( needsAttention );
	const remainingSubscriptions = _differenceBy( subscriptions, needsAttentionSubscriptions, sub => sub.id );
	return {
		needsAttentionSubscriptions: needsAttentionSubscriptions,
		groupedSubscriptions: remainingSubscriptions.filter( isGrouped ),
		individualSubscriptions: remainingSubscriptions.filter( sub => ! isGrouped( sub ) ),
	};
}

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	// Filter queried subscriptions.
	const query = getSearchQuery( state );

	const subscriptions = getAllOfEntity( state, "subscriptions" ).map( mapSubscriptionToProps );

	const subscriptionPipeline = _flow( [
		// Filter queried subscriptions.
		filterSubscriptionsByQuery.bind( null, query ),
		// Sort subscriptions.
		sortByUpcomingPayment,
		// Filter active subscriptions.
		filterActiveSubscriptions,
		// Group by subscription type.
		splitSubscriptionsByType,
		// Group by product sku.
		groupSubscriptionsByProduct,
	] );

	const {
		needsAttentionSubscriptions,
		groupedSubscriptions,
		individualSubscriptions,
	} = subscriptionPipeline( subscriptions );

	return {
		needsAttentionSubscriptions,
		groupedSubscriptions,
		individualSubscriptions,
		query,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onManage: ( subscriptionId ) => {
			dispatch( push( "/account/subscriptions/" + subscriptionId ) );
		},
		loadData: () => {
			dispatch( getOrders() );
			dispatch( getAllSubscriptions() );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionsPage );

export default SubscriptionsPageContainer;
