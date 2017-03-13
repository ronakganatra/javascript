import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../actions";

const initialState = {
	user: {

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
			username: "",
			email: "",
		},
	},
};

/**
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occured.
 * @returns {Object} The new state for the store.
 */
function userReducer( state = initialState, action ) {
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

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case LOGIN:
		case LOGOUT:
		case FETCH_USER_REQUEST:
		case FETCH_USER_SUCCESS:
			return Object.assign( {}, state, {
				user: userReducer( state.user, action ),
			} );

		default:
			return state;
	}
};
