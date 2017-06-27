import * as actions from "../../src/actions/site";
import * as api from "../../src/functions/api";


jest.mock( "../../src/functions/api", () => {
	return {
		getApiUrl: jest.fn( () => { return "" } ),
		prepareInternalRequest: jest.fn( ( endpoint, payload = {}, method = "GET" ) => {
			return { endpoint, method, payload };
		} ),
		doRequest: jest.fn( ( request ) => {
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

test( 'site add subscription action creator', () => {
	const expected = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_REQUEST
	};

	const actual = actions.siteToggleSubscriptionRequest( );

	expect( actual ).toEqual( expected );
} );

test( 'site add subscription success creator', () => {
	const expected = {
		type: actions.SITE_ADD_SUBSCRIPTION_SUCCESS,
		siteId: "siteId",
		subscriptionId: "subscriptionId",
	};

	const actual = actions.siteAddSubscriptionSuccess( "siteId", "subscriptionId" );

	expect( actual ).toEqual( expected );
} );


test( 'site add subscription failure creator', () => {
	const expected = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: "Authorization Required",
	};
	const input = "Authorization Required";

	const actual = actions.siteToggleSubscriptionFailure( input );

	expect( actual ).toEqual( expected );
} );

jest.mock( "../../src/functions/auth", () => {
	return {
		getAccessToken: jest.fn( () => { return "access" } ),

	}
} );

let siteId = "123";
let subscriptionId = "112";

test( 'site add subscription action creator with success', () => {
	const dispatch = jest.fn();
	const siteAddSubscriptionFunc = actions.siteAddSubscription( siteId, subscriptionId );

	expect( siteAddSubscriptionFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "PUT" );

	return siteAddSubscriptionFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteAddSubscriptionSuccess( siteId, subscriptionId ) );
	} );
} );

test( 'site add subscription action creator with failure', () => {
	const dispatch = jest.fn();
	const siteAddSubscriptionFunc = actions.siteAddSubscription( siteId, subscriptionId );

	// Force a rejection to ensure the siteRemoveFailure will be called.
	api.doRequest.mockImplementationOnce( () => {
		return Promise.reject( Error( "Duplicate entry for Subscription.id" ) );
	} );

	expect( siteAddSubscriptionFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "PUT" );

	return siteAddSubscriptionFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionFailure( "Duplicate entry for Subscription.id" ) );
	} );
} );

test( 'site remove subscription action creator with success', () => {
	const dispatch = jest.fn();
	const siteRemoveSubscriptionFunc = actions.siteRemoveSubscription( siteId, subscriptionId );

	expect( siteRemoveSubscriptionFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "DELETE" );

	return siteRemoveSubscriptionFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveSubscriptionSuccess( siteId, subscriptionId ) );
	} );
} );

test( 'site remove subscription action creator with failure', () => {
	const dispatch = jest.fn();
	const siteRemoveSubscriptionFunc = actions.siteRemoveSubscription( siteId, subscriptionId );

	// Force a rejection to ensure the siteRemoveFailure will be called.
	api.doRequest.mockImplementationOnce( () => {
		return Promise.reject( Error( "Authorization Required" ) );
	} );

	expect( siteRemoveSubscriptionFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/subscriptions/rel/${subscriptionId}/`, "DELETE" );

	return siteRemoveSubscriptionFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionRequest() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteToggleSubscriptionFailure( "Authorization Required" ) );
	} );
} );

test( 'site remove action creator with success', () => {
	const dispatch = jest.fn();
	const siteRemoveFunc = actions.siteRemove( siteId );

	expect( siteRemoveFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/`, "DELETE" );

	return siteRemoveFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveStart( siteId ) );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveSuccess( siteId ) );
	} );
} );

test( 'site remove action creator with failure', () => {
	const dispatch = jest.fn();
	const siteRemoveFunc = actions.siteRemove( siteId );

	// Force a rejection to ensure the siteRemoveFailure will be called.
	api.doRequest.mockImplementationOnce( () => {
		return Promise.reject( Error( "Authorization Required" ) );
	} );

	expect( siteRemoveFunc ).toBeInstanceOf( Function );

	let request = api.prepareInternalRequest( `Sites/${siteId}/`, "DELETE" );

	return siteRemoveFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveStart( siteId ) );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.siteRemoveFailure( siteId, "Authorization Required" ) );
	} );
} );
