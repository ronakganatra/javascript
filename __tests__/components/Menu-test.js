import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
import rootReducer from "../../src/reducers";
// import renderer from 'react-test-renderer';
import thunkMiddleware from "redux-thunk";
import MainMenu, { MainMenuRoutes } from "../../src/components/Menu";
import menuItems from "../../src/config/Menu";

test( 'the menu matches the snapshot', () => {

	global.document = {
		readyState: true,
	};

	const component = createComponentWithIntl(
		<Router>
			<MainMenu menuRoutes={ menuItems } />
		</Router>
	);

	console.log( document );

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
