import "whatwg-fetch";
import { getApiUrl, handle401, verifyStatusCode } from "../functions/api";
import { getAccessToken, getUserId } from "../functions/auth";

/**
 * Action types
 */

export const LINK_SITE_POPUP_OPEN = " LINK_SITE_POPUP_OPEN";
export const LINK_SITE_POPUP_CLOSE = "LINK_SITE_POPUP_CLOSE";
export const LINK_SITE_REQUEST = "LINK_SITE_REQUEST";
export const LINK_SITE_SUCCESS = "LINK_SITE_SUCCESS";
export const LINK_SITE_FAILURE = "LINK_SITE_FAILURE";

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
export function linkSiteRequest( url ) {
	return {
		type: LINK_SITE_REQUEST,
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
		dispatch( linkSiteRequest( url ) );

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
