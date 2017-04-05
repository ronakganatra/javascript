import React from "react";
import App from "../src/App";
import { createStore } from "redux";
import rootReducer from "../src/reducers";
import renderer from 'react-test-renderer';

it( "renders without crashing", () => {
	const store = createStore( rootReducer );

	const component = renderer.create(
		<App store={store} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
