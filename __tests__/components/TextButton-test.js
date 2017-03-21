import React from 'react';
import renderer from 'react-test-renderer';

import { TextButton } from '../../src/components/Button';

test('the green button matches the snapshot', () => {
	const component = renderer.create(
		<TextButton>ButtonValue</TextButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
