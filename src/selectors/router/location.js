/**
 * Returns the router location pathname state.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The router location pathname state.
 */
export function getPathname( state ) {
	return state.router.location.pathname;
}
