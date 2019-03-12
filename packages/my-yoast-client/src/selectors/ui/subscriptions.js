import { isRetrievingSites } from "./sites";
import { createSelector } from "reselect";
import { allOrdersLoaded } from "../entities/orders";
import { getSubscriptionsOrders } from "../entities/subscriptions";

/**
 * Returns the add subscription modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The add subscription modal state.
 */
export function getAddSubscriptionModal( state ) {
	return state.ui.addSubscriptionModal;
}

/**
 * Returns the subscription requesting state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The subscription requesting state.
 */
export function isRequestingSubscriptions( state ) {
	return state.ui.subscriptions.requesting;
}

/**
 * Returns true when the subscriptionPage does not have all the required data yet (ergo: is still loading).
 * @function
 *
 * @oaram   {Object} state The application state.
 *
 * @returns {Boolean}      Whether or not the SubscriptionPage is loading.
 */
export const isSubscriptionPageLoading = createSelector(
	isRequestingSubscriptions,
	isRetrievingSites,
	getSubscriptionsOrders,
	( requestingSubs, retrievingSites, orders ) => {
		return requestingSubs || retrievingSites || ! allOrdersLoaded( Object.values( orders ) );
	}
);

/**
 * The ui state for the subscription cancel modal.
 *
 * @param   {Object} state The application state.
 * @returns {Object}       An object containing relevant ui information for the subscription cancel modal.
 */
export const getCancelSubscriptionState = ( state ) => {
	return {
		cancelModalOpen: state.ui.subscriptionsCancel.modalOpen,
		cancelLoading: state.ui.subscriptionsCancel.loading,
		cancelSuccess: state.ui.subscriptionsCancel.success,
		cancelError: state.ui.subscriptionsCancel.error,
	};
};
