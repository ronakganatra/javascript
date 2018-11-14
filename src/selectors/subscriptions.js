import { getAllOfEntity, getEntityById } from "./entities";

/**
 * Returns all subscriptions in the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All subscriptions.
 */
export function getSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" );
}

/**
 * Returns a subscription with a given ID.
 *
 * @param {Object} state Application state.
 * @param {string} id ID of the subscription to retrieve.
 *
 * @returns {Object} The subscription object.
 */
export function getSubscription( state, id ) {
	return getEntityById( state, "subscriptions", id );
}

/**
 * Returns the subscriptions that belong to a productGroup that gives access to more than one product.
 *
 * @param   {Object} state Application state.
 * @returns {Array}        The subscriptions that belong to productGroups with no parentId, or to multiple productGroups.
 */
export function getGroupedSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" )
		.filter( subscription =>
			subscription.product.productGroups.length > 1 ||
			( subscription.product.productGroups[ 0 ] && ! subscription.product.productGroups[ 0 ].parentId )
		);
}

/**
 * Returns the subscriptions that belong to a productGroup that gives access to only one product.
 *
 * @param   {Object} state Application state.
 * @returns {Array}        The subscriptions that belong to only one productGroup with a parentId.
 */
export function getIndividualSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" )
		.filter( subscription => subscription.product.productGroups.length === 1 && subscription.product.productGroups[ 0 ].parentId );
}
