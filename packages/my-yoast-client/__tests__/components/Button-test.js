import React from 'react';
import renderer from 'react-test-renderer';

import { Button, BeaconButton, LargeSecondaryButton } from '../../src/components/Button';

test('the button matches the snapshot', () => {
	const component = renderer.create(
		<Button>ButtonValue</Button>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the button with button type given matches the snapshot', () => {
	const component = renderer.create(
		<Button type="button">ButtonValue</Button>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the button handling an onclick event', () => {
	const component = renderer.create(
		<Button onClick={ () => {
			return 'clicked';
		} }>ButtonValue</Button>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	tree.props.onClick();
	
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the beacon button matches the snapshot', () => {
	const component = renderer.create(
		<BeaconButton>ButtonValue</BeaconButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the Large Secondary Button matches the snapshot', () => {
	const component = renderer.create(
		<LargeSecondaryButton>ButtonValue</LargeSecondaryButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


