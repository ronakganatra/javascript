import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/OrdersPage'
import { onSearchQueryChange } from "../../src/actions/search";

let state = {
	entities: {
		orders: {
			byId: {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"invoiceNumber": "YST201701",
					"status": "completed",
					"date": "2017-05-01 21:04:28",
					"totalAmount": "6900",
					"currency": "USD",
					"items": [
						{
							productName: "Yoast SEO",
						}
					],
				},
				"497490e6-eb8d-4627-be9b-bfd33fc217f2": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
					"invoiceNumber": "YST201702",
					"status": "pending",
					"date": "2017-05-02 21:04:28",
					"totalAmount": "6900",
					"currency": "USD",
					"items": [
						{
							productName: "Yoast SEO",
						}
					],
				},
				"497490e6-eb8d-4627-be9b-bfd33fc217f3": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f3",
					"invoiceNumber": "YST201703",
					"status": "completed",
					"date": "2017-06-01 21:04:28",
					"totalAmount": "6900",
					"currency": "USD",
					"items": [
						{
							productName: "Yoast SEO",
						}
					],
				},
			},
			allIds: [
				"497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"497490e6-eb8d-4627-be9b-bfd33fc217f2",
				"497490e6-eb8d-4627-be9b-bfd33fc217f3",
			],
		},
		refunds: {
			byId: {},
			allIds: [],
		},
	},
	router: {
		location: "orders/thisIsAnId",
	},
	ui: {
		search: {
			query: "",
		},
	},
};

let defaultExpected = {
	orders: [
		{
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f3",
			"orderNumber": "YST201703",
			"status": "Completed",
			"date": new Date( "2017-06-01 21:04:28" ),
			"total": "6900",
			"currency": "USD",
			"items": [
				{
					productName: "Yoast SEO",
				}
			],
		},
		{
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"orderNumber": "YST201701",
			"status": "Completed",
			"date": new Date( "2017-05-01 21:04:28" ),
			"total": "6900",
			"currency": "USD",
			"items": [
				{
					productName: "Yoast SEO",
				}
			],
		},
	],
	query: "",
};

test('the mapStateToProps function', () => {
	expect( mapStateToProps( state ) ).toEqual( defaultExpected );
} );

test('the mapStateToProps function when query contains part of an item product name', () => {
	state = Object.assign( {}, state );
	state.ui.search.query = "Yoast";
	let expected = Object.assign( {}, defaultExpected, { query: "Yoast" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapStateToProps function when query contains part of orderNumber', () => {
	state = Object.assign( {}, state );
	state.ui.search.query = "YST";
	let expected = Object.assign( {}, defaultExpected, { query: "YST" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapStateToProps function when query contains part of formatted order date', () => {
	state = Object.assign( {}, state );
	state.ui.search.query = "May 1";
	let expected = Object.assign( {}, defaultExpected, {
		orders: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"orderNumber": "YST201701",
				"status": "Completed",
				"date": new Date( "2017-05-01 21:04:28" ),
				"total": "6900",
				"currency": "USD",
				"items": [
					{
						productName: "Yoast SEO",
					}
				],
			},
		],
		query: "May 1"
	} );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapStateToProps function when query contains part of formatted total', () => {
	state = Object.assign( {}, state );
	state.ui.search.query = "69";
	let expected = Object.assign( {}, defaultExpected, { query: "69" } );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapStateToProps function when query contains nonsense', () => {
	state = Object.assign( {}, state );
	state.ui.search.query = "afhsdkgfj";
	let expected = Object.assign( {}, defaultExpected, {
		orders: [],
		query: "afhsdkgfj"
	} );

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapDispatchToProps function to call onSearchQueryChange', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onSearchChange( "query string" );

	expect( dispatch ).toHaveBeenCalledWith( onSearchQueryChange( "query string" ) );
} );
