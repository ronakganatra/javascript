
import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../../src/components/Button';

test('the button matches the snapshot', () => {
	const component = renderer.create(
		<Button value="ButtonValue" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<Button type="button" value="ButtonValue" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the button handling an onclick event', () => {
	const component = renderer.create(
		<Button onClick={ () => {
			return 'clicked';
		} } value="ButtonValue" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	tree.props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
