
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

test('the button handling an onclick event', () => {
	const component = renderer.create(
		<Button onClick={ () => {
			console.log( 'clicked' );
		} }>ButtonValue</Button>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
