
import React from 'react';
import renderer from 'react-test-renderer';

import { GreenButton } from '../../src/components/Button';

test('the green button matches the snapshot', () => {
	const component = renderer.create(
		<GreenButton>ButtonValue</GreenButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the button handling an onclick event', () => {
	const component = renderer.create(
		<GreenButton onClick={ () => {
			console.log( 'clicked' );
		} }>ButtonValue</GreenButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
