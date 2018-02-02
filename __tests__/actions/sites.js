import * as actions from "../../src/actions/sites";
import * as api from "../../src/functions/api";

const mockSites = [ "http://yoast.com" ];

jest.mock( "../../src/functions/api", () => {
	return {
		getApiUrl: jest.fn( () => { return "" } ),
		prepareInternalRequest: jest.fn( ( endpoint, method = "GET", payload = {} ) => {
			return { endpoint, method, payload };
		} ),
		doRequest: jest.fn( ( request ) => {
			if ( request.method === "GET" ) {
				return Promise.resolve( mockSites );
			}

			// If the site already exists, we need to reject the promise.
			if ( mockSites.includes( request.payload.url ) === true ) {
				return Promise.reject( { message: "Attempted to insert a duplicate record in a unique field" } );
			}

			return Promise.resolve( { status: 200 } );
		} )
	};
} );

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 10 } ),
		getAccessToken: jest.fn( () => { return "access" } ),
	}
} );

jest.mock( "whatwg-fetch" );

beforeEach( () => {
	api.doRequest.mockClear();
} );

test( 'opening link site modal action creator', () => {
	const expected = {
		type: actions.LINK_SITE_MODAL_OPEN,
	};

	const actual = actions.linkSiteModalOpen( );

	expect( actual ).toEqual( expected );
} );


test( 'closing link site modal action creator', () => {
	const expected = {
		type: actions.LINK_SITE_MODAL_CLOSE,
	};

	const actual = actions.linkSiteModalClose();

	expect( actual ).toEqual( expected );
} );

test( 'server request action creator', () => {
	const expected = {
		type: actions.UPDATE_SITE_URL,
	};

	const actual = actions.updateSiteUrl();

	expect( actual ).toEqual( expected );
} );

test( 'link site success creator', () => {
	const expected = {
		type: actions.LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};

	const input = {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	};

	const actual = actions.linkSiteSuccess( input );

	expect( actual ).toEqual( expected );
} );

test( 'link site failure creator', () => {
	const expected = {
		type: actions.LINK_SITE_FAILURE,
		linkSiteError: "Authorization Required",
	};

	const input = "Authorization Required";
	const actual = actions.linkSiteFailure( input );

	expect( actual ).toEqual( expected );
} );

test( 'link site action creator with success', () => {
	const dispatch = jest.fn();
	const linkSiteFunc = actions.linkSite( "http://yoast2.com" );

	expect( linkSiteFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Customers/10/sites/`, "POST", { url: "http://yoast2.com" } );

	return linkSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.updateSiteUrl( "http://yoast2.com" ) );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteSuccess( { status: 200 } ) );
	} );
} );

test( 'link site action creator with failure', () => {
	const dispatch = jest.fn();
	const linkSiteFunc = actions.linkSite( "http://yoast.com" );

	expect( linkSiteFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Customers/10/sites/`, "POST", { url: "http://yoast.com" } );


	return linkSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.updateSiteUrl( "http://yoast.com" ) );
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteFailure( { message: "Attempted to insert a duplicate record in a unique field" } ) );
	} );
} );

test( 'retrieve sites request action creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_REQUEST,
	};

	const actual = actions.retrieveSitesRequest();

	expect( actual ).toEqual( expected );
} );


test( 'retrieve sites success creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}, ]
	};
	const input = [ {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	} ];

	const actual = actions.retrieveSitesSuccess( input );

	expect( actual ).toEqual( expected );
} );


test( 'retrieve sites failure creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_FAILURE,
		retrieveSitesError: "Authorization Required",
	};
	const input = "Authorization Required";

	const actual = actions.retrieveSitesFailure( input );

	expect( actual ).toEqual( expected );
} );

test( 'retrieve sites action action creator with success', () => {
	const dispatch = jest.fn();
	const retrieveSiteFunc = actions.retrieveSites();

	expect( retrieveSiteFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Customers/10/sites/` );

	return retrieveSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesRequest() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesSuccess( mockSites ) );
	} );
} );

test( 'retrieve sites action action creator with failure', () => {
	const dispatch = jest.fn();
	const retrieveSiteFunc = actions.retrieveSites();

	// Force a rejection to ensure the retrieveSitesFailure will be called.
	api.doRequest.mockImplementation( () => {
		return Promise.reject( Error( "Authorization required" ) );
	} );

	expect( retrieveSiteFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Customers/10/sites/` );

	return retrieveSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesRequest() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesFailure( "Authorization required" ) );
	} );
} );
