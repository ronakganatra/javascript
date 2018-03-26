import React from 'react';
import { createComponentWithIntl } from "../../utils";
import ConfigurationRequestBlock from "../../src/components/ConfigurationRequestBlock";

test('The ConfigurationRequestBlock component matches the snapshot', () => {
	const component = createComponentWithIntl(
			<ConfigurationRequestBlock
				onConfigurationRequestClick={ () => { console.log( "clicked on Request Configuration Service" ); } }
				sites={ [ "https/:a.com", "https/:b.com", "https/:c.com" ] }
			/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


