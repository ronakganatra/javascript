import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteDangerZone from '../../src/components/SiteDangerZone';

test('the site dangerzone matches the snapshot', () => {
	const component =  createComponentWithIntl(
		<SiteDangerZone removing={ false } onRemove={ () => {
			console.log( "Remove site" );
		} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the site dangerzone with removing = true matches the snapshot', () => {
	const component =  createComponentWithIntl(
		<SiteDangerZone removing={ true } onRemove={ () => {
			console.log( "Remove site" );
		} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the site dangerzone onRemove handling', () => {
	const component =  createComponentWithIntl(
		<SiteDangerZone removing={ false } onRemove={ () => {
			console.log( "Remove site" );
		} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback on the toggle.
	tree.props.onRemove;

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
