import React from 'react';
import ImportDataStep from "../../src/components/sites/configuration-service-requests/ImportDataStep";
import { createComponentWithIntl } from "../../utils";

test('The ImportDataStep component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ImportDataStep
			importData={ 0 }
			onSubmit={ () => { console.log( "clicked on Continue" ) } }
			onBack={ () => { console.log( "clicked on Back" ); } }
			completeStep={ () => { console.log( "clicked on Continue" ); } } />
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
