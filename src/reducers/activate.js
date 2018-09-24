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
			activationError: null,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the activate object within the ui object.
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
				activationError: null,
			} );
		case ACTIVATE_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				activationError: action.error,
			} );
		case ACTIVATE_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				activationError: null,
			} );
		default:
			return state;
	}
}
