import { SEARCH_QUERY_CHANGE } from "../actions/search";
import { LINK_SITE_POPUP_CLOSE, LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../actions/sites";

/**
 * Initial state
 */

const rootState = {
	ui: {
		search: {
			query: "",
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Sites object.
 */
export function uiSearch( state = rootState.ui.search, action ) {
	switch ( action.type ) {
		case SEARCH_QUERY_CHANGE:
			return Object.assign( {}, state, {
				query: action.query,
			} );
		case LINK_SITE_POPUP_CLOSE:
			return Object.assign( {}, state, {
				query: "",
			} );
		case LINK_SITE_SUCCESS:
			return Object.assign( {}, state, {
				query: "",
			} );
		case LINK_SITE_FAILURE:
			return Object.assign( {}, state, {
				query: "",
			} );
		default:
			return state;
	}
}
