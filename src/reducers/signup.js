import {
	SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
} from "../actions/signup";

/**
 * Initial state
 */
const rootState = {
	ui: {
		signup: {
			loading: false,
			signupRequestSent: false,
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
export function uiSignupReducer( state = rootState.ui.signup, action ) {
	switch ( action.type ) {
		case SIGNUP_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				error: null,
				signupRequestSent: true,
			} );
		case SIGNUP_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				signupRequestSent: false,
			} );
		case SIGNUP_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: null,
				signupRequestSent: false,
			} );
		default:
			return state;
	}
}
