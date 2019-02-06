import {
	CONNECT_FAILURE, CONNECT_REQUEST, CONNECT_SUCCESS,
} from "../actions/connect";

/**
 * Initial state
 */
const rootState = {
	ui: {
		connect: {
			doingRequest: false,
			error: null,
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
export function uiConnectReducer( state = rootState.ui.connect, action ) {
	switch ( action.type ) {
		case CONNECT_REQUEST:
			return Object.assign( {}, state, {
				doingRequest: true,
				error: null,
			} );
		case CONNECT_SUCCESS:
			return Object.assign( {}, state, {
				doingRequest: false,
			} );
		case CONNECT_FAILURE:
			return Object.assign( {}, state, {
				doingRequest: false,
				error: action.error,
			} );
		default:
			return state;
	}
}
/* eslint-enable complexity */
