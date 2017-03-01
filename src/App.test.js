import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./reducers";

it( "renders without crashing", () => {
	const store = createStore( rootReducer );
	const div = document.createElement( "div" );

	ReactDOM.render( <App store={store} />, div );
} );
