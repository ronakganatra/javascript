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
export const CANCEL_SUBSCRIPTION_REQUEST = "CANCEL_SUBSCRIPTION_REQUEST";
export const CANCEL_SUBSCRIPTION_SUCCESS = "CANCEL_SUBSCRIPTION_SUCCESS";
export const CANCEL_SUBSCRIPTION_FAILURE = "CANCEL_SUBSCRIPTION_FAILURE";
export const CANCEL_SUBSCRIPTION_MODAL_OPEN = "CANCEL_SUBSCRIPTION_MODAL_OPEN";
export const CANCEL_SUBSCRIPTION_MODAL_CLOSE = "CANCEL_SUBSCRIPTION_MODAL_CLOSE";

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

/**
 * An action creator for the cancel subscription request action.
 *
 * @returns {Object} A cancel subscription action.
 */
export function cancelSubscriptionRequest() {
	return {
		type: CANCEL_SUBSCRIPTION_REQUEST,
	};
}

/**
 * An action creator for the cancel subscription success action.
 *
 * @returns {Object} A cancel subscription success action.
 */
export function cancelSubscriptionSuccess() {
	return {
		type: CANCEL_SUBSCRIPTION_SUCCESS,
	};
}

/**
 * An action creator for the cancel subscription failure action.
 *
 * @param {Object} error The error object that was returned.
 *
 * @returns {Object} A cancel subscription failure action.
 */
export function cancelSubscriptionFailure( error ) {
	return {
		type: CANCEL_SUBSCRIPTION_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the cancel subscription action.
 *
 * @param {string} subscriptionId The id of the subscription to cancel.
 *
 * @returns {Object} A get all subscription action.
 */
export function cancelSubscription( subscriptionId ) {
	return ( dispatch ) => {
		dispatch( cancelSubscriptionRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/subscriptions/${subscriptionId}/cancel` );

		return doRequest( request )
			.then( () => dispatch( cancelSubscriptionSuccess() ) )
			.catch( error => dispatch( cancelSubscriptionFailure( error ) ) );
	};
}

/**
 * An action creator for the cancel subscription modal open action.
 *
 * @returns {Object} A cancel subscription modal open action.
 */
export function openCancelSubscriptionModal() {
	return {
		type: CANCEL_SUBSCRIPTION_MODAL_OPEN,
	};
}

/**
 * An action creator for the cancel subscription modal close action.
 *
 * @returns {Object} A cancel subscription modal close action.
 */
export function closeCancelSubscriptionModal() {
	return {
		type: CANCEL_SUBSCRIPTION_MODAL_CLOSE,
	};
}
