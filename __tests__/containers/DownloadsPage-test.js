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
						"glNumber": "111",
					},
					"2": {
						"id": "2",
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
						"glNumber": "222",
					},
					"3": {
						"id": "3",
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
						"glNumber": "333",
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
			composerTokens: {
				byId: {},
				allIds: []
			},
		},
		ui: {
			search: {
				query: "d",
			},
			composerTokens: {
				composerHelpModalIsOpen: false,
				composerHelpProductName: "",
				composerHelpProductGlNumber: "0",
			},
		},
	};

	let expected = {
		eBooks: [ {
			buttons: [ { label: "pdf", onButtonClick: () => window.open("http://example.org/ebook.pdf", "_blank") } ],
			category: "ebook",
			currentVersion: 4.7,
			icon: "icon.jpg",
			ids: [ "3" ],
			name: "download1",
			glNumber: "333",
		}],
		plugins: [ {
			buttons: [ { label: "zip", onButtonClick: () => window.open("http://example.org/plugin.zip", "_blank") } ],
			category: "plugin",
			currentVersion: 4.7,
			icon: "icon.jpg",
			ids: [ "1" ],
			name: "download1",
			glNumber: "111",
		} ],
		query: "d",
		composerToken: null,
		composerHelpModalIsOpen: false,
		composerHelpProductGlNumber: "0",
		composerHelpProductName: "",
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
						glNumber: "111",
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
						glNumber: "222",
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
						glNumber: "333",
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
			composerTokens: {
				byId: {},
				allIds: []
			},
		},
		ui: {
			search: {
				query: "q",
			},
			composerTokens: {
				composerHelpModalIsOpen: false,
				composerHelpProductGlNumber: "0",
				composerHelpProductName: "",
			},
		},
	};

	let expected = {
		eBooks: [],
		plugins: [],
		query: "q",
		composerToken: null,
		composerHelpModalIsOpen: false,
		composerHelpProductName: "",
		composerHelpProductGlNumber: "0",
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

test( "the mapStateToProps function with a pending-cancel subscription", () => {
	let state = {
		entities: {
			subscriptions: {
				byId: {
					"1": {
						"id": "1",
						"productId": "1",
						"name": "Yoast SEO",
						"status": "pending-cancel",
					}
				},
				allIds: [ "1" ],
			},
			products: {
				byId: {
					"1": {
						"id": "1",
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
						"glNumber": "111",
					},
					"2": {
						"id": "2",
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
						"glNumber": "222",
					},
					"3": {
						"id": "3",
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
						"glNumber": "333",
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
			composerTokens: {
				byId: {},
				allIds: []
			},
		},
		ui: {
			search: {
				query: "d",
			},
			composerTokens: {
				composerHelpModalIsOpen: false,
				composerHelpProductName: "",
				composerHelpProductGlNumber: "0",
			},
		},
	};

	let expected = {
		eBooks: [ {
			buttons: [ { label: "pdf", onButtonClick: () => window.open("http://example.org/ebook.pdf", "_blank") } ],
			category: "ebook",
			currentVersion: 4.7,
			icon: "icon.jpg",
			ids: [ "3" ],
			name: "download1",
			glNumber: "333",
		}],
		plugins: [ {
			buttons: [ { label: "zip", onButtonClick: () => window.open("http://example.org/plugin.zip", "_blank") } ],
			category: "plugin",
			currentVersion: 4.7,
			icon: "icon.jpg",
			ids: [ "1" ],
			name: "download1",
			glNumber: "111",
		} ],
		query: "d",
		composerToken: null,
		composerHelpModalIsOpen: false,
		composerHelpProductGlNumber: "0",
		composerHelpProductName: "",
	};

	let actual = mapStateToProps( state );

	expected.plugins[ 0 ].buttons[ 0 ].onButtonClick = actual.plugins[ 0 ].buttons[ 0 ].onButtonClick;
	expected.eBooks[ 0 ].buttons[ 0 ].onButtonClick = actual.eBooks[ 0 ].buttons[ 0 ].onButtonClick;

	expect( actual ).toEqual ( expected );
} );