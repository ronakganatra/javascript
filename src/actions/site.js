import "whatwg-fetch";
import { push } from "react-router-redux";
import { prepareInternalRequest, doRequest } from "../functions/api";

/**
 * Action types
 */

export const SITE_TOGGLE_SUBSCRIPTION_REQUEST = "SITE_TOGGLE_SUBSCRIPTION_REQUEST";
export const SITE_TOGGLE_SUBSCRIPTION_FAILURE = "SITE_TOGGLE_SUBSCRIPTION_FAILURE";
export const SITE_ADD_SUBSCRIPTION_SUCCESS = "SITE_ADD_SUBSCRIPTION_SUCCESS";
export const SITE_REMOVE_SUBSCRIPTION_SUCCESS = "SITE_REMOVE_SUBSCRIPTION_SUCCESS";
export const SITE_REMOVE_START = "SITE_REMOVE_START";
export const SITE_REMOVE_SUCCESS = "SITE_REMOVE_SUCCESS";
export const SITE_REMOVE_FAILURE = "SITE_REMOVE_FAILURE";
export const SITE_CHANGE_PLATFORM_REQUEST = "SITE_CHANGE_PLATFORM_REQUEST";
export const SITE_CHANGE_PLATFORM_SUCCESS = "SITE_CHANGE_PLATFORM_SUCCESS";
export const SITE_CHANGE_PLATFORM_FAILURE = "SITE_CHANGE_PLATFORM_FAILURE";

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

		const request = prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "PUT" );

		return doRequest( request )
			.then( dispatch( siteAddSubscriptionSuccess( siteId, subscriptionId ) ) )
			.catch( error => dispatch( siteToggleSubscriptionFailure( error.message ) ) );
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

		const request = prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "DELETE" );

		return doRequest( request )
			.then( dispatch( siteRemoveSubscriptionSuccess( siteId, subscriptionId ) ) )
			.catch( error => dispatch( siteToggleSubscriptionFailure( error.message ) ) );
	};
}

/**
 * An action creator for the start of the site removal.
 *
 * @param {string} siteId The id of the site which needs to be removed.
 *
 * @returns {Object} A site remove start action.
 */
export function siteRemoveStart( siteId ) {
	return {
		type: SITE_REMOVE_START,
		siteId: siteId,
	};
}

/**
 * An action creator for the start of the site removal.
 *
 * @param {string} siteId The id of the site for which was removed.
 *
 * @returns {Object} A site remove success action.
 */
export function siteRemoveSuccess( siteId ) {
	return {
		type: SITE_REMOVE_SUCCESS,
		siteId: siteId,
	};
}

/**
 * An action creator for the start of the site removal.
 *
 * @param {string} siteId The id of the site for which was meant to be removed.
 * @param {string} errorText The error message.
 *
 * @returns {Object} A site remove failure action.
 */
export function siteRemoveFailure( siteId, errorText ) {
	return {
		type: SITE_REMOVE_FAILURE,
		siteId: siteId,
		siteRemoveError: errorText,
	};
}

/**
 * An action creator for site removal.
 *
 * @param {string} siteId The id of the site which needs to be removed.
 *
 * @returns {Object} A site remove request action.
 */
export function siteRemove( siteId ) {
	return ( dispatch ) => {
		dispatch( siteRemoveStart( siteId ) );

		const request = prepareInternalRequest( `Sites/${siteId}/`, "DELETE" );

		return doRequest( request )
			.then( () => dispatch( siteRemoveSuccess( siteId ) ) )
			.then( () => dispatch( push( "/sites/" ) ) )
			.catch( error => dispatch( siteRemoveFailure( siteId, error.message ) ) );
	};
}

/**
 * An action creator for indicating successful changing of the platform.
 *
 * @returns {Object} A site change platform success action.
 */
export function siteChangePlatformRequest() {
	return {
		type: SITE_CHANGE_PLATFORM_REQUEST,
	};
}

/**
 * An action creator for indicating successful changing of the platform.
 *
 * @param {string} siteId   The id of the site the platform has changed for.
 * @param {string} siteType The type of platform the site has changed to.
 * @returns {Object} A site change platform success action.
 */
export function siteChangePlatformSuccess( siteId, siteType ) {
	return {
		type: SITE_CHANGE_PLATFORM_SUCCESS,
		siteId,
		siteType,
	};
}

/**
 * An action creator for indicating failure during the changing of the platform.
 *
 * @param {Object} error The error thrown.
 *
 * @returns {Object} A site change platform failure action.
 */
export function siteChangePlatformFailure( error ) {
	return {
		type: SITE_CHANGE_PLATFORM_FAILURE,
		error,
	};
}

/**
 * An action creator for changing the platform of a site.
 *
 * @param {string} siteId The id of the site to change the platform for.
 * @param {string} siteType The type of platform the site should change to.
 *
 * @returns {Object} A site change platform action.
 */
export function siteChangePlatform( siteId, siteType ) {
	return ( dispatch ) => {
		dispatch( siteChangePlatformRequest() );

		const request = prepareInternalRequest( `Sites/${siteId}/`, "PATCH", { type: siteType } );

		return doRequest( request )
			.then( json => dispatch( siteChangePlatformSuccess( json.id, json.type ) ) )
			.catch( error => dispatch( siteChangePlatformFailure( error ) ) );
	};
}
