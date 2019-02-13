/**
 * Returns whether the user is logged in.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} Whether the user is logged in.
 */
export function isLoggedIn( state ) {
	return state.user.loggedIn;
}

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

/**
 * Get the number of pending request for the current user.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The pendingRequests for the current user.
 */
export const getPendingRequests = state => state.user.pendingRequests;
