import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken, getUserId } from "../functions/auth";

/*
 * Action types
 */
export const GET_SITE_SUBSCRIPTIONS_REQUEST = "GET_SITE_SUBSCRIPTIONS_REQUEST";
export const GET_SITE_SUBSCRIPTIONS_SUCCESS = "GET_SITE_SUBSCRIPTIONS_SUCCESS";
export const GET_SITE_SUBSCRIPTIONS_FAILURE = "GET_SITE_SUBSCRIPTIONS_FAILURE";

export const GET_ALL_SUBSCRIPTIONS_REQUEST = "GET_ALL_SUBSCRIPTIONS_REQUEST";
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = "GET_ALL_SUBSCRIPTIONS_SUCCESS";
export const GET_ALL_SUBSCRIPTIONS_FAILURE = "GET_ALL_SUBSCRIPTIONS_FAILURE";

/*
 * Action creators
 */

/**
 * An action creator for the get site subscriptions request action.
 *
 * @returns {Object} An get site subscriptions request action.
 */
export function getSiteSubscriptionsRequest() {
	return {
		type: GET_SITE_SUBSCRIPTIONS_REQUEST,
	};
}

/**
 * An action creator for the get site subscriptions success action.
 * @param {Object} json The subscriptions json object
 * @returns {Object} A get site subscriptions success action.
 */
export function getSiteSubscriptionsSuccess( json ) {
	return {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
		subscriptions: json,
	};
}

/**
 * An action creator for the get site subscriptions failure action.
 *
 * @param {string} errorMessage The error message to send.
 *
 * @returns {Object} A get site subscriptions failure action.
 */
export function getSiteSubscriptionsFailure( errorMessage ) {
	return {
		type: GET_SITE_SUBSCRIPTIONS_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for the get site subscriptions action.
 *
 * @param {string} siteId The ID of the site to retrieve subscriptions for.
 * @returns {Object} A link site request action.
 */
export function getSiteSubscriptions( siteId ) {
	return ( dispatch ) => {
		dispatch( getSiteSubscriptionsRequest() );

		let apiUrl = getApiUrl();
		let accessToken = getAccessToken();

		return fetch( `${apiUrl}/Sites/${siteId}/subscriptions?access_token=${accessToken}` )
			.then( handle401 )
			.then( response => response.json() )
			.then( json => dispatch( getSiteSubscriptionsSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( getSiteSubscriptionsFailure( error.message ) );
			} );
	};
}


/**
 * An action creator for the get all subscriptions request action.
 *
 * @returns {Object} A get all subscriptions action.
 */
export function getAllSubscriptionsRequest() {
	return {
		type: GET_ALL_SUBSCRIPTIONS_REQUEST,
	};
}

/**
 * An action creator for the get all subscriptions success action.
 * @param {Object} subscriptions The subscriptions json object
 * @returns {Object} A get all subscriptions success action.
 */
export function getAllSubscriptionsSuccess( subscriptions ) {
	return {
		type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
		subscriptions: subscriptions,
	};
}

/**
 * An action creator for the get all subscriptions failure action.
 *
 * @param {string} errorMessage The error message that was returned.
 *
 * @returns {Object} A get all subscriptions failure action.
 */
export function getAllSubscriptionsFailure( errorMessage ) {
	return {
		type: GET_ALL_SUBSCRIPTIONS_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for the get all subscriptions action.
 *
 * @returns {Object} A get all subscriptions action.
 */
export function getAllSubscriptions() {
	return ( dispatch ) => {
		dispatch( getAllSubscriptionsRequest() );

		let apiUrl = getApiUrl();
		let userId = getUserId();
		let accessToken = getAccessToken();

		let request = new Request( `${apiUrl}/MyYoastUsers/${userId}/subscriptions/?access_token=${accessToken}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		return fetch( request )
			.then( handle401 )
			.then( verifyStatusCode )
			.then( response => response.json() )
			.then( json => dispatch( getAllSubscriptionsSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( getAllSubscriptionsFailure( error.message ) );
			} );
	};
}
