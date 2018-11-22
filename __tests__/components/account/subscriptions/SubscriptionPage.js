import React from 'react';
import { Provider } from "react-redux";
import SubscriptionPage from "../../../../src/components/account/subscriptions/SubscriptionPage";
import configureStore from "redux-mock-store";
import { mapStateToProps } from "../../../../src/containers/SubscriptionPage";
import { createComponentWithIntl } from "../../../../utils";

const mockStore = configureStore( [] );


let subscription = {
	id: "1",
	name: "test subscription",
	limit: 2,
	startDate: "2018-08-02T10:43:18.000Z",
	endDate: null,
	nextPayment: "2019-08-02T10:43:18.000Z",
	product: {
		icon: "test.jpg",
	},
	status: 'active',
	orders: [
		"11",
	]
};

let storeState = {
	entities: {
		subscriptions: {
			byId: {
				"1": subscription,
			},
			allIds: [ "1" ],
		},
		orders: {
			byId: {
				"11": {
					currency: "USD",
					date: new Date( "2017-05-01 21:04:28" ),
					items: [ { productName: "Yoast SEO" } ],
					orderNumber: "YST201701",
					status: "Completed",
					total: "6900"
				}
			},
			allIds: [ "11" ],
		},
		refunds: {
			byId: {},
			allIds: [],
		},
		sites: {
			byId: {},
			allIds: [],
		}
	},
	ui: {
		invoiceModal: {
			invoicesModalIsOpen: false,
			invoicesModalOrderId: "",
			error: null,
		},
		subscriptionsCancel: {
			modalOpen: false,
			loading: false,
			success: false,
			error: null,
		},
		subscriptions: {
			error: "",
			requesting: false,
		},
		sites: {
			retrievingSites: false,
			retrievingSitesError: null
		}
	},
	amountToCancel: 1,
};

let ownProps = {
	match: {
		params: {
			id: "1"
		}
	}
};

test( 'the SubscriptionPage component matches the snapshot', () => {
	mapStateToProps( storeState, ownProps );
	const component = createComponentWithIntl(
		<Provider store={ mockStore( storeState ) }>
			<SubscriptionPage
				subscription={ subscription }
				cancelSubscription={ () => {} }
				openCancelModal={ () => {} }
				closeCancelModal={ () => {} }
				loadData={ () => {} }
			/>
		</Provider>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'the SubscriptionPage component matches the snapshot with a subscription that can be cancelled', () => {
	let autoRenewSubscription = Object.assign( {}, subscription, { requiresManualRenewal: false } );
	mapStateToProps( storeState, ownProps );

	const component = createComponentWithIntl(
		<Provider props={ ownProps } store={ mockStore( storeState ) }>
			<SubscriptionPage
				subscription={ autoRenewSubscription }
				cancelSubscription={ () => {} }
				openCancelModal={ () => {} }
				closeCancelModal={ () => {} }
				loadData={ () => {} }
			/>
		</Provider>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
