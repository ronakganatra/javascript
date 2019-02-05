import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from "react-router-dom";
import Connect from "../../../src/components/connect/Connect";
import React from "react";

test( 'The connect page matches the snapshot', () => {

	let mockedLocation = {
		location: {
			pathname: "/connect",
		},
	};

	const siteAuthorizations = [ { description: "Receive Yoast plugin updates." }, { description: "Send messages to MyYoast." } ];
	const myYoastAuthorizations = [ { description: "Send messages to your website." } ];

	const component = createComponentWithIntl(
		<Router>
			<Connect
				dataMissing={ false }
				clientId="1"
				url="http://test.test"
				pluginSlug={ [ "1", "2", "3" ] }
				siteAuthorizations={ siteAuthorizations }
				myYoastAuthorizations={ myYoastAuthorizations }
			/>
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
