import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken, getUserId } from "../functions/auth";

/*
 * Action types
 */

export const GET_ALL_SUBSCRIPTIONS_REQUEST = "GET_ALL_SUBSCRIPTIONS_REQUEST";
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = "GET_ALL_SUBSCRIPTIONS_SUCCESS";
export const GET_ALL_SUBSCRIPTIONS_FAILURE = "GET_ALL_SUBSCRIPTIONS_FAILURE";

/*
 * Action creators
 */

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

		let request = new Request( `${apiUrl}/Customers/${userId}/subscriptions/?access_token=${accessToken}`, {
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
