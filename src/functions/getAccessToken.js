import Cookies from "js-cookie";
import removeCookieSignage from "./removeCookieSignage";

/**
 * Returns the access token known from the cookies.
 *
 * @returns {string} The available access token.
 */
export default function() {
	return removeCookieSignage( Cookies.get( "access_token" ) );
}
