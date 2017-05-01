import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken } from "../functions/auth";

/**
 * Action types
 */

export const SITE_TOGGLE_SUBSCRIPTION_REQUEST = "SITE_TOGGLE_SUBSCRIPTION_REQUEST";
export const SITE_TOGGLE_SUBSCRIPTION_FAILURE = "SITE_TOGGLE_SUBSCRIPTION_FAILURE";

export const SITE_ADD_SUBSCRIPTION_SUCCESS = "SITE_ADD_SUBSCRIPTION_SUCCESS";
export const SITE_REMOVE_SUBSCRIPTION_SUCCESS = "SITE_REMOVE_SUBSCRIPTION_SUCCESS";

/**
 * Action creators
 */

/**
 * An action creator for the site add subscription request action.
 *
 * @returns {Object} An add subscription request action.
 */
export function siteToggleSubscriptionRequest() {
	return {
		type: SITE_TOGGLE_SUBSCRIPTION_REQUEST,
	};
}

/**
 * An action creator for the site add subscription success action.
 *
 * @param {string} siteId The site ID which had a subscription connected.
 * @param {string} subscriptionId The subscription which was connected.
 * @returns {Object} An add subscription success action.
 */
export function siteAddSubscriptionSuccess( siteId, subscriptionId ) {
	return {
		type: SITE_ADD_SUBSCRIPTION_SUCCESS,
		siteId,
		subscriptionId,
	};
}

/**
 * An action creator for the site remove subscription success action.
 *
 * @param {string} siteId The site ID which had a subscription connected.
 * @param {string} subscriptionId The subscription which was connected.
 * @returns {Object} An remove subscription success action.
 */
export function siteRemoveSubscriptionSuccess( siteId, subscriptionId ) {
	return {
		type: SITE_REMOVE_SUBSCRIPTION_SUCCESS,
		siteId,
		subscriptionId,
	};
}

/**
 * An action creator for the site add subscription failure action.
 *
 * @param {string} errorText The error message.
 *
 * @returns {Object} An add subscription failure action.
 */
export function siteToggleSubscriptionFailure( errorText ) {
	return {
		type: SITE_TOGGLE_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: errorText,
	};
}

/**
 * An action creator for the site add subscription action.
 *
 * @param {string} siteId The id of the site for which the subscription is trying to be added.
 * @param {string} subscriptionId The subscription trying to be added.
 *
 * @returns {Object} A site add subscription request action.
 */
export function siteAddSubscription( siteId, subscriptionId ) {
	return ( dispatch ) => {
		dispatch( siteToggleSubscriptionRequest() );

		let apiUrl = getApiUrl();
		let accessToken = getAccessToken();

		let request = new Request( `${apiUrl}/Sites/${siteId}/subscriptions/rel/${subscriptionId}/?access_token=${accessToken}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		return fetch( request )
			.then( handle401 )
			.then( verifyStatusCode )
			.then( response => response.json() )
			.then( json => dispatch( siteAddSubscriptionSuccess( siteId, subscriptionId ) ) )
			.catch( ( error ) => {
				dispatch( siteToggleSubscriptionFailure( error.message ) );
			} );
	};
}

/**
 * An action creator for the site add subscription action.
 *
 * @param {string} siteId The id of the site for which the subscription is trying to be added.
 * @param {string} subscriptionId The subscription trying to be added.
 *
 * @returns {Object} A site add subscription request action.
 */
export function siteRemoveSubscription( siteId, subscriptionId ) {
	return ( dispatch ) => {
		dispatch( siteToggleSubscriptionRequest() );

		let apiUrl = getApiUrl();
		let accessToken = getAccessToken();

		let request = new Request( `${apiUrl}/Sites/${siteId}/subscriptions/rel/${subscriptionId}/?access_token=${accessToken}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		return fetch( request )
			.then( handle401 )
			.then( verifyStatusCode )
			.then( () => {
				dispatch( siteRemoveSubscriptionSuccess( siteId, subscriptionId ) );
			} )
			.catch( ( error ) => {
				dispatch( siteToggleSubscriptionFailure( error.json().message ) );
			} );
	};
}
