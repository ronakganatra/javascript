/**
 * Returns whether the user is logging out.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The logging out state.
 */
export function isLoggingOut( state ) {
	return state.user.loggingOut;
}

/**
 * Returns the logout error from the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The logout error state.
 */
export function getLogoutError( state ) {
	return state.user.logoutError;
}

export const getPendingRequests = state => state.user.pendingRequests;
