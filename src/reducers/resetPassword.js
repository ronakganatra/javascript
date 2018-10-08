import {
	RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
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
			submitErrors: null,
			passwordResetSuccess: false,
		},
	},
};

/**
 * Reducers
 */

/* eslint-disable complexity */
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
		case RESET_PASSWORD_REQUEST:
			return Object.assign( {}, state, {
				submitErrors: null,
				loading: true,
				passwordResetSuccess: false,
			} );
		case RESET_PASSWORD_SUCCESS:
			return Object.assign( {}, state, {
				submitErrors: null,
				loading: false,
				passwordResetSuccess: true,
			} );
		case RESET_PASSWORD_FAILURE:
			return Object.assign( {}, state, {
				submitErrors: action.error,
				loading: false,
				passwordResetSuccess: false,
			} );
		default:
			return state;
	}
}
/* eslint-enable complexity */
