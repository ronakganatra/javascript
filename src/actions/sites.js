import thunkMiddleware from "redux-thunk";

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
 * @param {string} site The site to add.
 *
 * @returns {Object} A server request action.
 */
export function linkSiteRequest( site ) {
	return {
		type: LINK_SITE_REQUEST,
		site: site,
	};
}

/**
 * An action creator for the link site success action.
 *
 * @returns {Object} A link site success action.
 */
export function linkSiteSuccess() {
	return {
		type: LINK_SITE_SUCCESS,
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

/*
export function linkSite( url ) {

}
*/
