import React from 'react';
import renderer from 'react-test-renderer';

import Toggle from '../../src/components/Toggle';

test('an enabled toggle which matches the snapshot', () => {
	const component = renderer.create( <Toggle isEnabled={true} /> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('a disabled toggle which matches the snapshot', () => {
	const component = renderer.create( <Toggle isEnabled={false} /> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('an enabled toggle that is disabled', () => {
	const component = renderer.create( <Toggle isEnabled={true} /> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	tree.props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('a disabled toggle that is enabled', () => {
	const component = renderer.create( <Toggle isEnabled={false} /> );

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	tree.props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
