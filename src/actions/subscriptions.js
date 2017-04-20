import "whatwg-fetch";
import { getApiUrl, handle401 } from "../functions/api";
import { getAccessToken } from "../functions/auth";

/**
 * Action types
 */

export const GET_SITE_SUBSCRIPTIONS_REQUEST = "GET_SITE_SUBSCRIPTIONS_REQUEST";
export const GET_SITE_SUBSCRIPTIONS_SUCCESS = "GET_SITE_SUBSCRIPTIONS_SUCCESS";
export const GET_SITE_SUBSCRIPTIONS_FAILURE = "GET_SITE_SUBSCRIPTIONS_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the opening link site pop-up action.
 *
 * @returns {Object} An open link site pop-up action.
 */
export function getSiteSubscriptionsRequest() {
	return {
		type: GET_SITE_SUBSCRIPTIONS_REQUEST,
	};
}

/**
 * An action creator for the closing link site pop-up action.
 * @param {Object} json The json object
 * @returns {Object} A close link site pop-up action.
 */
export function getSiteSubscriptionsSuccess( json ) {
	return {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
		subscriptions: json,
	};
}

/**
 * An action creator for the server request action.
 *
 * @param {string} errorMessage The url to add.
 *
 * @returns {Object} A server request action.
 */
export function getSiteSubscriptionsFailure( errorMessage ) {
	return {
		type: GET_SITE_SUBSCRIPTIONS_FAILURE,
		getSiteSubscriptionsError: errorMessage,
	};
}

/**
 * An action creator for the link site action.
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
