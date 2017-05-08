import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getLogoutUrl, getAuthUrl, removeCookies as removeAuthCookies, getAccessToken, getUserId } from "../functions/auth";

/*
 * Action types
 */
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const PROFILE_UPDATE_REQUEST = "PROFILE_UPDATE_REQUEST";
export const PROFILE_UPDATE_EMAIL = "PROFILE_UPDATE_EMAIL";
export const PROFILE_UPDATE_FAILURE = "PROFILE_UPDATE_FAILURE";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

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

		return fetch( `${apiUrl}/Customers/${userId}/profile?access_token=${accessToken}` )
			.then( handle401 )
			.then( response => response.json() )
			.then( json => dispatch( receiveUser( json ) ) )
			.catch( () => {
				document.location.href = getAuthUrl();
			} );
	};
}

/**
 * An action creator for the update email action.
 *
 * @param {string} email The changing email address of the customer.
 * @returns {Object} A change email action.
 */
export function profileUpdateEmail( email ) {
	return {
		type: PROFILE_UPDATE_EMAIL,
		email: email,
	};
}

/**
 * An action creator for the profile update request action.
 *
 * @returns {Object} The profile update request action.
 */
export function profileUpdateRequest() {
	return {
		type: PROFILE_UPDATE_REQUEST,
	};
}

/**
 * An action creator for the profile update failure action.
 *
 * @param {string} error The error that occurred.
 * @returns {Object} The profile update failure action.
 */
export function profileUpdateFailure( error ) {
	return {
		type: PROFILE_UPDATE_FAILURE,
		message: error,
	};
}

/**
 * An action creator for the profile update success action.
 *
 * @param {Object} profile The updated profile.
 * @returns {Object} The profile update success action.
 */
export function profileUpdateSuccess( profile ) {
	return {
		type: PROFILE_UPDATE_SUCCESS,
		profile,
	};
}

/**
 * An action creator to update the profile of the user.
 *
 * @param {Object} profile The profile object.
 * @param {string} profile.email The email to set on the profile.
 * @returns {Function} A function that
 */
export function updateProfile( profile ) {
	return ( dispatch ) => {
		dispatch( profileUpdateRequest() );

		let apiUrl = getApiUrl();
		let accessToken = getAccessToken();
		let userId = getUserId();

		let request = new Request( `${apiUrl}/Customers/${userId}/profile?access_token=${accessToken}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( profile ),
		} );

		return fetch( request )
			.then( verifyStatusCode )
			.then( response => response.json() )
			.then( ( profile ) => dispatch( profileUpdateSuccess( profile ) ) )
			.catch( ( error ) => {
				dispatch( profileUpdateFailure( error.message ) );
			} );
	};
}

/**
 * An action creator for the password reset request.
 *
 * @returns {Object} The action.
 */
export function passwordResetRequest() {
	return {
		type: RESET_PASSWORD_REQUEST,
	};
}

/**
 * An action creator for the password reset failure action.
 *
 * @param {string} errorMessage The error that occurred.
 * @returns {Object} The action.
 */
export function passwordResetFailure( errorMessage ) {
	return {
		type: RESET_PASSWORD_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for the password reset success action.
 *
 * @returns {Object} The action.
 */
export function passwordResetSuccess() {
	return {
		type: RESET_PASSWORD_SUCCESS,
	};
}

/**
 * An action creator that sends a password reset email.
 *
 * @param {string} email The email to send a password reset mail.
 * @returns {Function} Function to call when this action is dispatched.
 */
export function passwordResetSend( email ) {
	return ( dispatch ) => {
		dispatch( passwordResetRequest() );

		const body = new FormData();
		body.append( "user_login", email );

		const request = new Request( "http://yoast.dev/wp-login.php?action=lostpassword", {
			method: "POST",
			body,
			mode: "no-cors",
		} );

		return fetch( request )
			.then( verifyStatusCode )
			.then( () => dispatch( passwordResetSuccess() ) )
			.catch( ( error ) => { dispatch( passwordResetFailure( error.message ) ) } );
	};
}
