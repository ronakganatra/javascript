
import React from 'react';
import renderer from 'react-test-renderer';

import { GreenButton } from '../../src/components/Button';

test('the green button matches the snapshot', () => {
	const component = renderer.create(
		<GreenButton value="ButtonValue" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
