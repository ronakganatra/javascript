import removeCookieSignage from "./removeCookieSignage";
import Cookies from "js-cookie";

/**
 * Returns the user ID known from the cookies
 *
 * @returns {string} The known user ID
 */
export default function getUserId() {
	return removeCookieSignage( Cookies.get( "userId" ) );
}
