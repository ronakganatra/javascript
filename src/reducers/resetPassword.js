import {
	SEND_RESET_PASSWORD_EMAIL_FAILURE,
	SEND_RESET_PASSWORD_EMAIL_REQUEST,
	SEND_RESET_PASSWORD_EMAIL_SUCCESS,
} from "../actions/resetPassword";

/**
 * Initial state
 */
const rootState = {
	ui: {
		resetPassword: {
			loading: false,
			error: null,
			passwordRequestSent: false,
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
export function uiResetPasswordReducer( state = rootState.ui.resetPassword, action ) {
	switch ( action.type ) {
		case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				error: null,
				passwordRequestSent: true,
			} );
		case SEND_RESET_PASSWORD_EMAIL_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				passwordRequestSent: false,
			} );
		case SEND_RESET_PASSWORD_EMAIL_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: null,
				passwordRequestSent: false,
			} );
		default:
			return state;
	}
}
