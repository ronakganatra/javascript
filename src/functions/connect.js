import Cookies from "js-cookie";

function makeSetCookie( key ) {
	return ( value ) => {
		Cookies.set( key, value );
	};
}

function makeGetCookie( key ) {
	return () => {
		return Cookies.get( key );
	};
}

function makeHasCookie( key ) {
	return () => {
		return !! Cookies.get( key );
	};
}

export const setConnectClientId = makeSetCookie( "connectClientId" );
export const setConnectUrl = makeSetCookie( "connectUrl" );
export const setConnectPluginSlug = makeSetCookie( "connectpluginSlug" );

export const getConnectClientId = makeGetCookie( "connectClientId" );
export const getConnectUrl = makeGetCookie( "connectUrl" );
export const getConnectPluginSlug = makeGetCookie( "connectpluginSlug" );

export const hasConnectClientId = makeHasCookie( "connectClientId" );
export const hasConnectUrl = makeHasCookie( "connectUrl" );
export const hasConnectPluginSlug = makeHasCookie( "connectpluginSlug" );
