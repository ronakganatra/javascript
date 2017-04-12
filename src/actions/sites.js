import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken, getUserId } from "../functions/auth";

/**
 * Action types
 */

export const LINK_SITE_POPUP_OPEN = " LINK_SITE_POPUP_OPEN";
export const LINK_SITE_POPUP_CLOSE = "LINK_SITE_POPUP_CLOSE";
export const UPDATE_SITE_URL = "UPDATE_SITE_URL";
export const LINK_SITE_SUCCESS = "LINK_SITE_SUCCESS";
export const LINK_SITE_FAILURE = "LINK_SITE_FAILURE";
export const RETRIEVE_SITES_REQUEST = "RETRIEVE_SITE_REQUEST";
export const RETRIEVE_SITES_SUCCESS = "RETRIEVE_SITES_SUCCESS";
export const RETRIEVE_SITES_FAILURE = "RETRIEVE_SITES_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the opening link site pop-up action.
 *
 * @returns {Object} An open link site pop-up action.
 */
export function linkSitePopupOpen() {
	return {
		type: LINK_SITE_POPUP_OPEN,
	};
}

/**
 * An action creator for the closing link site pop-up action.
 *
 * @returns {Object} A close link site pop-up action.
 */
export function linkSitePopupClose() {
	return {
		type: LINK_SITE_POPUP_CLOSE,
	};
}

/**
 * An action creator for the server request action.
 *
 * @param {string} url The url to add.
 *
 * @returns {Object} A server request action.
 */
export function updateSiteUrl( url ) {
	return {
		type: UPDATE_SITE_URL,
		url: url,
	};
}

/**
 * An action creator for the link site success action.
 *
 * @param {Object} site The sites object.
 *
 * @returns {Object} A link site success action.
 */
export function linkSiteSuccess( site ) {
	return {
		type: LINK_SITE_SUCCESS,
		site: site,
	};
}

/**
 * An action creator for the link site failure action.
 *
 * @param {string} errorText The error message.
 *
 * @returns {Object} A link site failure action.
 */
export function linkSiteFailure( errorText ) {
	return {
		type: LINK_SITE_FAILURE,
		linkSiteError: errorText,
	};
}

/**
 * An action creator for the link site action.
 *
 * @param {string} url The site url trying to be linked.
 *
 * @returns {Object} A link site request action.
 */
export function linkSite( url ) {
	return ( dispatch ) => {
		dispatch( updateSiteUrl( url ) );

		let apiUrl = getApiUrl();
		let userId = getUserId();
		let accessToken = getAccessToken();

		let request = new Request( `${apiUrl}/MyYoastUsers/${userId}/sites/?access_token=${accessToken}`, {
			method: "POST",
			body: JSON.stringify( {
				url,
			} ),
			headers: {
				"Content-Type": "application/json",
			},
		} );

		return fetch( request )
			.then( handle401 )
			.then( verifyStatusCode )
			.then( response => response.json() )
			.then( json => dispatch( linkSiteSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( linkSiteFailure( error.message ) );
			} );
	};
}

/**
 * An action creator for the server request action.
 *
 * @returns {Object} A server request action.
 */
export function retrieveSitesRequest() {
	return {
		type: RETRIEVE_SITES_REQUEST,
	};
}

/**
 * An action creator for the retrieve sites success action.
 *
 * @param {Array} sites The sites to be retrieved.
 *
 * @returns {Object} A retrieve sites success action.
 */
export function retrieveSitesSuccess( sites ) {
	return {
		type: RETRIEVE_SITES_SUCCESS,
		sites: sites,
	};
}

/**
 * An action creator for the retrieve sites failure action.
 *
 * @param {string} errorText The error message.
 *
 * @returns {Object} A retrieve sites failure action.
 */
export function retrieveSitesFailure( errorText ) {
	return {
		type: RETRIEVE_SITES_FAILURE,
		retrieveSitesError: errorText,
	};
}
/**
 * An action creator for the retrieve sites action.
 *
 * @returns {Object} A retrieve sites action.
 */
export function retrieveSites() {
	return ( dispatch ) => {
		dispatch( retrieveSitesRequest() );

		let apiUrl = getApiUrl();
		let userId = getUserId();
		let accessToken = getAccessToken();

		let request = new Request( `${apiUrl}/MyYoastUsers/${userId}/sites/?access_token=${accessToken}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		return fetch( request )
			.then( handle401 )
			.then( verifyStatusCode )
			.then( response => response.json() )
			.then( json => dispatch( retrieveSitesSuccess( json ) ) )
			.catch( ( error ) => {
				dispatch( retrieveSitesFailure( error.message ) );
			} );
	};
}
