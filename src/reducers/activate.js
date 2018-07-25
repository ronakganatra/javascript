import {
	ACTIVATE_FAILURE, ACTIVATE_REQUEST, ACTIVATE_SUCCESS,
} from "../actions/signup";

/**
 * Initial state
 */
const rootState = {
	ui: {
		activate: {
			loading: false,
			error: null,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the orders object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui object.
 */
export function uiActivateReducer( state = rootState.ui.activate, action ) {
	switch ( action.type ) {
		case ACTIVATE_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				error: null,
			} );
		case ACTIVATE_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
			} );
		case ACTIVATE_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: null,
			} );
		default:
			return state;
	}
}
