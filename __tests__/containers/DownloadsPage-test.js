import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/DownloadsPage'
import { onSearchQueryChange } from "../../src/actions/search";

test( 'the mapStateToProps function', () => {
	let state = {
		entities: {
			subscriptions: {
				byId: { "1": {
					"id": "1",
					"productId": "1",
					"name": "Yoast SEO",
					"status": "active",
				} },
				allIds: [ "1" ],
			},
			products: {
				byId: [ { "1": {
					"id": "1",
					"productId": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"shopProductType": "plugin",
					"description": "for Wordpress",
					"storeUrl": "http://yoast.com",
				} }, { "2": {
					"id": "2",
					"productId": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"shopProductType": "plugin",
					"description": "for Wordpress",
					"storeUrl": "http://yoast.com",
				} } ],
				allIds: [ "1", "2" ],
			},
			orders: {
				byId: { "1": {
					"id": "1",
					"name": "download1",
					"currentVersion": 4.7,
					"icon": "icon.jpg",
					"shopProductType": "plugin",
					"items": { "productId": "2" },
					"status": "completed",
				} },
				allIds: [ "1" ],
			},
		},
		ui: {
			search: {
				query: "",
			},
		},
	};
	let expected = {
		eBooks: [],
		plugins: [ {
			buttons: [ { label: "for Wordpress", onButtonClick: () => window.open( "http://yoast.com", "_blank" ) } ],
			category: "plugin",
			currentVersion: 4.7,
			icon: "icon.jpg",
			id: "1",
			name: "download1",
		} ],
		query: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test( 'the mapDispatchToProps function to call onSearchChange action with onQueryChange', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onSearchChange();

	expect( dispatch ).toHaveBeenCalledWith( onSearchQueryChange() );
} );
