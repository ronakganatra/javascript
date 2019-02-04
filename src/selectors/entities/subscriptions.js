/* External dependencies */
import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import _flatMap from "lodash/flatMap";
import without from "lodash/without";

/* Internal dependencies */
import { createAllOfEntitySelector, createEntityByIdSelector } from "./factories";
import { getOrdersById } from "./orders";
import { getAllSites } from "./sites";
import { getProductGroupsByParentSlug, getProductsByProductGroupId } from "../../functions/productGroups";
import { getProductGroups } from "./productGroups";
import { getProducts } from "./products";
import { sortPluginsByPopularity } from "../../functions/products";

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
 * Gets the orders belonging to all subscriptions, with subscription.id as a key.
 *
 * @function
 *
 * @param {Object} state The application state.
 *
 * @returns {Object}     An object with the orders connected to each subscription as values behind subscription.id keys.
 */
export const getSubscriptionsOrders = createSelector(
	getSubscriptions,
	getOrdersById,
	( subscriptions, ordersById ) => {
		const ordersBySubscription = {};
		subscriptions.forEach( ( sub ) => {
			ordersBySubscription[ sub.id ] = sub.orders.map( orderId => ordersById[ orderId ] );
		} );
		return ordersBySubscription;
	}
);

/**
 * Returns the subscriptions that are active or pending-cancel.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The subscriptions that are active or pending-cancel.
 */
export const getActivatableSubscriptions = createSelector(
	getSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.status === "active" || subscription.status === "pending-cancel"
	)
);

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
	getActivatableSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.status === "active"
	)
);

/**
 * Returns the subscriptions that will need to be manually renewed within the month to remain active for the renewalNotification container.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All active subscriptions that require manual renewal, have a renewal URL and  expire within the month.
 */
export const getUpcomingRenewalSubscriptions = createSelector(
	getActiveSubscriptions,
	subscriptions => {
		let upcomingRenewals = subscriptions.map( subscription => {
			const nextPayment = subscription.nextPayment ? new Date( subscription.nextPayment ) : null;
			const endDate = subscription.endDate ? new Date( subscription.endDate ) : null;
			const monthFromNow = new Date();
			monthFromNow.setMonth( monthFromNow.getMonth() + 1 );

			const expiresWithinMonth = ( nextPayment && nextPayment < monthFromNow ) || ( endDate && endDate < monthFromNow );
			const isUpcomingRenewal = subscription.renewalUrl &&
				expiresWithinMonth &&
				subscription.requiresManualRenewal;

			if ( ! isUpcomingRenewal ) {
				return null;
			}

			return {
				id: subscription.id,
				name: subscription.name,
				hasNextPayment: subscription.nextPayment !== null,
				nextPayment: nextPayment || endDate,
				endDate: subscription.endDate ? new Date( subscription.endDate ) : null,
				status: subscription.status,
				renewalUrl: subscription.renewalUrl,
			};
		} );

		// Removing nulls from the array.
		upcomingRenewals = without( upcomingRenewals, null );

		// Sorting upcoming renewals by nextPayment date.
		upcomingRenewals = upcomingRenewals.sort( ( a, b ) => {
			return new Date( a.nextPayment || a.endDate ) - new Date( b.nextPayment || b.endDate );
		} );

		return upcomingRenewals;
	}
);

