/**
 * Returns the search query in the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The current search query.
 */
export function getSearchQuery( state ) {
	return state.ui.search.query;
}
