import { makeGetJSONCookie, makeHasCookie, makeSetCookie } from "./cookieHelpers";

export const setConnectParams = makeSetCookie( "connectParams", 1 / 24 );

export const hasConnectParams = makeHasCookie( "connectParams" );

export const getConnectParams = makeGetJSONCookie( "connectParams" );
