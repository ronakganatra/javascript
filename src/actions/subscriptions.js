import "whatwg-fetch";
import { getApiUrl, handle401 } from "../functions/api";
import { getAccessToken, getUserId } from "../functions/auth";

/*
 * Action types
 */
export const GET_SITE_SUBSCRIPTIONS_REQUEST = "GET_SITE_SUBSCRIPTIONS_REQUEST";
export const GET_SITE_SUBSCRIPTIONS_SUCCESS = "GET_SITE_SUBSCRIPTIONS_SUCCESS";
export const GET_SITE_SUBSCRIPTIONS_FAILURE = "GET_SITE_SUBSCRIPTIONS_FAILURE";

export const GET_ALL_SUBSCRIPTIONS_REQUEST = "GET_SITE_SUBSCRIPTIONS_REQUEST";
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = "GET_SITE_SUBSCRIPTIONS_SUCCESS";
export const GET_ALL_SUBSCRIPTIONS_FAILURE = "GET_SITE_SUBSCRIPTIONS_FAILURE";

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
 * @returns {Object} A get site subscriptions action.
 */
export function getSiteSubscriptions() {
	return ( dispatch ) => {
		dispatch( getSiteSubscriptionsRequest() );

		let apiUrl = getApiUrl();
		let userId = getUserId();
		let accessToken = getAccessToken();

		return fetch( `${apiUrl}/Sites/${userId}/subscriptions?access_token=${accessToken}` )
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
 * @param {Object} json The subscriptions json object
 * @returns {Object} A get all subscriptions success action.
 */
export function getAllSubscriptionsSuccess( json ) {
	return {
		type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
		subscriptions: json,
	};
}

/**
 * An action creator for the get all subscriptions failure action.
 *
 * @param {string} errorMessage The url to add.
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

		return fetch( `${apiUrl}/MyYoastUsers/${userId}/subscriptions?access_token=${accessToken}` )
			.then( handle401 )
			.then( response => response.json() )
			.then( json => dispatch( getAllSubscriptionsSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( getAllSubscriptionsFailure( error.message ) );
			} );
	};
}
