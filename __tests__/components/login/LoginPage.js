import React from 'react';
import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from 'react-router-dom';

import LoginPage from "../../../src/components/login/LoginSignupPage";

test( 'The login page matches the snapshot', () => {

	let mockedLocation = {
		location: {
			pathname: "/login",
		},
	};

	const component = createComponentWithIntl(
		<Router>
			<LoginPage location={ mockedLocation } />
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The sign up page matches the snapshot', () => {

	let mockedLocation = {
		location: {
			pathname: "/signup",
		},
	};

	const component = createComponentWithIntl(
		<Router>
			<LoginPage location={ mockedLocation } />
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );