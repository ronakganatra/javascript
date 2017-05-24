import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SitesPage'
import { linkSitePopupClose, linkSitePopupOpen, updateSiteUrl } from "../../src/actions/sites";
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
				},
			},
		},
		products: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"icon": "test.png",
					"name": "Yoast SEO",
					"type": "plugin",
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
			addSitePopupOpen: false,
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
			} ],
		} ],
		plugins: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		popupOpen: false,
		showLoader: true,
		errorFound: false,
		errorMessage: "",
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
			} ],
		} ],
		plugins: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		popupOpen: false,
		showLoader: true,
		errorFound: false,
		errorMessage: "",
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
			} ],
		} ],
		plugins: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		popupOpen: false,
		showLoader: true,
		errorFound: false,
		errorMessage: "",
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
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		popupOpen: false,
		showLoader: true,
		errorFound: false,
		errorMessage: "",
		linkingSiteUrl: "http://yoast.com",
		query: "yolo.test",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

	state.ui.search.query = ""
} );

test('the mapDispatchToProps function to call linkSitePopupOpen action with onClick', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClick();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupOpen() );
} );

test('the mapDispatchToProps function to call linkSitePopupOpen action with addSite', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.addSite();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupOpen() );
} );

test('the mapDispatchToProps function to call linkSitePopupClose action with onClose', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onClose();

	expect( dispatch ).toHaveBeenCalledWith( linkSitePopupClose() );
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

	console.log( state.entities.sites.byId )

	let expected = {
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"siteName": "yoast.com/extrapath",
			"url": "https://yoast.com",
			"activeSubscriptions": [ {
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			} ],
		} ],
		plugins: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"icon": "test.png",
				"name": "Yoast SEO",
				"type": "plugin",
			}
		],
		popupOpen: false,
		showLoader: true,
		errorFound: false,
		errorMessage: "",
		linkingSiteUrl: "http://yoast.com",
		query: "",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );

} );