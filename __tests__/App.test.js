import React from "react";
import App from "../src/App";
import { createStore } from "redux";
import rootReducer from "../src/reducers";
import renderer from 'react-test-renderer';
import createHistory from "history/createBrowserHistory";

it( "renders without crashing", () => {
	const store = createStore( rootReducer );
	const history = createHistory();

	const component = renderer.create(
		<App store={store} history={ history } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
