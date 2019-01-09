import { getSubscriptionById } from "../entities/subscriptions";
import _isUndefined from "lodash/isUndefined";
import { isRetrievingSites } from "./sites";
import { createSelector } from "reselect";

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

export const isSubscriptionPageLoading = createSelector(
	getSubscriptionById,
	isRequestingSubscriptions,
	isRetrievingSites,
	( sub, requestingSubs, retrievingSites ) => {
		return _isUndefined( sub ) || requestingSubs || retrievingSites;
	}
);
