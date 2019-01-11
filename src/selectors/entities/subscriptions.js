/* External dependencies */
import { createSelector } from "reselect";
import without from "lodash/without";

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
 * Returns a map of all subscriptions in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} A map of all subscriptions.
 */
export const getSubscriptionsById = createEntityByIdSelector( "subscriptions" );

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
	getSubscriptions,
	subscriptions => {
		let upcomingRenewals = subscriptions.map( subscription => {
			const nextPayment = subscription.nextPayment ? new Date( subscription.nextPayment ) : null;
			const endDate = subscription.endDate ? new Date( subscription.endDate ) : null;
			const monthFromNow = new Date();
			monthFromNow.setMonth( monthFromNow.getMonth() + 1 );

			const expiresWithinMonth = ( nextPayment && nextPayment < monthFromNow ) || ( endDate && endDate < monthFromNow );
			const isUpcomingRenewal = subscription.status === "active" &&
				subscription.renewalUrl &&
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
