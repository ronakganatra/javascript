import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SubscriptionPage from "../../src/components/SubscriptionPage";


let subscription = {
	name: "test subcription",
	limit: 2,
	startDate: "2018-08-02T10:43:18.000Z",
	endDate: null,
	nextPayment: "2019-08-02T10:43:18.000Z",
	product: {
		icon: "test.jpg",
	},
	status: 'active',
};

test( 'the SubscriptionPage component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionPage
			subscription={ subscription }
			cancelSubscription={ () => {} }
			openCancelModal={ () => {} }
			closeCancelModal={ () => {} }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the SubscriptionPage component matches the snapshot with a subscription that can be cancelled', () => {
	let autoRenewSubscription = Object.assign( {}, subscription, { requiresManualRenewal: false } );

	const component = createComponentWithIntl(
		<SubscriptionPage
			subscription={ autoRenewSubscription }
			cancelSubscription={ () => {} }
			openCancelModal={ () => {} }
			closeCancelModal={ () => {} }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
