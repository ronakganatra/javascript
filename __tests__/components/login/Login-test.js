import React from 'react';
import { createComponentWithIntl } from "../../../utils";

import Login from "../../../src/components/login/Login";

test( 'The Login component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Login />,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );