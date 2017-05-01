import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Subscriptions from '../../src/components/Subscriptions';
import { MemoryRouter } from "react-router-dom";

test('The Subscriptions component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<Subscriptions subscriptions={ [
				{
					id: "3",
					icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
					name: "SEO Premium for WordPress",
					used: 4,
					limit: 20,
					nextPayment: new Date("October 13, 2014"),
					billingAmount: 12200,
					billingCurrency: "USD",
				},
				{
					id: "4",
					icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
					name: "SEO Premium for WordPress",
					used: 3,
					limit: 20,
					nextPayment: new Date("October 13, 2014"),
					billingAmount: 12512,
					billingCurrency: "USD",
				},
			] } onManage={ () => { } } />
		</MemoryRouter>
			);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
