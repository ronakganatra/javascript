import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SitesPage'
import { linkSiteModalClose, linkSiteModalOpen, updateSiteUrl } from "../../src/actions/sites";
import { push } from "react-router-redux";

let state = {
	entities: {
		sites: {
			byId: { "497490e6-eb8d-4627-be9b-bfd33fc217f1": {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"hostname": "yoast.com",
				"path": "/",
				"url": "https://yoast.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1,
				"subscriptions": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"configurationServiceRequest": {},
			} },
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		subscriptions: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"status": "active",
					product: {
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					},
				},
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		products: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"icon": "test.png",
					"name": "Yoast SEO",
					"type": "plugin",
					"glNumber": 111,
					productGroups: {
						id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					},
				},
			},
			allIds: [
				"497490e6-eb8d-4627-be9b-bfd33fc217f1",
			]
		},
		productGroups: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"icon": "test.png",
					"name": "Yoast SEO",
					"type": "plugin",
					"glNumber": 111,
				},
			},
			allIds: [
				"497490e6-eb8d-4627-be9b-bfd33fc217f1",
			]
		},
		configurationServiceRequests: {
			allIds: [],
			byId: {},
		}
	},
	router: {
		location: "sites/thisIsAnId",
	},
	ui: {
		search: {
			query: "",
		},
		sites: {
			addSiteModalOpen: false,
			linkingSite: false,
			linkingSiteUrl: "http://yoast.com",
			linkSiteFailed: false,
			linkSiteError: "",
		},
		configurationServiceRequests: {
			configurationServiceRequestModalOpen: false,
			configurationServiceRequestModalSiteId: "",
		},
		productGroups: {
			requesting: false,
		},
		products: {
			requesting: false,
		},
	},
};

test('the mapStateToProps function', () => {
	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
				productId: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				products: [ {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				} ],
				status: "active",
			} ],
			"configurationServiceRequest": {},
			} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"configurationServiceRequest": {},
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query contains url of site', () => {
	state.ui.search.query = "https://yoast.com";

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"configurationServiceRequest": {},
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"configurationServiceRequest": {},
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "https://yoast.com",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query just contains the hostname of site', () => {
	state.ui.search.query = "yoast.com";

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"configurationServiceRequest": {},
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"configurationServiceRequest": {},
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "yoast.com",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query does not match any site.', () => {
	state.ui.search.query = "yolo.test";

	let expected = {
		sites: [],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [
				{
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					product: {
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							glNumber: 111,
							icon: "test.png",
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							name: "Yoast SEO",
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
							type: "plugin",
						}
					},
					productId: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					products: [
						{
							"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
								glNumber: 111,
								icon: "test.png",
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
								name: "Yoast SEO",
								productGroups: {
									id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
								},
								type: "plugin",
							}
						},
					],
					status: "active",
				},
			],
			"configurationServiceRequest": {},
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "yolo.test",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when no subscriptions have been retrieved yet.', () => {
	state.entities.subscriptions.byId = {};
	state.entities.subscriptions.allIds = {};
	state.ui.search.query = "";

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [],
			"configurationServiceRequest": {},
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [],
			"configurationServiceRequest": {},
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

	state.entities.subscriptions = {
		"byId": {
			"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			},
		},
		allIds: [
			"497490e6-eb8d-4627-be9b-bfd33fc217f1",
		]
	};
} );

test('the mapDispatchToProps function to call linkSiteModalOpen action with onClick', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClick();

	expect( dispatch ).toHaveBeenCalledWith( linkSiteModalOpen() );
} );

test('the mapDispatchToProps function to call linkSiteModalOpen action with addSite', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.addSite();

	expect( dispatch ).toHaveBeenCalledWith( linkSiteModalOpen() );
} );

test('the mapDispatchToProps function to call linkSiteModalClose action with onClose', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClose();

	expect( dispatch ).toHaveBeenCalledWith( linkSiteModalClose() );
} );

test('the mapDispatchToProps function to call updateSiteUrl action with onChange', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );
	let url = "http://yoast.com";

	props.onChange( url );

	expect( dispatch ).toHaveBeenCalledWith( updateSiteUrl( url ) );
} );

test('the mapDispatchToProps function to call push action with onManage', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );
	let siteId = "thisIsAnId";
	props.onManage( siteId );

	expect( dispatch ).toHaveBeenCalledWith( push( "/sites/" + siteId ) );
} );

test('the mapStateToProps function when there is an additional path in the url', () => {
	state.entities.sites.byId = { "497490e6-eb8d-4627-be9b-bfd33fc217f1": {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"hostname": "yoast.com",
		"path": "/extrapath",
		"url": "https://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1,
		"subscriptions": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
	} };
	state.ui.search.query = "";

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com/extrapath",
			"siteType": undefined,
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
				productGroups: {
					id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				},
			}
		],
		availableConfigurationServiceRequests: [],
		availableSites: [ {
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
				products:[
					{
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"icon": "test.png",
							"name": "Yoast SEO",
							"type": "plugin",
							"glNumber": 111,
							productGroups: {
								id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							},
						},
					}
				],
				product: {
					"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
						"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						"icon": "test.png",
						"name": "Yoast SEO",
						"type": "plugin",
						"glNumber": 111,
						productGroups: {
							id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
						},
					},
				},
			} ],
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com/extrapath",
			"siteType": undefined,
			"url":"https://yoast.com",
		} ],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
		configurationServiceRequestModalOpen: false,
		configurationServiceRequestModalSiteId: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );
