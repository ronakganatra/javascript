/* External dependencies */
import { createSelector } from "reselect";

/* Internal dependencies */
import { createAllOfEntitySelector, createEntityByIdSelector } from "./factories";

/**
 * Returns all subscriptions in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All subscriptions.
 */
export const getSubscriptions = createAllOfEntitySelector( "subscriptions" );

/**
 * Returns all subscriptions in the state ordered by ID.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All subscriptions ordered by ID.
 */
export const getAllSubscriptionsById = createEntityByIdSelector( "subscriptions" );

/**
 * Returns the subscriptions that are active.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The subscriptions that are active.
 */
export const getActiveSubscriptions = createSelector(
	getSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.status === "active" || subscription.status === "pending-cancel"
	)
);

export const getActiveSubscriptionsWithProductInformation = createSelector(
	getActiveSubscriptions,
	subscriptions => subscriptions.map( subscription =>
		Object.assign(
			{},
			{ productLogo: subscription.product.icon },
			subscription,
			{ price: subscription.product.price }
		)
	)
);

/**
 * Returns the subscriptions that belong to a productGroup that gives access to more than one product.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array}        The subscriptions that belong to productGroups with no parentId, or to multiple productGroups.
 */
export const getGroupedSubscriptions = createSelector(
	getSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.product.productGroups.length > 1 ||
		( subscription.product.productGroups[ 0 ] && ! subscription.product.productGroups[ 0 ].parentId )
	)
);

/**
 * Returns the subscriptions that belong to a productGroup that gives access to only one product.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array}        The subscriptions that belong to only one productGroup with a parentId.
 */
export const getIndividualSubscriptions = createSelector(
	getSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.product.productGroups.length === 1 &&
		subscription.product.productGroups[ 0 ].parentId
	)
);
