import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const GET_NEWSLETTER_STATUS_REQUEST = "GET_NEWSLETTER_STATUS_REQUEST";
export const GET_NEWSLETTER_STATUS_SUCCESS = "GET_NEWSLETTER_STATUS_SUCCESS";
export const GET_NEWSLETTER_STATUS_FAILURE = "GET_NEWSLETTER_STATUS_FAILURE";

export const SUBSCRIBE_NEWSLETTER_REQUEST = "SUBSCRIBE_NEWSLETTER_REQUEST";
export const SUBSCRIBE_NEWSLETTER_SUCCESS = "SUBSCRIBE_NEWSLETTER_SUCCESS";
export const SUBSCRIBE_NEWSLETTER_FAILURE = "SUBSCRIBE_NEWSLETTER_FAILURE";

export const UNSUBSCRIBE_NEWSLETTER_REQUEST = "UNSUBSCRIBE_NEWSLETTER_REQUEST";
export const UNSUBSCRIBE_NEWSLETTER_SUCCESS = "UNSUBSCRIBE_NEWSLETTER_SUCCESS";
export const UNSUBSCRIBE_NEWSLETTER_FAILURE = "UNSUBSCRIBE_NEWSLETTER_FAILURE";

/**
 * An action creator for the newsletter status request action.
 *
 * @returns {Object} A newsletter status request action.
 */
export function getNewsletterStatusRequest() {
	return {
		type: GET_NEWSLETTER_STATUS_REQUEST,
	};
}

/**
 * An action creator for the get newsletter status success action.
 *
 * @param {Object} status The newsletter status.
 *
 * @returns {Object} A get newsletter status success action.
 */
export function getNewsletterStatusSuccess( status ) {
	return {
		type: GET_NEWSLETTER_STATUS_SUCCESS,
		status,
	};
}

/**
 * An action creator for the get newsletter status failure action.
 *
 * @param {string} error The error message.
 *
 * @returns {Object} A get newsletter status failure action.
 */
export function getNewsletterStatusFailure( error ) {
	return {
		type: GET_NEWSLETTER_STATUS_FAILURE,
		error: error,
	};
}
/**
 * An action creator for the get newsletter status action.
 *
 * @returns {Object} A get newsletter status action.
 */
export function getNewsletterStatus() {
	return ( dispatch ) => {
		dispatch( getNewsletterStatusRequest() );

		const userId  = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/newsletter` );

		return doRequest( request )
			.then( json => dispatch( getNewsletterStatusSuccess( json ) ) )
			.catch( error => dispatch( getNewsletterStatusFailure( error ) ) );
	};
}

/**
 * An action creator for the newsletter status request action.
 *
 * @returns {Object} A newsletter status request action.
 */
export function subscribeNewsletterRequest() {
	return {
		type: SUBSCRIBE_NEWSLETTER_REQUEST,
	};
}

/**
 * An action creator for the subscribe newsletter status success action.
 *
 * @param {Object} status The newsletter status.
 *
 * @returns {Object} A subscribe newsletter status success action.
 */
export function subscribeNewsletterSuccess( status ) {
	return {
		type: SUBSCRIBE_NEWSLETTER_SUCCESS,
		status,
	};
}

/**
 * An action creator for the subscribe newsletter status failure action.
 *
 * @param {string} error The error message.
 *
 * @returns {Object} A subscribe newsletter status failure action.
 */
export function subscribeNewsletterFailure( error ) {
	return {
		type: SUBSCRIBE_NEWSLETTER_FAILURE,
		error: error,
	};
}
/**
 * An action creator for the subscribe newsletter status action.
 *
 * @returns {Object} A subscribe newsletter status action.
 */
export function subscribeNewsletter() {
	return ( dispatch ) => {
		dispatch( subscribeNewsletterRequest() );

		const userId  = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/newsletter`, "POST" );

		return doRequest( request )
			.then( json => dispatch( subscribeNewsletterSuccess( json ) ) )
			.catch( error => dispatch( subscribeNewsletterFailure( error ) ) );
	};
}

/**
 * An action creator for the newsletter status request action.
 *
 * @returns {Object} A newsletter status request action.
 */
export function unsubscribeNewsletterRequest() {
	return {
		type: UNSUBSCRIBE_NEWSLETTER_REQUEST,
	};
}

/**
 * An action creator for the subscribe newsletter status success action.
 *
 * @param {Object} status The newsletter status.
 *
 * @returns {Object} A subscribe newsletter status success action.
 */
export function unsubscribeNewsletterSuccess( status ) {
	return {
		type: UNSUBSCRIBE_NEWSLETTER_SUCCESS,
		status,
	};
}

/**
 * An action creator for the subscribe newsletter status failure action.
 *
 * @param {string} error The error message.
 *
 * @returns {Object} A subscribe newsletter status failure action.
 */
export function unsubscribeNewsletterFailure( error ) {
	return {
		type: UNSUBSCRIBE_NEWSLETTER_FAILURE,
		error: error,
	};
}
/**
 * An action creator for the subscribe newsletter status action.
 *
 * @returns {Object} A subscribe newsletter status action.
 */
export function unsubscribeNewsletter() {
	return ( dispatch ) => {
		dispatch( subscribeNewsletterRequest() );

		const userId  = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/newsletter`, "DELETE" );

		return doRequest( request )
			.then( json => dispatch( subscribeNewsletterSuccess( json ) ) )
			.catch( error => dispatch( subscribeNewsletterFailure( error ) ) );
	};
}
