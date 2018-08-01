import React from 'react';
import { mapStateToProps } from "../../src/containers/SubscriptionPage";

let state = {
	entities: {
		subscriptions: {
			byId: {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					name: "Yoast SEO",
					used: 1,
					limit: 2,
					orders: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
					nextPayment: "2017-05-01 21:04:28",
					endDate: null,
					price: "6900",
					currency: "USD",
					product: {
						icon: "icon.jpg",
					},
					status: "active",
				},
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		orders: {
			byId: {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					invoiceNumber: "YST201701",
					status: "completed",
					date: "2017-05-01 21:04:28",
					totalAmount: "6900",
					currency: "USD",
					items: [
						{
							productName: "Yoast SEO",
						}
					],
				},
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		sites: {
			byId: {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					subscriptions: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				},
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		}
	},
	router: {
		location: "subscriptions/thisIsAnId",
	},
	ui: {
		sites: {
			retrievingSites: false,
		},
		subscriptionsCancel: {
			modalOpen: false,
			loading: true,
			success: false,
			error: false,

		}
	},
};

let ownProps = {
	match: {
		params: {
			id: "497490e6-eb8d-4627-be9b-bfd33fc217f1"
		}
	}
};

let defaultExpected = {
	cancelError: false,
	cancelLoading: true,
	cancelModalOpen: false,
	cancelSuccess: false,
	orders: [ {
		currency: "USD",
		date: new Date( "2017-05-01 21:04:28" ),
		id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		items: [ { productName: "Yoast SEO" } ],
		orderNumber: "YST201701",
		status: "completed",
		total: "6900"
	} ],
	sites: [ {
		subscriptions: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ]
	} ],
	subscription: {
		currency: "USD",
		endDate: null,
		id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		limit: 2,
		name: "Yoast SEO",
		nextPayment: "2017-05-01 21:04:28",
		orders: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		price: "6900",
		product: {
			icon: "icon.jpg"
		},
		status: "active",
		used: 1
	}
};

test( 'the mapStateToProps function', () => {
	expect( mapStateToProps( state, ownProps ) ).toEqual( defaultExpected );
} );

test( 'the mapStateToProps function, with `retrievingSites` set to `true`', () => {
	let newState = {};
	Object.assign( newState, { ...state } );
	newState.ui.sites.retrievingSites = true;

	let expected = {
		isLoading: true,
	};
	
	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );
} );
