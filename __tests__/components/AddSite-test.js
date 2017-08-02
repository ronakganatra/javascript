import React from 'react';
import { createComponentWithIntl } from "../../utils";

import AddSite from '../../src/components/AddSite';

test('The AddSite component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<AddSite onConnectClick={ () => {
			console.log( "clicked on link" );
		} } onCancelClick={ () => {
			console.log( "clicked on cancel" );
		} }
			onChange={ () => {} }
			errorFound={ false }
			query=""
			linkingSiteUrl=""
		/>

	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
