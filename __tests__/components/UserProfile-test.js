
import React from 'react';
import renderer from 'react-test-renderer';

import UserProfile from '../../src/components/UserProfile';

test('the user profile matches the snapshot', () => {
	const component = renderer.create(
		<UserProfile onLogoutClick={() => {}} displayName="This is a name" displayImage="Image" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
