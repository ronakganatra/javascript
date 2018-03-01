import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { login, fetchUser } from "./actions/user";
import { hasAccessToken, getAccessToken, getUserId, setPeriLoginCookie, directToIntendedDestination,
	shouldBeRedirected, hasCookieParams, setCookieFromParams } from "./functions/auth";
import { getAuthUrl } from "./functions/auth";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { addLocaleData }from "react-intl";
import en from "react-intl/locale-data/en";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

let history = createHistory();

/**
 * If we are in a development environment, we want the store to include the redux-logger.
 * On a production build we want the logger to be omitted.
 */
let middleware = [
	thunkMiddleware,
	routerMiddleware( history ),
];

if( process.env.NODE_ENV === "development" ) {
	middleware.push( createLogger() );
}

export const store = createStore(
	rootReducer,
	applyMiddleware( ...middleware )
);

/**
 * Bootstrapping the App, so that we can call it after checking whether users need to be redirected.
 *
 * @returns {void}
 */
function app() {
	addLocaleData( en );

	if ( hasCookieParams() ) {
		setCookieFromParams();
	}

	if ( hasAccessToken() ) {
		store.dispatch( login( getAccessToken(), getUserId() ) );
		store.dispatch( fetchUser( getUserId() ) );

		ReactDOM.render(
			<App store={ store } history={ history }/>,
			document.getElementById( "root" )
		);
	} else {
		setPeriLoginCookie();
		document.location.href = getAuthUrl();
	}
}

if ( shouldBeRedirected() ) {
	directToIntendedDestination();
} else {
	if ( global.Intl ) {
		app();
	} else {
		require.ensure(
			[ "intl", "intl/locale-data/jsonp/en.js" ],
			require => {
				require( "intl" );
				require( "intl/locale-data/jsonp/en.js" );
				app();
			}
		);
	}
}
