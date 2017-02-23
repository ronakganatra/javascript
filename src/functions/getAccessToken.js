import Cookies from "js-cookie";

export default function() {
	let accessToken = Cookies.get( "access_token" );

	accessToken = accessToken.replace( /s:([^\.]+)\..*/, '$1' );

	return accessToken;
}
