import {
	LOGIN_FAILURE, LOGIN_OAUTH_FAILURE, LOGIN_REQUEST, LOGIN_OAUTH_RESET,
} from "../actions/login";
import { LOGIN } from "../actions/user";


/**
 * Initial state
 */
const rootState = {
	ui: {
		login: {
			loading: false,
			error: null,
			oauthError: false,
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
export function uiLoginReducer( state = rootState.ui.login, action ) {
	switch ( action.type ) {
		case LOGIN:
			return Object.assign( {}, state, {
				loading: false,
				error: null,
			} );
		case LOGIN_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
			} );
		case LOGIN_OAUTH_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				oauthError: true,
			} );
		case LOGIN_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: null,
			} );
		case LOGIN_OAUTH_RESET:
			return Object.assign( {}, state, {
				error: null,
				oauthError: false,
			} );
		default:
			return state;
	}
}
