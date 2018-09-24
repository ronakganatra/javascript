import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/MobileHeaderContainer';
import { logout } from "../../src/actions/user";
import { helpBeaconModalOpen } from "../../src/actions/helpBeacon";

let defaultState = {
	entities: {
		sites: {
			byId: {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"hostname": "yoast.com",
					"path": "/",
					"url": "https://yoast.com",
					"creationDate": "2017-03-21T08:54:09.415Z",
					"userId": 1,
					"subscriptions": [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
					"configurationServiceRequest": {},
				}
			},
			allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
		},
		subscriptions: {
			"byId": {
				"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
					"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"productId": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
					"status": "active",
					"name": "Yoast SEO for WordPress Premium plugin",
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
		configurationServiceRequests: {
			allIds: [],
			byId: {},
		}
	},
	user: {
		loggingOut: false,
		logoutError: null,
	},
	router: {
		location: {
			pathname: "http://my.yoast.test:3001/sites"
		}
	}
};

// We are on a site detail page.
let stateSiteDetail = Object.assign( {}, defaultState );
stateSiteDetail.router = {
	location: {
		pathname: "http://my.yoast.test:3001/sites/497490e6-eb8d-4627-be9b-bfd33fc217f1"
	}
};

// We are on a subscription detail page.
let stateSubscriptionDetail = Object.assign( {}, defaultState );
stateSubscriptionDetail.router = {
	location: {
		pathname: "http://my.yoast.test:3001/subscriptions/497490e6-eb8d-4627-be9b-bfd33fc217f1"
	}
};

let expectedSite = {
	loggingOut: false,
	logoutError: null,
	pageTitle: "yoast.com",
};

let expectedSubscription = {
	loggingOut: false,
	logoutError: null,
	pageTitle: "Yoast SEO for WordPress Premium plugin",
};

let expectedNoDetailPage = {
	loggingOut: false,
	logoutError: null,
	pageTitle: "",
};

test( "the mapStateToProps function, for when on a site detail page.", () => {
	expect( mapStateToProps( stateSiteDetail ) ).toEqual( expectedSite );
} );

test( "the mapStateToProps function, for when on a subscription detail page.", () => {
	expect( mapStateToProps( stateSubscriptionDetail ) ).toEqual( expectedSubscription );
} );

test( "the mapStateToProps function, for when not on a detail page.", () => {
	expect( mapStateToProps( defaultState ) ).toEqual( expectedNoDetailPage );
} );

// Mock actions.
jest.mock( "../../src/actions/user" );
jest.mock( "../../src/actions/helpBeacon" );

test( "the mapDispatchToProps function to dispatch the logout action", () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch, defaultState );

	props.onLogoutClick();

	expect( dispatch ).toHaveBeenCalledWith( logout() );

} );

test( "the mapDispatchToProps function to dispatch the open help beacon action", () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch, defaultState );

	props.onBeaconClick();

	expect( dispatch ).toHaveBeenCalledWith( helpBeaconModalOpen() );

} );

test( "the mapDispatchToProps function to go back to the previous site on back click.", () => {
	const dispatch = jest.fn();

	let backState = {
		history: {
			goBack: jest.fn()
		}
	};

	let props = mapDispatchToProps( dispatch, backState );

	props.onBackClick();

	expect( backState.history.goBack ).toHaveBeenCalled();
} );
