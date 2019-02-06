import "whatwg-fetch";
import { doRequest, prepareInternalRequest } from "../functions/api";

/**
 * Action types
 */
export const CONNECT_REQUEST = "CONNECT_REQUEST";
export const CONNECT_SUCCESS = "CONNECT_SUCCESS";
export const CONNECT_FAILURE = "CONNECT_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the connect success action.
 *
 * @returns {Object} An connect success action.
 */
export function connectSuccess() {
	return {
		type: CONNECT_SUCCESS,
	};
}

/**
 * An action creator for the connect failure action.
 *
 * @param {Object} error The connect error.
 *
 * @returns {Object} An connect failure action.
 */
export function connectFailure( error ) {
	return {
		type: CONNECT_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the doing connect action.
 *
 * @returns {Object} A doing connect action.
 */
export function doingConnectRequest() {
	return {
		type: CONNECT_REQUEST,
	};
}

/**
 * An action creator for the connect request action.
 *
 * @param {Object}  params             The request parameters.
 * @param {string}  params.clientId    The clientId of the user that is trying to connect their add-on.
 * @param {string}  params.url         The url of the site the add-on should be activated for.
 * @param {string}  params.redirectUrl The url a user should be redirected to..
 * @param {boolean} params.pluginSlug  The slug of the to be connected add-on.
 *
 * @returns {Function} A function which enables us to expose the dispatch function.
 */
export function connectRequest( params ) {
	return ( dispatch ) => {
		dispatch( doingConnectRequest() );
		const request = prepareInternalRequest( "Sites/connect/", "POST", params );
		doRequest( request )
			.then(
				() => dispatch( connectSuccess() )
			)
			.catch( ( error ) => {
				dispatch( connectFailure( error ) );
			} );
	};
}
