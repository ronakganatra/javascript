import "whatwg-fetch";
import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";
import { getAllSubscriptions } from "./subscriptions";
import { getAllProducts } from "./products";
import { push } from "react-router-redux";

/**
 * Action types
 */

export const LINK_SITE_MODAL_OPEN = "LINK_SITE_MODAL_OPEN";
export const LINK_SITE_MODAL_CLOSE = "LINK_SITE_MODAL_CLOSE";
export const LINK_SITE_REQUEST = "LINK_SITE_REQUEST";
export const LINK_SITE_SUCCESS = "LINK_SITE_SUCCESS";
export const LINK_SITE_FAILURE = "LINK_SITE_FAILURE";
export const UPDATE_SITE_URL = "UPDATE_SITE_URL";
export const RETRIEVE_SITES_REQUEST = "RETRIEVE_SITE_REQUEST";
export const RETRIEVE_SITES_SUCCESS = "RETRIEVE_SITES_SUCCESS";
export const RETRIEVE_SITES_FAILURE = "RETRIEVE_SITES_FAILURE";

/**
 * Action creators
 */

/**
 * An action creator for the opening link site modal action.
 *
 * @returns {Object} An open link site modal action.
 */
export function linkSiteModalOpen() {
	return {
		type: LINK_SITE_MODAL_OPEN,
	};
}

/**
 * An action creator for the closing link site modal action.
 *
 * @returns {Object} A close link site modal action.
 */
export function linkSiteModalClose() {
	return {
		type: LINK_SITE_MODAL_CLOSE,
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
 * An action creator for the link site request action.
 *
 * @returns {Object} A link site request action.
 */
export function linkSiteRequest() {
	return {
		type: LINK_SITE_REQUEST,
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
 * @param {Object} error The error object that was thrown.
 *
 * @returns {Object} A link site failure action.
 */
export function linkSiteFailure( error ) {
	return {
		type: LINK_SITE_FAILURE,
		linkSiteError: error,
	};
}

/**
 * An action creator for the link site action.
 *
 * @param {string}  url      The site url trying to be linked.
 * @param {string}  type     The CMS the to be linked site is running on.
 * @param {boolean} fromHome Whether the site was linked from the homepage or not.
 *
 * @returns {Object} A link site request action.
 */
export function linkSite( url, type, fromHome = false ) {
	return ( dispatch ) => {
		dispatch( updateSiteUrl( url ) );
		dispatch( linkSiteRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/sites/`, "POST", { url, type } );

		return doRequest( request )
			.then( json => dispatch( linkSiteSuccess( json ) ) )
			.then( () => {
				fromHome && dispatch( push( "/sites" ) );
			} )
			.catch( error => dispatch( linkSiteFailure( error ) ) );
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
 * An action creator for loading sites, products and subscriptions.
 *
 * @returns {Object} a dispatcher that dispatches the actions.
 */
export function loadSites() {
	return ( dispatch ) => {
		dispatch( retrieveSites() );
		dispatch( getAllProducts() );
		dispatch( getAllSubscriptions() );
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

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/sites/` );

		return doRequest( request )
			.then( json => dispatch( retrieveSitesSuccess( json ) ) )
			.catch( error => dispatch( retrieveSitesFailure( error.message ) ) );
	};
}
