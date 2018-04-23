import React from 'react';
import Stepper from "../../src/components/general/Stepper";
import BackupStep from "../../src/components/sites/configuration-service-requests/BackupStep";
import AdminstratorLoginStep from "../../src/components/sites/configuration-service-requests/AdministratorLoginStep";
import { createComponentWithIntl } from "../../utils";


test('The Stepper component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Stepper
			steps={ [
				{
					stepAriaLabel: "Step 1: Administrator login",
					label: "Administrator login",
					component: <AdminstratorLoginStep onClose={ () => { console.log( "clicked on Close" ); } }
													   confirmed={ true }
													   onSubmit={ () => { console.log( "clicked on Continue" ); } }/>,
				},
				{
					stepAriaLabel: "Step 2: Backup",
					label: "Backup",
					component: <BackupStep
						backupRequired={ true }
						onSubmit={ () => { console.log( "clicked on Continue" ) } }
						onBack={ () => { console.log( "clicked on Back" ); } }
						completeStep={ () => { console.log( "clicked on Continue" ); } } />
				},
			] }
			activeStep={ 1 }
			goToStep={ () => { console.log( "Click on a step header" ); } }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
