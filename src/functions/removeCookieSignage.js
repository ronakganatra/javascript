/**
 * Removes the cookie signage Express adds.
 *
 * @param {string} cookie The signed cookie.
 * @returns {string} The raw value.
 */
export default function removeCookieSignage( cookie ) {
	return cookie.replace( /s:([^\.]+)\..*/, "$1" );
}
