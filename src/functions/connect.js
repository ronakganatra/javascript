import { makeGetCookie, makeHasCookie, makeSetCookie } from "./cookieHelpers";

export const setConnectClientId = makeSetCookie( "connectClientId", 1 / 24 );
export const setConnectUrl = makeSetCookie( "connectUrl", 1 / 24 );
export const setConnectPluginSlug = makeSetCookie( "connectpluginSlug", 1 / 24 );

export const getConnectClientId = makeGetCookie( "connectClientId" );
export const getConnectUrl = makeGetCookie( "connectUrl" );
export const getConnectPluginSlug = makeGetCookie( "connectpluginSlug" );

export const hasConnectClientId = makeHasCookie( "connectClientId" );
export const hasConnectUrl = makeHasCookie( "connectUrl" );
export const hasConnectPluginSlug = makeHasCookie( "connectpluginSlug" );
