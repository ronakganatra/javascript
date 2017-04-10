import { SEARCH_QUERY_CHANGE } from "../actions/search";

/**
 * Initial state
 */

const rootState = {
	entities: {
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
export function entitiesSearch( state = rootState.entities.search, action ) {
	switch ( action.type ) {
		case SEARCH_QUERY_CHANGE:
			return Object.assign( {}, state, {
				query: action.query,
			} );
		default:
			return state;
	}
}
