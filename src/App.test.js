import React from "react";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./reducers";
import renderer from 'react-test-renderer';

it( "renders without crashing", () => {
	const store = createStore( rootReducer );

	const component = renderer.create(
		<App store={store} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
