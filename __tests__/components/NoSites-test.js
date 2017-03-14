import React from 'react';
import renderer from 'react-test-renderer';
import NoSites from '../../src/components/NoSites';
import { createComponentWithIntl } from "../../utils";

test('the nosites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<NoSites onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the nosites component handling an onclick event', () => {
	const component = createComponentWithIntl(
		<NoSites onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[4].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
