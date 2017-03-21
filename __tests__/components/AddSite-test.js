import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../../src/components/AddSite.js';

test('The AddSite component matches the snapshot', () => {
	const component = renderer.create(
		<AddSite />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

// test('the AddSite buttons handling the onclick event', () => {
// 	const component = renderer.create(
// 		<Button onClick={ () => {
// 			return 'clicked';
// 		} }>ButtonValue</Button>
// 	);
//
// 	let tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
//
// 	// manually trigger the callback
// 	tree.props.onClick();
//
// 	// re-rendering
// 	tree = component.toJSON();
// 	expect(tree).toMatchSnapshot();
// });
