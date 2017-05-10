import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../actions/user";
import { PROFILE_UPDATE_EMAIL } from "../actions/user";
import reduceReducers from "reduce-reducers";

const initialState = {
	// Whether or not the user is currently logged in.
	loggedIn: false,

	// Whether or not we are fetching the logged in user data.
	isFetching: false,

	// The currently active & valid access token.
	accessToken: "",

	// The user ID for fetching the user.
	userId: null,

	// The userdata as retrieved from the server.
	data: {
		profile: {
			username: "",
			email: "",
		},
	},
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
		case PROFILE_UPDATE_EMAIL:
			return Object.assign( {}, state, {
				data: {
					profile: Object.assign( {}, state.data.profile, {
						email: action.email,
					} ),
				},
			} );
		default:
			return state;
	}
}

let userState = reduceReducers( userDataReducer, userEmailReducer );

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
