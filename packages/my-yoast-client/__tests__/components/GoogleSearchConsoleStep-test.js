import React from 'react';
import { createComponentWithIntl } from "../../utils";
import GoogleSearchConsoleStep from "../../src/components/sites/configuration-service-requests/GoogleSearchConsoleStep";

test('The GoogleSearchConsoleStep component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<GoogleSearchConsoleStep
			googleSearchConsole={ true }
			onSubmit={ () => { console.log( "clicked on Submit" ) } }
			onBack={ () => { console.log( "clicked on Back" ); } }
			completeStep={ () => { console.log( "clicked on Submit" ); } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
