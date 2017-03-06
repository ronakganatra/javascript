
import React from 'react';
import renderer from 'react-test-renderer';

import { RoundBackButton } from '../../src/components/RoundButton';

test('the round back button matches the snapshot', () => {
	const component = renderer.create(
		<RoundBackButton>ButtonValue</RoundBackButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round back button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<RoundBackButton type="button">ButtonValue</RoundBackButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
