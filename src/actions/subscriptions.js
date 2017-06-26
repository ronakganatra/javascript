import "whatwg-fetch";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

/*
 * Action types
 */

export const GET_ALL_SUBSCRIPTIONS_REQUEST = "GET_ALL_SUBSCRIPTIONS_REQUEST";
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = "GET_ALL_SUBSCRIPTIONS_SUCCESS";
export const GET_ALL_SUBSCRIPTIONS_FAILURE = "GET_ALL_SUBSCRIPTIONS_FAILURE";
export const ADD_LICENCES_POPUP_OPEN = "ADD_LICENCES_POPUP_OPEN";
export const ADD_LICENCES_POPUP_CLOSE = "ADD_LICENCES_POPUP_CLOSE";

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

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/subscriptions/` );

		return doRequest( request )
			.then( json => dispatch( getAllSubscriptionsSuccess( json ) ) )
			.catch( error => dispatch( getAllSubscriptionsFailure( error.message ) ) );
	};
}

/**
 * An action creator for the opening add licenses pop-up action.
 *
 * @param {string} productId The plugin id.
 * @returns {Object} An open add licenses pop-up action.
 */
export function addLicensesPopupOpen( productId ) {
	return {
		type: ADD_LICENCES_POPUP_OPEN,
		productId: productId,
	};
}

/**
 * An action creator for the closing add licenses pop-up action.
 *
 * @returns {Object} An closing add licenses pop-up action.
 */
export function addLicensesPopupClose() {
	return {
		type: ADD_LICENCES_POPUP_CLOSE,
	};
}
