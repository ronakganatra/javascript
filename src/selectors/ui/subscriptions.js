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
