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
			productGroups: {
				byId: {
					"1": {
						"courseId": "",
						"description": "News SEO for Wordpress Plugin description",
						"icon": "",
						"id": "09960039-a361-4ea1-9c5e-f4bbbd846622",
						"name": "News SEO for Wordpress Plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wpseo-news-5.6.zip",
										"id": "695d8b62f91af09ddaee463700a514b8",
										"name": "zip",
									}
								],
								"glNumber": "82104",
								"icon": "https://yoast.com/app/uploads/edd/2017/01/News_Icon.png",
								"id": "bdd9cbe7-ceb1-40a8-89aa-abe2c6b79040",
								"isDownloadOnly": false,
								"name": "News SEO for WordPress plugin",
								"price": 6900,
								"shopProductType": "subscription",
								"shopRegularPrice": 6900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883406,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/news-seo-wordpress-plugin/",
								"type": "plugin",
							},
						],
						"slug": "news-seo-wp",
						"svgIcon": "",
						"version": "",
					},
					"2": {
						"courseId": "",
						"description": "Yoast SEO for WordPress Premium plugin description",
						"icon": "",
						"id": "16277487-f4f1-4823-aec2-1848d1db7e6d",
						"name": "Yoast SEO for WordPress Premium plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6.1",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wordpress-seo-premium-5.6.1.zip",
										"id": "272bb58217aca36a2cac89617777bad0",
										"name": "zip",
									}
								],
								"glNumber": "82101",
								"icon": "https://yoast.com/app/uploads/2015/06/Yoast_SEO_Icon_500x500.png",
								"id": "62de464b-ee36-4df0-a202-c65dccc03f62",
								"isDownloadOnly": false,
								"name": "Yoast SEO for WordPress Premium plugin",
								"price": 8900,
								"shopProductType": "subscription",
								"shopRegularPrice": 8900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883420,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/yoast-seo-wordpress-premium-plugin/",
								"type": "plugin",
							},
						],
						"slug": "yoast-seo-premium",
						"svgIcon": "",
						"version": "",
					},
					"3": {
						"courseId": "",
						"description": "Video SEO for WordPress Plugin description",
						"icon": "",
						"id": "a8e1c61b-86c7-4943-aabb-5bcde1868f17",
						"name": "Video SEO for WordPress Plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wpseo-video-5.6.zip",
										"id": "c08349ad3d08b94f57bad0eb73fafa6f",
										"name": "zip",
									}
								],
								"glNumber": "82102",
								"icon": "https://yoast.com/app/uploads/2012/10/Video_SEO_Icon_500x500.png",
								"id": "16828564-5eba-4ab6-9768-387b93469008",
								"isDownloadOnly": false,
								"name": "Video SEO for WordPress Plugin",
								"price": 6900,
								"shopProductType": "subscription",
								"shopRegularPrice": 6900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883404,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/video-seo-wordpress-plugin/",
								"type": "plugin",
							},
						],
						"slug": "video-seo-wp",
						"svgIcon": "",
						"version": "",
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
			productGroups: {
				byId: {
					"1": {
						"courseId": "",
						"description": "News SEO for Wordpress Plugin description",
						"icon": "",
						"id": "09960039-a361-4ea1-9c5e-f4bbbd846622",
						"name": "News SEO for Wordpress Plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wpseo-news-5.6.zip",
										"id": "695d8b62f91af09ddaee463700a514b8",
										"name": "zip",
									}
								],
								"glNumber": "82104",
								"icon": "https://yoast.com/app/uploads/edd/2017/01/News_Icon.png",
								"id": "bdd9cbe7-ceb1-40a8-89aa-abe2c6b79040",
								"isDownloadOnly": false,
								"name": "News SEO for WordPress plugin",
								"price": 6900,
								"shopProductType": "subscription",
								"shopRegularPrice": 6900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883406,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/news-seo-wordpress-plugin/",
								"type": "plugin",
							},
						],
						"slug": "news-seo-wp",
						"svgIcon": "",
						"version": "",
					},
					"2": {
						"courseId": "",
						"description": "Yoast SEO for WordPress Premium plugin description",
						"icon": "",
						"id": "16277487-f4f1-4823-aec2-1848d1db7e6d",
						"name": "Yoast SEO for WordPress Premium plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6.1",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wordpress-seo-premium-5.6.1.zip",
										"id": "272bb58217aca36a2cac89617777bad0",
										"name": "zip",
									}
								],
								"glNumber": "82101",
								"icon": "https://yoast.com/app/uploads/2015/06/Yoast_SEO_Icon_500x500.png",
								"id": "62de464b-ee36-4df0-a202-c65dccc03f62",
								"isDownloadOnly": false,
								"name": "Yoast SEO for WordPress Premium plugin",
								"price": 8900,
								"shopProductType": "subscription",
								"shopRegularPrice": 8900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883420,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/yoast-seo-wordpress-premium-plugin/",
								"type": "plugin",
							},
						],
						"slug": "yoast-seo-premium",
						"svgIcon": "",
						"version": "",
					},
					"3": {
						"courseId": "",
						"description": "Video SEO for WordPress Plugin description",
						"icon": "",
						"id": "a8e1c61b-86c7-4943-aabb-5bcde1868f17",
						"name": "Video SEO for WordPress Plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wpseo-video-5.6.zip",
										"id": "c08349ad3d08b94f57bad0eb73fafa6f",
										"name": "zip",
									}
								],
								"glNumber": "82102",
								"icon": "https://yoast.com/app/uploads/2012/10/Video_SEO_Icon_500x500.png",
								"id": "16828564-5eba-4ab6-9768-387b93469008",
								"isDownloadOnly": false,
								"name": "Video SEO for WordPress Plugin",
								"price": 6900,
								"shopProductType": "subscription",
								"shopRegularPrice": 6900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883404,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/video-seo-wordpress-plugin/",
								"type": "plugin",
							},
						],
						"slug": "video-seo-wp",
						"svgIcon": "",
						"version": "",
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
			productGroups: {
				byId: {
					"1": {
						"courseId": "",
						"description": "News SEO for Wordpress Plugin description",
						"icon": "",
						"id": "09960039-a361-4ea1-9c5e-f4bbbd846622",
						"name": "News SEO for Wordpress Plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wpseo-news-5.6.zip",
										"id": "695d8b62f91af09ddaee463700a514b8",
										"name": "zip",
									}
								],
								"glNumber": "82104",
								"icon": "https://yoast.com/app/uploads/edd/2017/01/News_Icon.png",
								"id": "bdd9cbe7-ceb1-40a8-89aa-abe2c6b79040",
								"isDownloadOnly": false,
								"name": "News SEO for WordPress plugin",
								"price": 6900,
								"shopProductType": "subscription",
								"shopRegularPrice": 6900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883406,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/news-seo-wordpress-plugin/",
								"type": "plugin",
							},
						],
						"slug": "news-seo-wp",
						"svgIcon": "",
						"version": "",
					},
					"2": {
						"courseId": "",
						"description": "Yoast SEO for WordPress Premium plugin description",
						"icon": "",
						"id": "16277487-f4f1-4823-aec2-1848d1db7e6d",
						"name": "Yoast SEO for WordPress Premium plugin",
						"parentId": null,
						"products": [
							{
								"changelog": "",
								"courseId": null,
								"currency": null,
								"currentVersion": "5.6.1",
								"downloads": [
									{
										"file": "https://yoast.com/app/uploads/2017/10/wordpress-seo-premium-5.6.1.zip",
										"id": "272bb58217aca36a2cac89617777bad0",
										"name": "zip",
									}
								],
								"glNumber": "82101",
								"icon": "https://yoast.com/app/uploads/2015/06/Yoast_SEO_Icon_500x500.png",
								"id": "62de464b-ee36-4df0-a202-c65dccc03f62",
								"isDownloadOnly": false,
								"name": "Yoast SEO for WordPress Premium plugin",
								"price": 8900,
								"shopProductType": "subscription",
								"shopRegularPrice": 8900,
								"shopStatus": "publish",
								"shopTaxClass": "",
								"shopTaxStatus": "taxable",
								"sourceId": 883420,
								"sourceShopId": 1,
								"storeUrl": "http://yoast.test/product/yoast-seo-wordpress-premium-plugin/",
								"type": "plugin",
							},
						],
						"slug": "yoast-seo-premium",
						"svgIcon": "",
						"version": "",
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