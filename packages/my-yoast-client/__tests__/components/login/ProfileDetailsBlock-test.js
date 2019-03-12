import React from 'react';
import ProfileDetailsBlock from "../../../src/components/account/profile/ProfileDetailsBlock";
import { createComponentWithIntl } from "../../../utils";

test( 'The ProfileDetailsBlock component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ProfileDetailsBlock />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );