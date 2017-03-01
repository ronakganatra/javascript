// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../../src/components/Button';

test('the button matches the snapshot', () => {
	const component = renderer.create(
		<Button>ButtonValue</Button>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});