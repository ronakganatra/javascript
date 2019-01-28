import Cookies from "js-cookie";

export function makeSetCookie( key, expiresIn = false ) {
	return ( value ) => {
		if ( expiresIn ) {
			console.log( expiresIn );
			Cookies.set( key, value, {
				expires: expiresIn,
			} );
		} else {
			Cookies.set( key, value );
		}
	};
}

export function makeGetCookie( key ) {
	return () => {
		return Cookies.get( key );
	};
}

export function makeHasCookie( key ) {
	return () => {
		return !! Cookies.get( key );
	};
}

export const setConnectClientId = makeSetCookie( "connectClientId", 1 / 24 );
export const setConnectUrl = makeSetCookie( "connectUrl", 1 / 24 );
export const setConnectPluginSlug = makeSetCookie( "connectpluginSlug", 1 / 24 );

export const getConnectClientId = makeGetCookie( "connectClientId" );
export const getConnectUrl = makeGetCookie( "connectUrl" );
export const getConnectPluginSlug = makeGetCookie( "connectpluginSlug" );

export const hasConnectClientId = makeHasCookie( "connectClientId" );
export const hasConnectUrl = makeHasCookie( "connectUrl" );
export const hasConnectPluginSlug = makeHasCookie( "connectpluginSlug" );
