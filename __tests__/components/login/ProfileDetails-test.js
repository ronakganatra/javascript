import React from 'react';
import ProfileDetails from "../../../src/components/login/ProfileDetails";
import { createComponentWithIntl } from "../../../utils";

test( 'The ProfileDetails component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ProfileDetails />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );