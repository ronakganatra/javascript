import React from 'react';
import { createComponentWithIntl } from "../../utils";

import AddSiteModal from '../../src/components/AddSiteModal';

test('The AddSiteModal component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<AddSiteModal onClose={ () => {
			console.log( "clicked on Cancel" );
		} } onLink={ () => {
			console.log( "clicked on Link" );
		} } isOpen={ true }/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
