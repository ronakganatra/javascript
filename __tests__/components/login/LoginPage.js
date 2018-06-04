import React from 'react';
import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from 'react-router-dom';

import LoginPage from "../../../src/components/login/LoginPage";

test( 'The Signup component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<LoginPage />
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );