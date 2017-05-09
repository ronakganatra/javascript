import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Site from '../../src/components/Site';

let plugins = [
	{
		id: "0001",
		icon: "test.jpg",
		name: "Test",
	},
	{
		id: "0002",
		icon: "test.jpg",
		name: "Test2",
	},
	{
		id: "0003",
		icon: "test.jpg",
		name: "Test3",
	},
	{
		id: "0004",
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		productId: "0001",
	},
	{
		productId: "0002",
	},
]

test('the site component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Site plugins={ plugins } activeSubscriptions={ activeSubscriptions } siteName="yoast.com" siteIcon="" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
