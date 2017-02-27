import removeCookieSignage from "./removeCookieSignage";
import Cookies from "js-cookie";

export default function getUsedId() {
	return removeCookieSignage( Cookies.get( "userId" ) );
}
