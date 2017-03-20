import Cookies from "js-cookie";

/**
 * Returns the auth URL where the user can authenticate themselves.
 *
 * @returns {string} The URL where the user can authenticate.
 */
export function getAuthUrl() {
	if ( typeof process.env.REACT_APP_AUTH_URL !== "undefined" ) {
		return process.env.REACT_APP_AUTH_URL;
	}

	return "http://localhost:3000/auth/yoast";
}

/**
 * Returns the logout URL where the user can logout.
 *
 * @returns {string} The URL where the user can logout.
 */
export function getLogoutUrl() {
	if ( typeof process.env.REACT_APP_LOGOUT_URL !== "undefined" ) {
		return process.env.REACT_APP_LOGOUT_URL;
	}

	return "http://yoast.dev/wp/wp-login.php?action=logout";
}

/**
 * Removes the cookie signage Express adds.
 *
 * @param {string} cookie The signed cookie.
 * @returns {string} The raw value.
 */
export function removeCookieSignage( cookie ) {
	return cookie.replace( /s:([^\.]+)\..*/, "$1" );
}

/**
 * Returns the access token known from the cookies.
 *
 * @returns {string} The available access token.
 */
export function getAccessToken() {
	return removeCookieSignage( Cookies.get( "access_token" ) );
}

/**
 * Returns the user ID known from the cookies
 *
 * @returns {string} The known user ID
 */
export function getUserId() {
	return removeCookieSignage( Cookies.get( "userId" ) );
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
