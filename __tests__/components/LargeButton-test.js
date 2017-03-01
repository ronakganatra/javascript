
import React from 'react';
import renderer from 'react-test-renderer';

import { LargeButton } from '../../src/components/Button';

test('the large button matches the snapshot', () => {
	const component = renderer.create(
		<LargeButton>ButtonValue</LargeButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


test('the button handling an onclick event', () => {
	const component = renderer.create(
		<LargeButton onClick={ () => {
			console.log( 'clicked' );
		} }>ButtonValue</LargeButton>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});