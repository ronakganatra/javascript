import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../actions/user";
import {
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_FAILURE,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_EMAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_SUCCESS,
} from "../actions/user";
import reduceReducers from "reduce-reducers";

const initialState = {
	// Whether or not the user is enabled.
	enabled: true,

	// Whether or not the user is currently logged in.
	loggedIn: false,

	// Whether or not we are fetching the logged in user data.
	isFetching: false,

	// The currently active & valid access token.
	accessToken: "",

	// The user ID for fetching the user.
	userId: null,

	// The email in the UI.
	email: "",

	// The userdata as retrieved from the server.
	data: {
		profile: {
			username: "",
			email: "",
		},
	},

	savingProfile: false,
	savingError: "",
	sendingPasswordReset: false,
	sendPasswordReset: false,
	passwordResetError: "",
};

/**
 *  A reducer for the default user object.
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occurred.
 * @returns {Object} The new state for the store.
 */
export function userDataReducer( state = initialState, action ) {
	switch ( action.type ) {
		case LOGIN:
			return Object.assign( {}, state, {
				loggedIn: true,
				accessToken: action.data.accessToken,
				userId: action.data.userId,
			} );
		case LOGOUT:
			return Object.assign( {}, state, {
				loggedIn: false,
				accessToken: "",
				userId: null,
			} );
		case FETCH_USER_REQUEST:
			return Object.assign( {}, state, {
				isFetching: true,
			} );
		case FETCH_USER_SUCCESS:
			return Object.assign( {}, state, {
				data: action.user,
				email: action.user.profile.email,
				enabled: action.user.profile.enabled,
				isFetching: false,
			} );
		default:
			return state;
	}
}

/**
 *  A reducer for the email string within the user object.
 *
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occurred.
 * @returns {Object} The new state for the store.
 */
export function userEmailReducer( state = initialState, action ) {
	switch ( action.type ) {
		case PROFILE_UPDATE_REQUEST:
			return Object.assign( {}, state, {
				savingProfile: true,
				savingError: "",
			} );

		case PROFILE_UPDATE_FAILURE:
			return Object.assign( {}, state, {
				savingProfile: false,
				savingError: action.message,
			} );

		case PROFILE_UPDATE_SUCCESS:
			return Object.assign( {}, state, {
				savingProfile: false,
				sendPasswordReset: false,
				data: {
					profile: action.profile,
				},
			} );

		case PROFILE_UPDATE_EMAIL:
			return Object.assign( {}, state, {
				email: action.email,
			} );

		default:
			return state;
	}
}

/**
 * A reducer for the password reset.
 *
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occurred.
 * @returns {Object} The new state of the store.
 */
export function passwordResetReducer( state, action ) {
	switch ( action.type ) {
		case RESET_PASSWORD_REQUEST:
			return Object.assign( {}, state, {
				sendingPasswordReset: true,
				passwordResetError: "",
			} );

		case RESET_PASSWORD_SUCCESS:
			return Object.assign( {}, state, {
				sendingPasswordReset: false,
				sendPasswordReset: true,
			} );

		case RESET_PASSWORD_FAILURE:
			return Object.assign( {}, state, {
				sendingPasswordReset: false,
				passwordResetError: action.message,
			} );

		default:
			return state;
	}
}

let userState = reduceReducers( userDataReducer, userEmailReducer, passwordResetReducer );

/**
 * A combineReducer for the user object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated email string.
 */
export function userReducer( state = initialState.user, action ) {
	return userState( state, action );
}

export default userDataReducer;
