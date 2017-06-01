import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Site from '../../src/components/Site';

let plugins = [
	{
		glNumber: 111,
		ids: [ "1" ],
		icon: "test.jpg",
		name: "Test",
	},
	{
		glNumber: 222,
		ids: [ "2" ],
		icon: "test.jpg",
		name: "Test2",
	},
	{
		glNumber: 333,
		ids: [ "3" ],
		icon: "test.jpg",
		name: "Test3",
	},
	{
		glNumber: 444,
		ids: [ "4" ],
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		productId: "1",
	},
	{
		productId: "2",
	},
]

test('the site component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Site plugins={ plugins } activeSubscriptions={ activeSubscriptions } siteName="yoast.com" siteIcon="" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
