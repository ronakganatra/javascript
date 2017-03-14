import React from 'react';
import renderer from 'react-test-renderer';

import { WhiteButton } from '../../src/components/Button';

test('the white button matches the snapshot', () => {
	const component = renderer.create(
		<WhiteButton>ButtonValue</WhiteButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
