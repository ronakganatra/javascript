import React from 'react';
import renderer from 'react-test-renderer';
import { createComponentWithIntl } from "../../utils";

import AddSite from '../../src/components/AddSite';

test('The AddSite component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<AddSite onLinkClick={ () => {
			console.log( "clicked on link" );
		} } onCancelClick={ () => {
			console.log( "clicked on cancel" );
		} }
			onChange={ () => {} }
			errorFound={ false }
		/>

	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
