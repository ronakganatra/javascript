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
			} },
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		subscriptions: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"status": "active",
				},
			},
			allIds: [
				"497490e6-eb8d-4627-be9b-bfd33fc217f1",
			]
		},
		products: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"icon": "test.png",
					"name": "Yoast SEO",
					"type": "plugin",
					"glNumber": 111,
				},
			}
		},
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
	},
};

test('the mapStateToProps function', () => {
	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
			} ],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query contains url of site', () => {
	state.ui.search.query = "https://yoast.com"

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
			} ],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "https://yoast.com",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query just contains the hostname of site', () => {
	state.ui.search.query = "yoast.com"

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
			} ],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "yoast.com",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );

test('the mapStateToProps function when query does not match any site.', () => {
	state.ui.search.query = "yolo.test"

	let expected = {
		sites: [],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "yolo.test",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

	state.ui.search.query = ""
} );

test('the mapStateToProps function when no subscriptions have been retrieved yet.', () => {
	state.entities.subscriptions.byId = {};
	state.entities.subscriptions.allIds = {};

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com",
			"url": "https://yoast.com",
			"activeSubscriptions": [],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

	state.entities.subscriptions = {
		"byId": {
			"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
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
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"status": "active",
			} ],
		} ],
		plugins: [
			{
				"glNumber": 111,
				"ids": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		modalOpen: false,
		showLoader: true,
		errorFound: false,
		error: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );
