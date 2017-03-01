import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { login, fetchUser } from "./actions";
import getAccessToken from "./functions/getAccessToken";
import getUserId from "./functions/getUserId";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import Cookies from "js-cookie";

const loggerMiddleware = createLogger();

let store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

let hasAccessToken = !! Cookies.get( "access_token" );

if ( hasAccessToken ) {
	store.dispatch( login( getAccessToken(), getUserId() ) );
	store.dispatch( fetchUser( getAccessToken(), getUserId() ) );

	ReactDOM.render(
		<App store={store}/>,
		document.getElementById( "root" )
	);
} else {
	ReactDOM.render(
		<div>
			You need an access_token cookie to be able to view the client.
			Go to <a href="http://localhost:3000">http://localhost:3000</a> to login.
		</div>,
		document.getElementById( "root" )
	);
}
