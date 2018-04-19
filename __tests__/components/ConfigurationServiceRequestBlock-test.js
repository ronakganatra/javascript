import React from 'react';
import { createComponentWithIntl } from "../../utils";
import ConfigurationServiceRequestBlock from "../../src/components/sites/ConfigurationServiceRequestBlock";

test('The ConfigurationServiceRequestBlock component matches the snapshot', () => {
	const component = createComponentWithIntl(
			<ConfigurationServiceRequestBlock
				amountAvailable={ 1 }
				openConfigurationServiceRequestModal={ () => { console.log( "clicked on Request Configuration Service" ); } }
				sites={ [ "https/:a.com", "https/:b.com", "https/:c.com" ] }
			/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


