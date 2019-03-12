import React from 'react';
import { createComponentWithIntl } from "../../../../utils";
import SubscriptionsPage from "../../../../src/components/account/subscriptions/SubscriptionsPage.js";


let individualSubscriptions = {
	1: [
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
		],
	2: [
		{
			id: "2",
			icon: "icon.png",
			name: "name",
			used: 2,
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
				glNumber: 2,
				productGroups: {
					parentId: 2,
				}
			},
		},
	],
};

let groupedSubscriptions = {
	1: [
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
					parentId: null,
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
				productGroups: [
					{
						parentId: null,
					},
				],
			},
		},
	],
	2: [
		{
			id: "2",
			icon: "icon.png",
			name: "name",
			used: 2,
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
				glNumber: 2,
				productGroups: [
						{
						parentId: null,
					},
				],
			},
		},
	],
};

test( 'the SubscriptionsPage for multiple subscriptions matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionsPage
			groupedSubscriptions={ groupedSubscriptions }
			individualSubscriptions={ individualSubscriptions }
			query={ "" }
			onManage={ () => {} }
			onSearchChange={ () => {} }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the SubscriptionsPage when only individual subscriptions are present matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionsPage
			groupedSubscriptions={ {} }
			individualSubscriptions={ individualSubscriptions }
			query={ "" }
			onManage={ () => {} }
			onSearchChange={ () => {} }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the SubscriptionsPage when only grouped subscriptions are present matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SubscriptionsPage
			groupedSubscriptions={ groupedSubscriptions }
			individualSubscriptions={ {} }
			query={ "" }
			onManage={ () => {} }
			onSearchChange={ () => {} }
			loadData={ () => {} }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
