import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getGroupedSubscriptions, getIndividualSubscriptions } from "../selectors/subscriptions";
import SubscriptionsPage from "../components/account/subscriptions/SubscriptionsPage";
import { push } from "react-router-redux";
import { getOrders } from "../actions/orders";
import { getSearchQuery } from "../selectors/search";
import groupBy from "lodash/groupBy";
import _isEmpty from "lodash/isEmpty";

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
 * @param   {Array}  subscriptions Given subscriptions already filtered by mapSubscriptionToProps
 * @param   {string} query         The typed search query.
 * @returns {Array}                The filtered list of subscriptions.
 */
function filterSubscriptionsByQuery( subscriptions, query ) {
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
 * Groups subscriptions into an array, behind a key that is the subscription's product's glNumber.
 *
 * @param   {array}  subscriptions The subscriptions that should be grouped.
 * @returns {Object}               An object with glNumbers as keys, and all subscriptions belonging to that product in an array as values.
 */
function groupSubscriptionsByProduct( subscriptions ) {
	return groupBy( subscriptions, subscription => subscription.product.glNumber );
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
 * Sorts a list of subscriptions by either the nextPaymentDate (for WoocCommerce subscriptions),
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
const dateWithinOneMonth = ( date ) => {
	const currentDate = new Date();
	currentDate.setMonth( currentDate.getMonth() + 1 );
	return date.getTime() <= currentDate.getTime();
};

/**
 * Function that returns whether or not a subscription needs attention
 * @param { Subscription } subscription A subscription object
 * @returns { boolean } True when the subscription needs attention, False otherwise
 */
const needsAttention = ( subscription ) => {
	return (
		! _isEmpty( subscription.renewalUrl ) &&
		(
			[ "on-hold", "expired" ].includes( subscription.status ) ||
			( subscription.hasNextPayment &&
				subscription.status === "active" &&
				dateWithinOneMonth( subscription.nextPayment ) &&
				subscription.requiresManualRenewal
			) ||
			( subscription.hasEndDate &&
				subscription.status === "active" &&
				dateWithinOneMonth( subscription.endDate )
			)
		)
	);
};

/**
 * Function to get the subscriptions that need attention from an object of subscriptions
 * @param {Object} subscriptions The list of subscriptions
 * @returns {Object} An object of subscriptions that need attention
 */
const getAttentionSubscriptionsFromObject = ( subscriptions ) => {
	const attentionSubscriptions = {};
	// Loop over all the keys in the subscriptions if the length is greater than 0
	if ( Object.keys( subscriptions ).length > 0 ) {
		Object.keys( subscriptions ).map( key => {
			const subscriptionsArray = subscriptions[ key ];
			// Loop over all the subscriptions in the array (this can be 1 or more)
			subscriptionsArray.map( subscription => {
				// Check if there is a subscription that needs attention
				if ( needsAttention( subscription ) ) {
					// Set the needsAttention property and delete from the object
					subscription.needsAttention = true;
					attentionSubscriptions[ key ] = subscriptionsArray;
					delete subscriptions[ key ];
				}
			} );
		} );
	}
	return attentionSubscriptions;
};

/**
 * Function to get the subscriptions that need attention and filter them out of the other subscriptions
 * @param {object} groupedSubscriptions The grouped subscriptions
 * @param {object} individualSubscriptions The individual subscriptions
 * @returns {object} An empty object if there are no subscriptions that need attention, an object of subscriptions otherwise
 */
const getAttentionSubscriptions = ( groupedSubscriptions, individualSubscriptions ) => {
	return Object.assign(
		getAttentionSubscriptionsFromObject( groupedSubscriptions ),
		getAttentionSubscriptionsFromObject( individualSubscriptions ),
	);
};

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	// Map subscription to props.
	let groupedSubscriptions = getGroupedSubscriptions( state ).map( mapSubscriptionToProps );
	let individualSubscriptions = getIndividualSubscriptions( state ).map( mapSubscriptionToProps );

	// Sort subscriptions.
	groupedSubscriptions = sortByUpcomingPayment( groupedSubscriptions );
	individualSubscriptions = sortByUpcomingPayment( individualSubscriptions );

	// Filter queried subscriptions.
	const query = getSearchQuery( state );

	if ( query.length > 0 ) {
		groupedSubscriptions = filterSubscriptionsByQuery( groupedSubscriptions, query );
		individualSubscriptions = filterSubscriptionsByQuery( individualSubscriptions, query );
	}

	// Filter active subscriptions
	groupedSubscriptions = filterActiveSubscriptions( groupedSubscriptions );
	individualSubscriptions = filterActiveSubscriptions( individualSubscriptions );

	// Group subscriptions for same product
	groupedSubscriptions = groupSubscriptionsByProduct( groupedSubscriptions );
	individualSubscriptions = groupSubscriptionsByProduct( individualSubscriptions );

	const needsAttentionSubscriptions = getAttentionSubscriptions( groupedSubscriptions, individualSubscriptions );
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
