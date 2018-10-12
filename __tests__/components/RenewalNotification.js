import React from 'react';
import { createComponentWithIntl } from "../../utils";

import RenewalNotification from '../../src/components/RenewalNotification';

test('The RenewalNotification component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<RenewalNotification
			upcomingRenewals={ [
				{
					id: "4",
					icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
					name: "SEO Premium for WordPress",
					used: 3,
					limit: 20,
					hasNextPayment: true,
					nextPayment: "12-01-2019",
					endDate: null,
					hasEndDate: false,
					billingAmount: 12512,
					billingCurrency: "USD",
					status: "active",
					renewalUrl: "https://my.yoast.test"
				},
			] }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

