import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getGroupedSubscriptions, getIndividualSubscriptions } from "../selectors/subscriptions";
import SubscriptionsPage from "../components/SubscriptionsPage";
import { push } from "react-router-redux";
import { getOrders } from "../actions/orders";
import { getSearchQuery } from "../selectors/search";

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

	return {
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
