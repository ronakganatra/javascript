import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from "react-router-dom";
import SiteAuthenticationForm from "../../../src/components/connect/SiteAuthenticationForm";
import React from "react";

test( 'The connect page matches the snapshot', () => {
	const siteAuthorizations = [ { description: "Receive Yoast plugin updates." }, { description: "Send messages to MyYoast." } ];
	const myYoastAuthorizations = [ { description: "Send messages to your website." } ];

	const component = createComponentWithIntl(
		<Router>
			<SiteAuthenticationForm
				forUrl="http://test.test"
				siteAuthorizations={ siteAuthorizations }
				myYoastAuthorizations={ myYoastAuthorizations }
				onAuthorize={ () => {} }
				onDeny={ () => {} }
			/>
		</Router>,
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
