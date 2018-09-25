import "whatwg-fetch";
import { oathFailure } from "./login";
import { fetchUser, login } from "./user";
import { fetchAccessToken, getUserId } from "../functions/auth";
import { doRequest, prepareInternalRequest } from "../functions/api";

/**
 * Action types
 */

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const ACTIVATE_FAILURE = "ACTIVATE_FAILURE";
export const ACTIVATE_REQUEST = "ACTIVATE_REQUEST";
export const ACTIVATE_SUCCESS = "ACTIVATE_SUCCESS";

/**
 * Action creators
 */

/**
 * An action creator for the doing signup action.
 *
 * @returns {Object} A doing signup action.
 */
export function doingSignupRequest() {
	return {
		type: SIGNUP_REQUEST,
	};
}

/**
 * An action creator for the signup success action.
 *
 * @returns {Object} A signup success action.
 */
export function signupSuccess() {
	return {
		type: SIGNUP_SUCCESS,
	};
}

/**
 * An action creator for the signup failure action.
 *
 * @param {Object} error The signup error.
 *
 * @returns {Object} An sign up failure action.
 */
export function signupFailure( error ) {
	return {
		type: SIGNUP_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the signup request action.
 *
 * Attempts to singup a user by doing an API call to the MyYoast server, which forwards it to yoast.com's APIs.
 * When this succeeds, we attempt to sent an email with an activation link to the user and redirect the user to the almost there page.
 *
 * @param {Object} params The request parameters.
 *
 * @returns {Function} A function which enables us to expose the dispatch function.
 */
export function signupRequest( params ) {
	return ( dispatch ) => {
		dispatch( doingSignupRequest() );
		let request = prepareInternalRequest( "Customers/signup/", "POST", params, { credentials: "include" } );
		doRequest( request )
			.then( ( response ) => {
				dispatch( signupSuccess() );
				return response;
			} )
			.catch( ( error ) => {
				dispatch( signupFailure( error ) );
				return error;
			} );
	};
}

/**
 * An action creator for the activate success action.
 *
 * @returns {Object} An activate success action.
 */
export function activateSuccess() {
	return {
		type: ACTIVATE_SUCCESS,
	};
}

/**
 * An action creator for the activate failure action.
 *
 * @param {Object} error The activate error.
 *
 * @returns {Object} An activate failure action.
 */
export function activateFailure( error ) {
	return {
		type: ACTIVATE_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the doing activate action.
 *
 * @returns {Object} A doing activate action.
 */
export function doingActivateRequest() {
	return {
		type: ACTIVATE_REQUEST,
	};
}

/**
 * An action creator for the activate request action.
 *
 * Attempts to activate a user by doing an API call to the MyYoast server, which forwards it to yoast.com's APIs.
 * When this succeeds, we attempt to login the user and redirect the user to the enter-details page.
 *
 * @param {string} key The request parameters.
 *
 * @returns {Function} A function which enables us to expose the dispatch function.
 */
export function activateRequest( key ) {
	return ( dispatch ) => {
		dispatch( doingActivateRequest() );
		let request = prepareInternalRequest( "Customers/activate/", "POST", { key }, { credentials: "include" } );
		doRequest( request )
			.then( () => {
				dispatch( activateSuccess() );
			} )
			.catch( ( error ) => {
				dispatch( activateFailure( error ) );
			} )
			.finally( () => {
				fetchAccessToken()
					.then( ( token ) => {
						dispatch( login( token, getUserId() ) );
						dispatch( fetchUser( getUserId() ) );
					} )
					.catch( ( error ) => {
						dispatch( oathFailure( error ) );
					} );
			} );

		return {
			type: ACTIVATE_REQUEST,
		};
	};
}
