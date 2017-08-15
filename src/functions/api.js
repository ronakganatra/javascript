import "whatwg-fetch";
import { getAuthUrl, removeCookies as removeAuthCookies, getAccessToken } from "./auth";
import getEnv from "./getEnv";
// import { DuplicateRecord } from "../errors/DuplicateRecord";
// import { CustomerSupportError } from "../errors/CustomerSupportError";

/**
 * Determines whether or not a valid HTTP method was passed.
 *
 * @param {string} method The HTTP method to check.
 * @returns {boolean} Whether or not the HTTP method is valid.
 */
function determineValidMethod( method ) {
	let validMethods = [ "GET", "POST", "PUT", "FETCH", "HEAD", "DELETE", "PATCH" ];

	if ( typeof method !== "string" ) {
		return false;
	}

	return validMethods.includes( method.toUpperCase() );
}

/**
 * Prepares the payload based on the methods. GET and HEAD can't have payloads, and FormData cannot be stringified.
 *
 * @param {string} method The API method for the request.
 * @param {Object} payload The payload that came with the request.
 *
 * @returns {Object} null, a FormData object, or a stringified object.
 */
function preparePayload( method, payload ) {
	if ( method === "GET" || method === "HEAD" ) {
		return null;
	}

	if ( payload instanceof FormData ) {
		return payload;
	}

	return JSON.stringify( payload );
}

/**
 * Prepares a request for sending.
 *
 * @param {string} url The URL to send the request to.
 * @param {string} method The HTTP method to use for the request.
 * @param {object} payload The payload of the request.
 * @param {Object} additionalOptions An optional object containing options to be used by the request object.
 *
 * @returns {Request} The Request object.
 */
export function prepareRequest( url, method = "GET", payload = {}, additionalOptions = {} ) {
	if ( ! determineValidMethod( method ) ) {
		throw new Error( `Invalid method of ${method} supplied. Please ensure it's a string and a valid HTTP method.` );
	}

	let options = {
		method,
		headers: { "Content-Type": "application/json" },
	};

	options.body = preparePayload( method, payload );

	options = Object.assign( {}, options, additionalOptions );

	return new Request( url, options );
}

/**
 * Prepares a request to send to the internal API.
 *
 * @param {string} path The path to send the request to.
 * @param {string} method The HTTP method to use for the request.
 * @param {object} payload The payload of the request.
 * @param {Object} additionalOptions An optional object containing options to be used by the request object.
 *
 * @returns {Request} The Request object.
 */
export function prepareInternalRequest( path, method = "GET", payload = {}, additionalOptions = {} ) {
	return prepareRequest( `${getApiUrl()}/${path}?access_token=${getAccessToken()}`, method, payload, additionalOptions );
}

/**
 * Executes a specific request and handles potential errors.
 *
 * @param {Request} request The request to execute.
 * @returns {object} The fetched request object.
 */
export function doRequest( request ) {
	return fetch( request )
		.then( handleResponse )
		.catch( ( error ) => {
			console.log( "DO REQUEST CATCHES: ", error.error );
			throw error.error;
		} );
}

/**
 * Handles the response.
 *
 * @param {Response} response The server response object.
 * @returns {object} The processes response.
 */
function handleResponse( response ) {
	/*
	With opaque response types, no inference can be made on whether the request was successful.
	For now we'll assume all such responses come from external requests, and can only be successful.
	*/
	if ( response.type === "opaque" ) {
		return Promise.resolve();
	}

	let validStatusCodes = [ 200, 204 ];

	if ( response.status === 401 ) {
		return handle401( response );
	}

	if ( ! validStatusCodes.includes( response.status ) ) {
		return handleErrorResponse( response );
	}

	// If no content in response, resolve empty promise.
	if ( response.status === 204 ) {
		return Promise.resolve();
	}

	return response.json();
}

/**
 * Handles an errored response.
 *
 * @param {object} response The response to handle.
 * @returns {object} The reponse object.
 */
function handleErrorResponse( response ) {
	return response
		.json()
		.then( errorResponse => {
			throw errorResponse;
		} );
}

// /**
//  * Determines the error to throw.
//  *
//  * @param {object} response The error response that was passed along.
//  * @returns {void}
//  */
// function determineErrorMessage( response ) {
// 	if ( ! response.error ) {
// 		throw new CustomerSupportError();
// 	}
//
// 	if ( response.error.code === "ER_DUP_ENTRY" ) {
// 		throw new DuplicateRecord( response.error.context );
// 	}
//
// 	throw new CustomerSupportError();
// }

/**
 * Returns the API URL that should be used to do AJAX requests to.
 *
 * @returns {string} The URL of the API.
 */
export function getApiUrl() {
	return getEnv( "API_URL", "http://localhost:3000/api" );
}

/**
 * Checks a response for a 401 status code and redirects if true.
 *
 * @param {Object} response The response that needs to be checked for a 401.
 * @returns {object} The request object.
 */
export function handle401( response ) {
	if ( response.status === 401 ) {
		removeAuthCookies();
		document.location.href = getAuthUrl();
		throw new Error( "Authentication required" );
	}

	return response;
}

/**
 * Returns the invoice URL for a certain order.
 *
 * @param {string} orderId The id of the order.
 * @returns {string} The URL to the order invoice.
 */
export function getInvoiceUrl( orderId ) {
	return getApiUrl() + "/Orders/" + orderId + "/invoice?access_token=" + getAccessToken();
}
