import { getAllOfEntity } from "./entities";

/**
 * Returns all subscriptions in the state.
 *
 * @param {Object} state Application state.
 * @returns {Array} All subscriptions.
 */
export function getSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" );
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
