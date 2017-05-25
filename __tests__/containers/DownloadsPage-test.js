import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/DownloadsPage'
import { onSearchQueryChange } from "../../src/actions/search";

test( "the mapStateToProps function", () => {
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
						"downloads": [
							{
								"name": "zip",
								"file": "http://example.org/plugin.zip"
							},
						],
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
						"downloads": [
							{
								"name": "zip",
								"file": "http://example.org/plugin.zip"
							},
						],
					},
					"3": {
						"id": "3",
						"productId": "3",
						"name": "download1",
						"currentVersion": 4.7,
						"icon": "icon.jpg",
						"type": "ebook",
						"description": "for Wordpress",
						"storeUrl": "http://yoast.com",
						"downloads": [
							{
								"name": "pdf",
								"file": "http://example.org/ebook.pdf"
							},
						],
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
						"type": "ebook",
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

	let expected = {
		eBooks: [ {
			buttons: [ { label: "pdf", onButtonClick: () => window.open("http://example.org/ebook.pdf", "_blank") } ],
			category: "ebook",
			currentVersion: 4.7,
			icon: "icon.jpg",
			id: "3",
			name: "download1",
		}],
		plugins: [ {
			buttons: [ { label: "zip", onButtonClick: () => window.open("http://example.org/plugin.zip", "_blank") } ],
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

test( "the mapStateToProps function without search results", () => {
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
						"downloads": [
							{
								"name": "zip",
								"file": "http://example.org/plugin.zip"
							},
						],
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
						"downloads": [
							{
								"name": "zip",
								"file": "http://example.org/plugin.zip"
							},
						],
					},
					"3": {
						"id": "3",
						"productId": "3",
						"name": "download1",
						"currentVersion": 4.7,
						"icon": "icon.jpg",
						"type": "ebook",
						"description": "for Wordpress",
						"storeUrl": "http://yoast.com",
						"downloads": [
							{
								"name": "pdf",
								"file": "http://example.org/ebook.pdf"
							},
						],
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
						"type": "ebook",
						"items": {"productId": "3"},
						"status": "completed",
					}
				},
				allIds: [ "3" ],
			},
		},
		ui: {
			search: {
				query: "q",
			},
		},
	};

	let expected = {
		eBooks: [],
		plugins: [],
		query: "q",
	};

	let actual = mapStateToProps( state );
	expect( actual ).toEqual ( expected );
} );

test( "the mapDispatchToProps function to call onSearchChange action with onQueryChange", () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps(dispatch);

	props.onSearchChange();

	expect( dispatch ).toHaveBeenCalledWith( onSearchQueryChange() );
} );
