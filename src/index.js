import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { login, fetchUser } from "./actions/user";
import { hasAccessToken, getAccessToken, getUserId, setPeriLoginCookie, directToIntendedDestination, shouldBeRedirected } from "./functions/auth";
import { getAuthUrl } from "./functions/auth";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { addLocaleData }from "react-intl";
import en from "react-intl/locale-data/en";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
addLocaleData( en );

let history = createHistory();

const loggerMiddleware = createLogger();

export const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware,
		routerMiddleware( history )
	)
);

/**
 * Bootstrapping the App, so that we can call it after checking whether users need to be redirected.
 *
 * @returns {void}
 */
function app() {
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
	app();
}
