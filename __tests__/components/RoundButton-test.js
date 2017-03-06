
import React from 'react';
import renderer from 'react-test-renderer';

import { RoundButton } from '../../src/components/RoundButton';

test('the round button matches the snapshot', () => {
	const component = renderer.create(
		<RoundButton>ButtonValue</RoundButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<RoundButton type="button">ButtonValue</RoundButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the round button handling an onclick event', () => {
	const component = renderer.create(
		<RoundButton onClick={ () => {
			return 'clicked';
		} }>ButtonValue</RoundButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	tree.props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
