import React from 'react';
import { createComponentWithIntl } from "../../utils";

import Sites from '../../src/components/Sites';

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

test('the sites component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Sites onManage={ ( sitesId ) => {
			return sitesId;
		} } sites={[
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
				siteName: "www.yoast.com",
				activeSubscriptions: activeSubscriptions,
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
				siteName: "www.google.com",
				activeSubscriptions: activeSubscriptions,
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b956",
				siteName: "www.facebook.com",
				activeSubscriptions: activeSubscriptions,
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},
		] } plugins= { plugins } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
