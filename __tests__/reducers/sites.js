import { uiSitesReducer, allIdsReducer, byIdReducer } from "../../src/reducers/sites.js";
import {
	LINK_SITE_POPUP_OPEN, LINK_SITE_POPUP_CLOSE, UPDATE_SITE_URL, LINK_SITE_SUCCESS, LINK_SITE_FAILURE,
	RETRIEVE_SITES_SUCCESS
} from "../../src/actions/sites";

test( 'the popup open action', () => {
	const state = {};
	const action = {
		type: LINK_SITE_POPUP_OPEN,
	};
	const expected = {
		addSitePopupOpen: true,
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the popup close action', () => {
	const state = {
		addSitePopupOpen: true,
	};
	const action = {
		type: LINK_SITE_POPUP_CLOSE,
	};
	const expected = {
		addSitePopupOpen: false,
		linkSiteError: "",
		linkSiteFailed: false,
		linkingSiteUrl: "",
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the update site url action', () => {
	const state = {
	};
	const action = {
		type: UPDATE_SITE_URL,
		url: "yoast.com",
	};
	const expected = {
		linkingSite: true,
		linkingSiteUrl: "yoast.com",
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site success action in the uiSitesReducer', () => {
	const state = {
		linkSiteFailed: true,
	};
	const action = {
		type: LINK_SITE_SUCCESS,
	};
	const expected = {
		linkSiteFailed: false,
		addSitePopupOpen: false,
		linkingSiteUrl: "",
		linkingSite: false,
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site failure action', () => {
	const state = {};
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = {
		linkSiteFailed: true,
		linkSiteError: action.linkSiteError,
		linkingSiteUrl: "",
		linkingSite: false,
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'an action not defined in the switch', () => {
	const state = {};

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = {};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site success action in the byIdReducer', () => {
	const state = {};

	const action = {
		type: LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site success action in the byIdReducer when there is already an site present', () => {
	const state = { "497490e6-eb8d-4627-be9b-bfd33fc217f2": {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	} };

	const action = {
		type: LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://google.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f2": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://google.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site success action doesn\'t include all subscription data', () => {
	const state = {};
	const action = {
		type: LINK_SITE_SUCCESS,
		site: {
			"id": "site-id",
			"subscriptions": [
				{
					"id": "subscription-id",
					"other-data": "some other data",
				}
			]
		}
	};
	const expected = {
		"site-id": {
			"id": "site-id",
			"subscriptions": [ "subscription-id" ]
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the retrieve sites success action in the byIdReducer', () => {
	const state = {};

	const action = {
		type: RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}, ]
	};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the retrieve sites success action in the byIdReducer when there is already an site present', () => {
	const state = { "497490e6-eb8d-4627-be9b-bfd33fc217f2": {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	} };

	const action = {
		type: RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://google.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		} ],
	};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f2": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://google.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the byIdReducers puts only subscription IDs in the state', () => {
	const action = {
		type: RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1,
			"subscriptions": [
				{
					"id": "06775ed4-d5aa-4d23-8ecc-d0f724b88b6f",
					"productId": "01be14c4-b4f5-4141-8ce6-4f4dac59762d",
					"startDate": "2017-04-18T15:11:19.000Z",
					"endDate": "2017-04-18T15:11:19.000Z",
					"reoccurring": true,
					"myYoastUserId": 2
				}
			]
		} ],
	};
	const state = {};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1,
			"subscriptions": [ "06775ed4-d5aa-4d23-8ecc-d0f724b88b6f" ],
		}
	};

	const actual = byIdReducer( state, action );

	expect( actual ).toEqual( expected );
} );


test( 'the link site success action in the allIdsReducer', () => {
	const state = [];

	const action = {
		type: LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ];

	const actual = allIdsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the link site success action in the allIdsReducer when there is already an id present', () => {
	const state = [ "497490e6-eb8d-4627-be9b-bfd33fc217f2" ];

	const action = {
		type: LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f2", "497490e6-eb8d-4627-be9b-bfd33fc217f1" ];

	const actual = allIdsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the retrieve sites success action in the allIdsReducer', () => {
	const state = [ ];

	const action = {
		type: RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
				"url": "http://yoast2.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}, ]
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f1", "497490e6-eb8d-4627-be9b-bfd33fc217f2" ];

	const actual = allIdsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the retrieve sites success action in the allIdsReducer when there is already an id present', () => {
	const state = [ "497490e6-eb8d-4627-be9b-bfd33fc217f3" ];

	const action = {
		type: RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
				"url": "http://yoast2.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}, ]
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f3", "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"497490e6-eb8d-4627-be9b-bfd33fc217f2" ];

	const actual = allIdsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the reducers don\'t touch state with different actions', () => {
	const action = {
		type: "FETCH_USER_SUCCESS",
		user: {}
	};
	const state = {
		addSitePopupOpen: false,
		linkingSite: false,
		linkingSiteUrl: "",
		linkSiteFailed: false,
		linkSiteError: "",
		retrievingSites: false,
		retrievingSitesFailed: false,
		retrievingSitesError: "",
		sitesRetrieved: true,
	};

	const actual = uiSitesReducer( state, action );

	expect( actual ).toEqual( state );
} );
