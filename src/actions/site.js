import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken } from "../functions/auth";

/**
 * Action types
 */

export const SITE_ADD_SUBSCRIPTION_REQUEST = "SITE_ADD_SUBSCRIPTION_REQUEST";
export const SITE_ADD_SUBSCRIPTION_SUCCESS = "SITE_ADD_SUBSCRIPTION_SUCCESS";
export const SITE_ADD_SUBSCRIPTION_FAILURE = "SITE_ADD_SUBSCRIPTION_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the site add subscription request action.
 *
 * @returns {Object} An add subscription request action.
 */
export function siteAddSubscriptionRequest() {
	return {
		type: SITE_ADD_SUBSCRIPTION_REQUEST,
		addingSubscription: true,
	};
}

/**
 * An action creator for the site add subscription success action.
 *
 * @param {Object} subscriptions The subscriptions object.
 *
 * @returns {Object} An add subscription success action.
 */
export function siteAddSubscriptionSuccess( subscriptions ) {
	return {
		type: SITE_ADD_SUBSCRIPTION_SUCCESS,
		active: subscriptions,
		addingSubscription: false,
	};
}

/**
 * An action creator for the site add subscription failure action.
 *
 * @param {string} errorText The error message.
 *
 * @returns {Object} An add subscription failure action.
 */
export function siteAddSubscriptionFailure( errorText ) {
	return {
		type: SITE_ADD_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: errorText,
		addingSubscription: false,
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
		dispatch( siteAddSubscriptionRequest() );

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
			.then( json => dispatch( siteAddSubscriptionSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( siteAddSubscriptionFailure( error.message ) );
			} );
	};
}
