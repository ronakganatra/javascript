import { uiSitesReducer, allIdsReducer, byIdReducer } from "../../src/reducers/sites.js";
import { LINK_SITE_POPUP_OPEN, LINK_SITE_POPUP_CLOSE, UPDATE_SITE_URL, LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";

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

test( 'the link site success action in the byIdReducer when there is already an sie present', () => {
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


test( 'the link site success action in the allIdsReducer', () => {
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
