import React from 'react';
import AdministratorLoginStep from "../../src/components/AdministratorLoginStep";

test('The AdministratorLoginStep component matches the snapshot', () => {
	const component = <AdministratorLoginStep
				confirmed={ true }
				onSubmit={ () => { console.log( "clicked on Continue" ) } }
				onClose={ () => { console.log( "clicked on Close" ); } }
				completeStep={ () => { console.log( "clicked on Continue" ); } }
				resetStep={ () => { console.log( "Unchecked the confirmation" ); } }/>;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});