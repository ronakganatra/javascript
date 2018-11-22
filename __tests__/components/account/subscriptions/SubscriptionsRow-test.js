import React from 'react';
import { createComponentWithIntl } from "../../../../utils";
import SubscriptionRow from "../../../../src/components/account/subscriptions/SubscriptionRow";


let subscriptionsArray = [
	{
		id: "1",
		icon: "icon.png",
		name: "name",
		used: 0,
		limit: 2,
		subscriptionNumber: "subscriptionNumber",
		requiresManualRenewal: false,
		hasNextPayment: true,
		nextPayment: new Date( "1-1-2028" ),
		hasEndDate: false,
		endDate: null,
		billingAmount: "1",
		billingCurrency: "USD",
		status: "active",
		hasSites: true,
		product: {
			glNumber: 1,
			productGroups: {
				parentId: 1,
			}
		},
	},
	{
		id: "1",
		icon: "icon.png",
		name: "name",
		used: 1,
		limit: 2,
		subscriptionNumber: "subscriptionNumber2",
		requiresManualRenewal: false,
		hasNextPayment: true,
		nextPayment: new Date( "1-1-2028" ),
		hasEndDate: false,
		endDate: null,
		billingAmount: "1",
		billingCurrency: "USD",
		status: "active",
		hasSites: true,
		product: {
			glNumber: 1,
			productGroups: {
				parentId: 1,
			}
		},
	},
];

test( 'the SubscriptionRow for multiple subscriptions matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionRow
			subscriptionsArray={ subscriptionsArray }
			onManage={ () => {} }
			isGrouped={ true }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the SubscriptionRow for a single subscriptions matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionRow
			subscriptionsArray={ [ subscriptionsArray[ 0 ] ] }
			onManage={ () => {} }
			isGrouped={ true }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
