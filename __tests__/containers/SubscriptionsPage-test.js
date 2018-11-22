import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SubscriptionsPage'
import { onSearchQueryChange } from "../../src/actions/search";
import { push } from "react-router-redux";

let state = {
	entities: {
		subscriptions: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"name": "Yoast SEO 2",
					"subscriptionNumber": "Y12345",
					"used": 1,
					"limit": 2,
					"nextPayment": "2017-05-01 21:04:28",
					"orders": [ "12345" ],
					"endDate": null,
					"price": "6900",
					"currency": "USD",
					"product": {
						"icon": "icon.jpg",
						glNumber: 1,
						"productGroups": [ {
							"parentId": null,
						}, ]
					},
					"status": "active",
					"requiresManualRenewal": true,
					"productId": 2,
				},
				"2": {
					"id": "2",
					"name": "Yoast SEO",
					"subscriptionNumber": "Y12345",
					"used": 1,
					"limit": 2,
					"nextPayment": "2018-05-01 21:04:28",
					"orders": [ "12345" ],
					"endDate": null,
					"price": "6900",
					"currency": "USD",
					"product": {
						"icon": "icon.jpg",
						glNumber: 2,
						"productGroups": [ {
							"parentId": "1",
						}, ]
					},
					"status": "active",
					"requiresManualRenewal": true,
					"productId": 1,
				},
				"3": {
					"id": "3",
					"name": "Yoast SEO",
					"subscriptionNumber": "Y123456",
					"used": 1,
					"limit": 2,
					"nextPayment": "2018-05-01 21:04:28",
					"orders": [ "12345" ],
					"endDate": null,
					"price": "6900",
					"currency": "USD",
					"product": {
						"icon": "icon.jpg",
						glNumber: 2,
						"productGroups": [ {
							"parentId": "1",
						}, ]
					},
					"status": "active",
					"requiresManualRenewal": true,
					"productId": 1,
				},
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1", "2", "3" ],
		},
		orders: {
			"byId": {
				"12345": {
					"id": "12345",
					"invoiceNumber": "Y12345",
				},
			},
			allIds: [ "12345" ],
		},
	},
	router: {
		location: "subscriptions/thisIsAnId",
	},
	ui: {
		search: {
			query: "",
		},
	},
};

let defaultExpected = {
	groupedSubscriptions: {
		1: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"name": "Yoast SEO 2",
				"subscriptionNumber": "Y12345",
				"used": 1,
				"status": "active",
				"hasSites": true,
				"limit": 2,
				"hasNextPayment": true,
				"nextPayment": new Date( "2017-05-01 21:04:28" ),
				paymentDate: undefined,
				product: {
					glNumber: 1,
					icon: "icon.jpg",
					productGroups: [
						{
							parentId: null,
						},
					],
				},
				"hasEndDate": false,
				"endDate": new Date( null ),
				"billingAmount": "6900",
				"billingCurrency": "USD",
				"requiresManualRenewal": true,
				"icon": "icon.jpg",
			},
		],
	},
	individualSubscriptions: {
		2: [
			{
				"id": "2",
				"name": "Yoast SEO",
				"subscriptionNumber": "Y12345",
				"used": 1,
				"status": "active",
				"hasSites": true,
				"limit": 2,
				"hasNextPayment": true,
				"nextPayment": new Date( "2018-05-01 21:04:28" ),
				paymentDate: undefined,
				product: {
					glNumber: 2,
					icon: "icon.jpg",
					productGroups: [
						{
							parentId: "1",
						},
					],
				},
				"hasEndDate": false,
				"endDate": new Date( null ),
				"billingAmount": "6900",
				"billingCurrency": "USD",
				"requiresManualRenewal": true,
				"icon": "icon.jpg",
			},
			{
				"id": "3",
				"name": "Yoast SEO",
				"subscriptionNumber": "Y123456",
				"used": 1,
				"status": "active",
				"hasSites": true,
				"limit": 2,
				"hasNextPayment": true,
				"nextPayment": new Date( "2018-05-01 21:04:28" ),
				paymentDate: undefined,
				product: {
					glNumber: 2,
					icon: "icon.jpg",
					productGroups: [
						{
							parentId: "1",
						},
					],
				},
				"hasEndDate": false,
				"endDate": new Date( null ),
				"billingAmount": "6900",
				"billingCurrency": "USD",
				"requiresManualRenewal": true,
				"icon": "icon.jpg",
			},
		]
	},
	query: "",
};

test( 'the mapStateToProps function', () => {
	expect( mapStateToProps( state ) ).toEqual( defaultExpected );
} );

test( 'the mapStateToProps function when query contains part of name', () => {
	state.ui.search.query = "Yoast";
	let expected = Object.assign( {}, defaultExpected, { query: "Yoast" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapStateToProps function when query contains exact used amount', () => {
	state.ui.search.query = "1";
	let expected = Object.assign( {}, defaultExpected, { query: "1" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapStateToProps function when query contains exact limit amount', () => {
	state.ui.search.query = "2";
	let expected = Object.assign( {}, defaultExpected, { query: "2" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapStateToProps function when query contains part of formatted payment date', () => {
	state.ui.search.query = "May 1";
	let expected = Object.assign( {}, defaultExpected, { query: "May 1" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapStateToProps function when query contains part of formatted price', () => {
	state.ui.search.query = "69";
	let expected = Object.assign( {}, defaultExpected, {
		query: "69",
	} );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapStateToProps function when query contains nonsense', () => {
	state.ui.search.query = "afhsdkgfj";
	let expected = Object.assign( {}, defaultExpected, {
		groupedSubscriptions: {},
		individualSubscriptions: {},
		query: "afhsdkgfj"
	} );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapDispatchToProps function to call onSearchQueryChange', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onSearchChange( "query string" );

	expect( dispatch ).toHaveBeenCalledWith( onSearchQueryChange( "query string" ) );
} );

test( 'the mapDispatchToProps function to call push action with onManage', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onManage( "subscriptionId" );

	expect( dispatch ).toHaveBeenCalledWith( push( "/account/subscriptions/subscriptionId" ) );
} );
