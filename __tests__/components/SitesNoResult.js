import React from 'react';
import renderer from 'react-test-renderer';
import SitesNoResult from '../../src/components/SitesNoResult';
import { createComponentWithIntl } from "../../utils";

test('the nosites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SitesNoResult onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );


test('the SitesNoResult component handling an onclick event', () => {
	const component = createComponentWithIntl(
		<SitesNoResult onClick={ () => { } } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[2].children[0].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