export const getActivatableSubscriptionsWithProductInformation = createSelector(
	getActivatableSubscriptions,
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
 * @returns {Array}      The subscriptions that belong to only one productGroup with a parentId.
 */
export const getIndividualSubscriptions = createSelector(
	getSubscriptions,
	subscriptions => subscriptions.filter( subscription =>
		subscription.product.productGroups.length === 1 &&
		subscription.product.productGroups[ 0 ].parentId
	)
);

/**
 * Get the sites that are connected to the subscription.
 *
 * @function
 *
 * @param {Object} state The application state.
 *
 * @returns {Object}     Object with subscription ids as keys and arrays of sites as values.
 */
export const getSubscriptionsSites = createSelector(
	getAllSites,
	getSubscriptions,
	( sites, subscriptions ) => {
		const subscriptionsSites = {};
		if ( ! isEmpty( sites ) ) {
			subscriptions.forEach(
				( sub ) => {
					subscriptionsSites[ sub.id ] = sites
						.filter( site => site.subscriptions.includes( sub.id ) );
				}
			);
		}
		return subscriptionsSites;
	}
);

/**
 * Get the subscriptions that are connected to the same order in WooCommerce
 *
 * @param {Object}   state The application state.
 *
 * @returns {Object}       All subscriptions that are connected to a certain subscription,
 *                         as an array behind that certain subscription's id.
 */
export const getConnectedSubscriptions = createSelector(
	getSubscriptions,
	( subs ) => {
		const connectedSubscriptions = {};
		if ( ! isEmpty( subs ) ) {
			subs.forEach(
				( sub ) => {
					connectedSubscriptions[ sub.id ] = subs
						.filter( subscription => subscription.sourceId === sub.sourceId )
						.filter( subscription => subscription.id !== sub.id );
				}
			);
		}
		return connectedSubscriptions;
	}
);

/**
 * Get the sites that are related to the connected subscriptions.
 *
 * @function
 *
 * @param   {Object} state The Application state.
 *
 * @returns {Object}       Object with key: subscription id and value: all sites connected to subscriptions
 *                         that came in the same order as the subscription in the key.
 */
export const getConnectedSubscriptionsSites = createSelector(
	getConnectedSubscriptions,
	getSubscriptionsSites,
	( allConnectedSubscriptions, subscriptionsSites ) => {
		const connectedSubscriptionsSites = {};
		if ( ! isEmpty( subscriptionsSites ) ) {
			Object.keys( allConnectedSubscriptions ).forEach(
				( subId ) => {
					// Get the connected subscriptions for this specific subscription.
					const connectedSubscriptions = allConnectedSubscriptions[ subId ];
					// Flatmap all the sites of the connected subscriptions to the return object.
					connectedSubscriptionsSites[ subId ] = _flatMap(
						connectedSubscriptions,
						connectedSub => subscriptionsSites[ connectedSub.id ]
					);
				}
			);
		}
		return connectedSubscriptionsSites;
	}
);

/**
 * Gets the products that are in subscriptions
 *
 * @function
 *
 * @param {Object} The application state.
 *
 * @returns {Array} The products in the subscription.
 */
export const getSubscriptionsProducts = createSelector(
	getSubscriptions,
	state => getProducts( state ),
	getProductGroups,
	( subscriptions, allProducts, allProductGroups ) => {
		const subscriptionsProducts = {};
		subscriptions.forEach(
			( subscription ) => {
				if ( ! subscription.product.productGroups ) {
					/*
					If this product has no productGroups attached to it, we can not find potential other products via the productGroups.
					Best guess is to at least return the product inside an array to be in line with expected behaviour for this function.
					If the subscription does not even have a product, return an empty array.
					 */
					subscriptionsProducts[ subscription.id ] = subscription.product ? [ subscription.product ] : [];
					return;
				}
				let subscriptionProductGroups = subscription.product.productGroups;

				// If at least one productGroup doesn't have a parent.
				if ( subscriptionProductGroups.some( productGroup => productGroup.parentId === null ) ) {
					// Retrieve the child product groups for the parent product group.
					subscriptionProductGroups = _flatMap( subscriptionProductGroups, ( productGroup ) => {
						return getProductGroupsByParentSlug( productGroup.slug, allProductGroups );
					} );
				}

				// Sort and return the products for the product groups.
				subscriptionsProducts[ subscription.id ] = sortPluginsByPopularity(
					_flatMap(
						subscriptionProductGroups,
						productGroup => getProductsByProductGroupId( productGroup.id, allProducts )
					)
				);
			}
		);
		return subscriptionsProducts;
	}
);
