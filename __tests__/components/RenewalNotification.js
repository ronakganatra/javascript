import React from 'react';
import { createComponentWithIntl } from "../../utils";

import RenewalNotification from '../../src/components/RenewalNotification';

test('The RenewalNotification component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<RenewalNotification
			subscriptions={ [
			{
				id: "3",
				icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
				name: "SEO Premium for WordPress",
				used: 4,
				limit: 20,
				hasNextPayment: true,
				nextPayment: new Date("October 13, 2014"),
				endDate: new Date(),
				hasEndDate: false,
				billingAmount: 12200,
				billingCurrency: "USD",
				status: "active",
			},
			{
				id: "4",
				icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
				name: "SEO Premium for WordPress",
				used: 3,
				limit: 20,
				hasNextPayment: false,
				nextPayment: new Date(),
				endDate: new Date(),
				hasEndDate: false,
				billingAmount: 12512,
				billingCurrency: "USD",
				status: "active",
			},
		] } onManage={ () => { } }
		/>

	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

