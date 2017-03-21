import React from 'react';
import renderer from 'react-test-renderer';
import AddSite from '../../src/components/AddSite';

test('The AddSite component matches the snapshot', () => {
	const component = renderer.create(
		<AddSite onLinkClick={ () => {
			console.log( "clicked on link" );
		} } onCancelClick={ () => {
			console.log( "clicked on cancel" );
		} }/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

