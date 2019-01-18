import { createSelector } from "reselect";
import { getPluginsForDownload, getEbooksForDownload } from "./products";

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

/**
 * Returns a list of ebooks that match the current search query.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of ebooks matching the search query.
 */
export const getQueryEbooks = createSelector(
	[ getEbooksForDownload, getSearchQuery ],
	( ebooks, query ) => {
		return query.length > 0
			? ebooks.filter( ebook => ebook.name.toUpperCase().includes( query.toUpperCase() ) )
			: ebooks;
	}
);

/**
 * Returns a list of plugins that match the current search query.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of plugins matching the search query.
 */
export const getQueryPlugins = createSelector(
	[ getPluginsForDownload, getSearchQuery ],
	( plugins, query ) => {
		return  query.length > 0
			? plugins.filter( plugin => plugin.name.toUpperCase().includes( query.toUpperCase() ) )
			: plugins;
	}
);
