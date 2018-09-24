import React from "react";
import App from "../src/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../src/reducers";
import renderer from 'react-test-renderer';
import thunkMiddleware from "redux-thunk";
import createHistory from "history/createMemoryHistory";

jest.mock( "whatwg-fetch" );

it( "renders without crashing", () => {
	const store = createStore(
		rootReducer,
		applyMiddleware( thunkMiddleware )
	);
	const history = createHistory();

	const component = renderer.create(
		<App store={store} history={history} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
