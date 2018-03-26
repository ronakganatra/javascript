import React from 'react';
import Stepper from "../../src/components/Stepper";
import BackupStep from "../../src/components/BackupStep"

test('The Stepper component matches the snapshot', () => {
	const component = <Stepper
		steps={ [
			{
				step: "step 1",
				label: "Administrator Login",
				component: <AdminstratorLoginStep onClose={ () => { console.log( "clicked on Close" ); } }
												   confirmed={ () => { console.log( "Checked the confirmation" ); } }
												   onSubmit={ () => { console.log( "clicked on Continue" ); } }/>,
			},
			{
				step: "step 2",
				label: "Backup",
				component: <BackupStep
					createBackup={ true }
					onSubmit={ () => { console.log( "clicked on Continue" ) } }
					onBack={ () => { console.log( "clicked on Back" ); } }
					completeStep={ () => { console.log( "clicked on Continue" ); } } />
			},
		] }
		activeStep={ 1 }
		goToStep={ () => { console.log( "Click on a step header" ); } }/>;

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

