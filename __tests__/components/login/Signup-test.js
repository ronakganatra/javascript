import React from 'react';
import { createComponentWithIntl } from "../../../utils";

import Signup from "../../../src/components/login/Signup";

test( 'The Signup component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Signup />,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );