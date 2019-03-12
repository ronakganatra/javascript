import Cookies from "js-cookie";
import _defaultTo from "lodash/defaultTo";
import url from "url";

/**
 * Removes the cookie signage Express adds.
 *
 * @param {string} cookie The signed cookie.
 * @returns {string} The raw value.
 */
export function removeCookieSignage( cookie ) {
	return cookie.replace( /s:([^.]+)\..*/, "$1" );
}

/**
 * Determines whether or an access token is available.
 *
 * @returns {boolean} Whether or not an access token is available.
 */
export function hasAccessToken() {
	return !! Cookies.get( "access_token" );
}

/**
 * Returns the access token known from the cookies.
 *
 * @returns {string} The available access token.
 */
export function getAccessToken() {
	return removeCookieSignage( _defaultTo( Cookies.get( "access_token" ), "" ) );
}

/**
 * Returns the user ID known from the cookies
 *
 * @returns {string} The known user ID
 */
export function getUserId() {
	return removeCookieSignage( _defaultTo( Cookies.get( "userId" ), "" ) );
}

/**
 * Removes cookies that are relevant for authentication
 *
 * @returns {void}
 */
export function removeCookies() {
	Cookies.remove( "access_token" );
	Cookies.remove( "userId" );
}

/**
 * Returns Cookie credentials from the URL parameters.
 *
 * @returns {{accessToken, userId}} The Cookie credentials.
 */
export function getCookieParams() {
	let parsedUrl = url.parse( document.location.href, true );

	return {
		accessToken: parsedUrl.query.access_token,
		userId: parsedUrl.query.user_id,
	};
}
