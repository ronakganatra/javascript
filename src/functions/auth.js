import Cookies from "js-cookie";
import getEnv from "./getEnv";
import _defaultTo from "lodash/defaultTo";
import _isEmpty from "lodash/isEmpty";
import url from "url";

/**
 * Get the yoast.com access OAuth token of a user who is already logged in on yoast.com
 *
 * @returns {Object} A promise containing the access token.
 */
export function fetchAccessToken() {
	return new Promise( ( resolve, reject ) => {
		if ( hasAccessToken() ) {
			return resolve( getAccessToken() );
		}

		let frame = document.createElement( "IFrame" );
		frame.onload = () => {
			if ( _isEmpty( frame.contentDocument ) ) {
				return reject( new Error( "IFrame could not be loaded" ) );
			}

			let accessToken = getAccessToken();

			if ( _isEmpty( accessToken ) ) {
				return reject( new Error( "User is not logged in. WordPress cookie was not present." ) );
			}

			return resolve( accessToken );
		};
		frame.src = getOAuthUrl();
		frame.style = "display:none; height:1px; width:1px;";
		document.body.appendChild( frame );
	} );
}

/**
 * Returns the auth URL where the user can authenticate themselves via OAuth.
 *
 * @returns {string} The URL where the user can authenticate.
 */
export function getOAuthUrl() {
	return getEnv( "AUTH_URL", "http://my.yoast.test:3000/auth/yoast" );
}

/**
 * Redirects to the authentication URL.
 *
 * @returns {void}
 */
export function redirectToOAuthUrl() {
	setPeriLoginCookie();
	document.location.href = getOAuthUrl();
}

/**
 * Sets the intendedDestination in the site-wide cookie containing the URL where the user intended to go.
 *
 * @returns {void}
 */
export function setPeriLoginCookie() {
	if ( hasPeriLoginCookie() === false ) {
		Cookies.set( "intendedDestination", window.location.href );
	}
}

/**
 * Removes the intendedDestination from the site-wide cookie.
 *
 * @returns {void}
 */
export function removePeriLoginCookie() {
	Cookies.remove( "intendedDestination" );
}

/**
 * Checks whether the intendedDestination cookie is set.
 *
 * @returns {boolean} Whether or not the cookie was set.
 */
export function hasPeriLoginCookie() {
	return !! Cookies.get( "intendedDestination" );
}

/**
 * Directs the user to the my.yoast.com url they wanted to visit before logging in.
 *
 * @returns {bool} Whether or not we have been redirected.
 */
export function directToIntendedDestination() {
	let redirectUrl = getRedirectUrl();
	removePeriLoginCookie();
	window.location.href = redirectUrl;
}

/**
 * Gets the url the user should be redirect to after the login.
 *
 * @returns {string} The url the user should be redirected to.
 */
export function getRedirectUrl() {
	if ( hasPeriLoginCookie() ) {
		return Cookies.get( "intendedDestination" );
	}
	return getEnv( "HOME_URL", "http://my.yoast.test:3001" );
}

/**
 * Returns the logout URL where the user can logout.
 *
 * @returns {string} The URL where the user can logout.
 */
export function getLogoutUrl() {
	return getEnv( "LOGOUT_URL", "http://yoast.test/wp/wp-login.php?action=logout" );
}

/**
 * Returns the URL where the user can reset their password.
 *
 * @returns {string} The URL where the user can reset their password.
 */
export function getPasswordResetUrl() {
	return getEnv( "PASSWORD_RESET_URL", "http://yoast.test/wp-login.php?action=lostpassword" );
}

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

/**
 * Checks if the URL parameters contain Cookie credentials.
 *
 * @returns {boolean} Whether the url params contain Cookie credentials.
 */
export function hasCookieParams() {
	let cookieParams = getCookieParams();

	return ( cookieParams.accessToken && cookieParams.userId );
}

/**
 * Sets Cookie credentials from the parameters.
 *
 * @returns {void}
 */
export function setCookieFromParams() {
	let cookieParams = getCookieParams();

	if ( cookieParams.accessToken && cookieParams.userId ) {
		Cookies.set( "access_token", cookieParams.accessToken );
		Cookies.set( "userId", cookieParams.userId );
	}
}
