import "whatwg-fetch";
import { doRequest, prepareInternalRequest } from "../functions/api";
import {
	fetchAccessToken, getUserId,
} from "../functions/auth";
import { fetchUser, login } from "./user";

/**
 * Action types
 */

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_OAUTH_FAILURE = "LOGIN_OAUTH_FAILURE";
export const LOGIN_OAUTH_RESET = "LOGIN_OAUTH_RESET";
export const REQUIRE_OTP = "REQUIRE_OTP";

/**
 * Action creators
 */

/**
 * An action creator for the login failure action.
 *
 * @param {Object} error The login error.
 *
 * @returns {Object} An login failure action.
 */
export function loginFailure( error ) {
	return {
		type: LOGIN_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the oauth failure action.
 *
 * @param {Object} error The oauth error.
 *
 * @returns {Object} An oauth failure action.
 */
export function oathFailure( error ) {
	return {
		type: LOGIN_OAUTH_FAILURE,
		error: error,
	};
}


/**
 * An action creator for the doing login action.
 *
 * @returns {Object} A doing login action.
 */
export function doingLoginRequest() {
	return {
		type: LOGIN_REQUEST,
	};
}

/**
 * An action creator to reset the OAuth error.
 * (called in the activate container)
 *
 * @returns {{type: string}} An OAuth reset action.
 */
export function resetOauthError() {
	return {
		type: LOGIN_OAUTH_RESET,
	};
}

/**
 * An action creator to the requireOTP action.
 *
 * @returns {Object} A requireOTP action.
 */
export function requireOTP() {
	return {
		type: REQUIRE_OTP,
	};
}

/**
 * An action creator for the login request action.
 *
 * Attempts to log in a user by doing an API call to the MyYoast server, which forwards it to yoast.com's APIs.
 * When this succeeds, we attempt to fetch the OAuth access token from yoast.com (the OAuth server).
 *
 *
 * @param {Object} params The request parameters.
 * @param {string} params.email The email address of the user who is trying to log in.
 * @param {string} params.password The password of the user who is trying to log in.
 * @param {boolean} params.rememberMe Whether or not the user wants to be reminded, and have their login session extended.
 *
 * @returns {Function} A function which enables us to expose the dispatch function.
 */
export function loginRequest( params ) {
	return ( dispatch ) => {
		dispatch( doingLoginRequest() );
		let request = prepareInternalRequest( "Customers/login/", "POST", params, { credentials: "include" } );
		doRequest( request )
			.then( () => {
				fetchAccessToken()
					.then( ( token ) => {
						dispatch( login( token, getUserId() ) );
						dispatch( fetchUser( getUserId() ) );
					} )
					.catch( ( error ) => {
						dispatch( oathFailure( error ) );
					} );
			} )
			.catch( ( error ) => {
				if ( error.error && error.error.code === "invalid_google_authenticator_token" ) {
					dispatch( requireOTP() );
				}
				dispatch( loginFailure( error ) );
			} );

		return {
			type: LOGIN_REQUEST,
		};
	};
}
