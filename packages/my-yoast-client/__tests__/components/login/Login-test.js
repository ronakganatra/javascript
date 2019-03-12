import React from 'react';
import { createComponentWithIntl } from "../../../utils";

import Login from "../../../src/components/login/Login";
import { MemoryRouter as Router } from "react-router-dom";

test( 'The Login component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<Login
				requireOTP={ false }
				attemptLogin={ () => {
				} }
			/>
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The Login component with OTP required matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<Login
				requireOTP={ true }
				attemptLogin={ () => {
				} }
			/>
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
