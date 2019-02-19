import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from "react-router-dom";
import Connect from "../../../src/components/connect/Connect";
import React from "react";

test( 'The connect page matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<Connect
				dataMissing={ false }
				clientId="1"
				url="http://test.test"
				redirectUrl="http://test.test"
				extensions={ [ "1", "2", "3" ] }
				type="wordpress"
			/>
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
