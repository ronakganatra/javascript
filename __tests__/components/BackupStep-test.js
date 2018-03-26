import React from 'react';
import BackupStep from "../../src/components/BackupStep";

test('The BackupStep component matches the snapshot', () => {
	const component = <BackupStep
		createBackup={ true }
		onSubmit={ () => { console.log( "clicked on Continue" ) } }
		onBack={ () => { console.log( "clicked on Back" ); } }
		completeStep={ () => { console.log( "clicked on Continue" ); } } />;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
