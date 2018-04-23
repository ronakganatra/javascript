import React from 'react';
import BackupStep from "../../src/components/sites/configuration-service-requests/BackupStep";
import { createComponentWithIntl } from "../../utils";

test('The BackupStep component matches the snapshot', () => {
	const component = createComponentWithIntl(
			<BackupStep
				backupRequired={ true }
				onSubmit={ () => { console.log( "clicked on Continue" ) } }
				onBack={ () => { console.log( "clicked on Back" ); } }
				completeStep={ () => { console.log( "clicked on Continue" ); } } />
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
