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
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_OAUTH_FAILURE = "LOGIN_OAUTH_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the login failure action.
 *
 * @param {Object} error The login error.
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
 * @returns {Object} An oauth failure action.
 */
export function oathFailure( error ) {
	return {
		type: LOGIN_OAUTH_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the login success action.
 *
 * @returns {Object} A login success action.
 */
export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS,
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
 * An action creator for the login request action.
 *
 * @param {Object} params The request parameters
 * @returns {Function} A dispatch function.
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
						dispatch( loginSuccess() );
					} )
					.catch( ( error ) => {
						dispatch( oathFailure( error ) );
					} );
			} )
			.catch( ( error ) => {
				dispatch( loginFailure( error ) );
			} );

		return {
			type: LOGIN_REQUEST,
		};
	};
}
