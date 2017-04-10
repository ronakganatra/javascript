/**
 * Action types
 */

export const SEARCH_QUERY_CHANGE = "SEARCH_QUERY_CHANGE";

/**
 * Action creators
 */

/**
 * An action creator for the text that is entered in the Search bar.
 * @param {string} query Text entered in the search bar.
 * @returns {Object} The onSearchQueryChange action.
 */
export function onSearchQueryChange( query ) {
	return {
		type: SEARCH_QUERY_CHANGE,
		query: query,
	};
}
