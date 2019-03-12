import "whatwg-fetch";
import { getUserId } from "../functions/auth";
import { prepareInternalRequest, doRequest } from "../functions/api";

/*
 * Action types
 */

export const GET_REFUNDS_REQUEST = "GET_REFUNDS_REQUEST";
export const GET_REFUNDS_SUCCESS = "GET_REFUNDS_SUCCESS";
export const GET_REFUNDS_FAILURE = "GET_REFUNDS_FAILURE";

/*
 * Action creators
 */

/**
 * An action creator for requesting all refunds for the current user.
 *
 * @returns {Object} A getRefundsRequest action.
 */
export function getRefundsRequest() {
	return {
		type: GET_REFUNDS_REQUEST,
	};
}

/**
 * An action creator for the retrieval of the refunds.
 * @param {Object} json The json object
 * @returns {Object} A getRefundsSuccess action.
 */
export function getRefundsSuccess( json ) {
	return {
		type: GET_REFUNDS_SUCCESS,
		refunds: json,
	};
}

/**
 * An action creator for sending the getRefundsFailure action.
 *
 * @param {Object} error The error that was thrown during the request.
 *
 * @returns {Object} A getRefundsFailure action.
 */
export function getRefundsFailure( error ) {
	return {
		type: GET_REFUNDS_FAILURE,
		error: error,
	};
}

/**
 * An action creator for retrieving all refunds for the current user.
 *
 * @returns {Object} A refunds retrieval dispatcher.
 */
export function getRefunds() {
	return ( dispatch ) => {
		dispatch( getRefundsRequest() );

		const userId = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/findRefunds/` );

		return doRequest( request )
			.then( json => dispatch( getRefundsSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( getRefundsFailure( error.message ) );
			} );
	};
}
