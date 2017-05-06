import React from 'react';
import ProfilePage from '../../src/components/ProfilePage';
import { createComponentWithIntl } from "../../utils";

test('the site page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ProfilePage
				email={ "test@test.test" }
				image="dummy.png"
				onUpdateEmail={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
