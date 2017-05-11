import React from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../src/containers/DownloadsPage'
import {onSearchQueryChange} from "../../src/actions/search";

let state = {
	entities: {
		subscriptions: {
			byId: {
				"1": {
					"id": "1",
					"productId": "1",
					"name": "Yoast SEO",
					"status": "active",
				}
			},
			allIds: [ "1" ],
		},
		products: {
			byId: {
				"1": {
					"id": "1",
					"productId": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"type": "plugin",
					"description": "for Wordpress",
					"storeUrl": "http://yoast.com",
				},
				"2": {
					"id": "2",
					"productId": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"type": "plugin",
					"description": "for Wordpress",
					"storeUrl": "http://yoast.com",
				},
				"3": {
					"id": "3",
					"productId": "3",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"type": "eBook",
					"description": "for Wordpress",
					"storeUrl": "http://yoast.com",
				}
			},
			allIds: [ "1", "2", "3" ],
		},
		orders: {
			byId: {
				"1": {
					"id": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"type": "eBook",
					"items": {"productId": "3"},
					"status": "completed",
				}
			},
			allIds: [ "3" ],
		},
	},
	ui: {
		search: {
			query: "d",
		},
	},
};

test( "the mapStateToProps function", () => {
	let expected = {
		eBooks: [ {
			buttons: [ { label: "for Wordpress", onButtonClick: () => window.open("http://yoast.com", "_blank") } ],
			category: "eBook",
			currentVersion: 4.7,
			icon: "icon.jpg",
			id: "3",
			name: "download1",
		}],
		plugins: [ {
			buttons: [ { label: "for Wordpress", onButtonClick: () => window.open("http://yoast.com", "_blank") } ],
			category: "plugin",
			currentVersion: 4.7,
			icon: "icon.jpg",
			id: "1",
			name: "download1",
		} ],
		query: "d",
	};

	let actual = mapStateToProps( state );
	expected.plugins[ 0 ].buttons[ 0 ].onButtonClick = actual.plugins[ 0 ].buttons[ 0 ].onButtonClick;
	expected.eBooks[ 0 ].buttons[ 0 ].onButtonClick = actual.eBooks[ 0 ].buttons[ 0 ].onButtonClick;

	expect( actual ).toEqual ( expected );
} );

test( "the mapDispatchToProps function to call onSearchChange action with onQueryChange", () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps(dispatch);

	props.onSearchChange();

	expect( dispatch ).toHaveBeenCalledWith( onSearchQueryChange() );
} );
