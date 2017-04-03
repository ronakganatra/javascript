import "whatwg-fetch";
import { getApiUrl, handle401 } from "../functions/api";
import { getLogoutUrl, getAuthUrl, removeCookies as removeAuthCookies } from "../functions/auth";

/*
 * Action types
 */
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

/**
 * Action creators
 */

/**
 * An action creator for the login action.
 *
 * @param {string} accessToken A valid access token for the user.
 * @param {string} userId The user ID that wants to log in.
 * @returns {Object} A login action.
 */
export function login( accessToken, userId ) {
	return {
		type: LOGIN,
		data: {
			accessToken,
			userId,
		},
	};
}

/**
 * An action creator for the logout action.
 *
 * @returns {Object} A logout action.
 */
export function logout() {
	removeAuthCookies();
	document.location.href = getLogoutUrl();

	return {
		type: LOGOUT,
	};
}

/**
 * An action creator for the request user action.
 *
 * @returns {Object} A request user action.
 */
export function requestUser() {
	return {
		type: FETCH_USER_REQUEST,
	};
}

/**
 * An action creator for the receive user action.
 *
 * @param {Object} user The user data that was successfully received.
 * @returns {Object} A receive user action.
 */
export function receiveUser( user ) {
	return {
		type: FETCH_USER_SUCCESS,
		user: user,
	};
}

/**
 * An action creator for the fetch user action.
 *
 * @param {string} accessToken A valid access token for the user.
 * @param {string} userId The user ID for the user that we want to fetch.
 * @returns {Object} A fetch user action.
 */
export function fetchUser( accessToken, userId ) {
	return ( dispatch ) => {
		dispatch( requestUser() );

		let apiUrl = getApiUrl();

		return fetch( `${apiUrl}/MyYoastUsers/${userId}/profile?access_token=${accessToken}` )
			.then( handle401 )
			.then( response => response.json() )
			.then( json => dispatch( receiveUser( json ) ) )
			.catch( () => {
				document.location.href = getAuthUrl();
			} );
	};
}
