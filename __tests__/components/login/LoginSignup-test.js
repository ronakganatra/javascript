import React from 'react';
import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from 'react-router-dom';

import LoginSignup from "../../../src/components/login/LoginSignup";

test( 'The LoginSignup component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<LoginSignup />
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );