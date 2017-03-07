import React from 'react';
import renderer from 'react-test-renderer';
import NoSites from '../../src/components/NoSites';

test('the nosites component matches the snapshot', () => {
	const component = renderer.create(
		<NoSites paragraphs={ [ "Welcome to the sites overview." ] } onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the nosites component handling an onclick event', () => {
	const component = renderer.create(
		<NoSites paragraphs={ [ "Welcome to the sites overview." ] } onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[2].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
