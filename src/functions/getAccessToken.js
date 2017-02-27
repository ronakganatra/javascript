import Cookies from "js-cookie";
import removeCookieSignage from "./removeCookieSignage";

export default function() {
	return removeCookieSignage( Cookies.get( "access_token" ) );
}
