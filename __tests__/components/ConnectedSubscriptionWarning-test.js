import React from 'react';
import { createComponentWithIntl } from "../../utils";
import ConnectedSubscriptionWarning from "../../src/components/ConnectedSubscriptionWarning";


let subscriptions = [
	{
		id: "product 1",
		limit: 1,
		name:"some test product 1"
	},
	{
		id: "product 2",
		limit: 1,
		name:"some test product 2"
	},
	{
		id: "product 3",
		limit: 2,
		name:"some test product 3"
	},
	{
		id: "product 4",
		limit: 5,
		name:"some test product 4"
	}
];


test( 'the sites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ConnectedSubscriptionWarning subscriptions={ subscriptions }/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
