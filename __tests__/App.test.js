import React from "react";
import App from "../src/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../src/reducers";
import renderer from 'react-test-renderer';
import createHistory from "history/createBrowserHistory";
import thunkMiddleware from "redux-thunk";

jest.mock( "whatwg-fetch" );

it( "renders without crashing", () => {
	const store = createStore(
		rootReducer,
		applyMiddleware( thunkMiddleware )
	);
	const history = {};

	const component = renderer.create(
		<App store={store} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
