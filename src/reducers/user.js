import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../actions/user";
import {
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_FAILURE,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_EMAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_SUCCESS,
	DISABLE_USER_START,
	DISABLE_USER_FAILURE,
	DISABLE_USER_SUCCESS,
} from "../actions/user";
import reduceReducers from "reduce-reducers";

const initialState = {
	// Whether or not the user is enabled.
	enabled: null,

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
	saveEmailError: null,
	profileSaved: false,
	sendingPasswordReset: false,
	sendPasswordReset: false,
	passwordResetError: null,
	deletingProfile: false,
	deleteProfileError: null,
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
				sendPasswordReset: false,
				savingProfile: true,
				saveEmailError: null,
				profileSaved: false,
			} );

		case PROFILE_UPDATE_FAILURE:
			return Object.assign( {}, state, {
				savingProfile: false,
				saveEmailError: action.error,
				profileSaved: false,
			} );

		case PROFILE_UPDATE_SUCCESS:
			return Object.assign( {}, state, {
				savingProfile: false,
				sendPasswordReset: false,
				profileSaved: true,
				data: {
					profile: action.profile,
				},
			} );

		case PROFILE_UPDATE_EMAIL:
			return Object.assign( {}, state, {
				email: action.email,
				profileSaved: false,
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
				passwordResetError: null,
				sendPasswordReset: false,
			} );

		case RESET_PASSWORD_SUCCESS:
			return Object.assign( {}, state, {
				sendingPasswordReset: false,
				sendPasswordReset: true,
			} );

		case RESET_PASSWORD_FAILURE:
			return Object.assign( {}, state, {
				sendingPasswordReset: false,
				passwordResetError: action.error,
				sendPasswordReset: false,
			} );

		default:
			return state;
	}
}

/**
 * A reducer for disabling a user account
 *
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occurred.
 * @returns {Object} The new state of the store.
 */
export function userDisableReducer( state = initialState, action ) {
	switch ( action.type ) {
		case DISABLE_USER_START:
			return Object.assign( {}, state, {
				deletingProfile: true,
			} );
		case DISABLE_USER_SUCCESS:
			return Object.assign( {}, state, {
				deletingProfile: false,
				enabled: false,
			} );
		case DISABLE_USER_FAILURE:
			return Object.assign( {}, state, {
				deletingProfile: false,
				deleteProfileError: action.error,
			} );

		default:
			return state;
	}
}

let userState = reduceReducers( userDataReducer, userEmailReducer, passwordResetReducer, userDisableReducer );

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
