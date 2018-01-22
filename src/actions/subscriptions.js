import "whatwg-fetch";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

/*
 * Action types
 */

export const GET_ALL_SUBSCRIPTIONS_REQUEST = "GET_ALL_SUBSCRIPTIONS_REQUEST";
export const GET_ALL_SUBSCRIPTIONS_SUCCESS = "GET_ALL_SUBSCRIPTIONS_SUCCESS";
export const GET_ALL_SUBSCRIPTIONS_FAILURE = "GET_ALL_SUBSCRIPTIONS_FAILURE";
export const ADD_LICENCES_MODAL_OPEN = "ADD_LICENCES_MODAL_OPEN";
export const ADD_LICENCES_MODAL_CLOSE = "ADD_LICENCES_MODAL_CLOSE";

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
 * An action creator for the opening add licenses modal action.
 *
 * @param {string} storeUrl The store URL.
 * @returns {Object} An open add licenses modal action.
 */
export function addLicensesModalOpen( storeUrl ) {
	return {
		type: ADD_LICENCES_MODAL_OPEN,
		storeUrl,
	};
}

/**
 * An action creator for the closing add licenses modal action.
 *
 * @returns {Object} An closing add licenses modal action.
 */
export function addLicensesModalClose() {
	return {
		type: ADD_LICENCES_MODAL_CLOSE,
	};
}
