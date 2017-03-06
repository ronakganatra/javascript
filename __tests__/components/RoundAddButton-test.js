
import React from 'react';
import renderer from 'react-test-renderer';

import { RoundAddButton } from '../../src/components/RoundButton';

test('the round add button matches the snapshot', () => {
	const component = renderer.create(
		<RoundAddButton>ButtonValue</RoundAddButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round add button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<RoundAddButton type="button">ButtonValue</RoundAddButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
