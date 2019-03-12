import * as actions from "../../src/actions/subscriptions";
import * as api from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

jest.mock( "../../src/functions/api", () => {
	return {
		getApiUrl: jest.fn( () => { return "" } ),
		prepareInternalRequest: jest.fn( ( endpoint, payload = {}, method = "GET" ) => {
			return { endpoint, method, payload };
		} ),
		doRequest: jest.fn( ( request ) => {
			if ( request.method === "GET" ) {
				return Promise.resolve( { subscription: "Subscription" } );
			}

			return Promise.resolve( { status: 200 } );
		} )
	};
} );

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 2 } ),
		getAccessToken: jest.fn( () => { return "access" } ),
	}
} );

test( 'get all subscriptions action creator with success', () => {
	const dispatch = jest.fn();
	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );
	let request = api.prepareInternalRequest( `Customers/2/subscriptions/` );

	return getAllSubscriptionsFunc( dispatch ).then( () => {
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllSubscriptionsSuccess( { subscription: "Subscription" } ) );
	} );
} );

test( 'get all subscriptions action creator with failure', () => {
	const dispatch = jest.fn();
	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	// Force a rejection to ensure the getAllSubscriptionsFailure will be called.
	api.doRequest.mockImplementation( () => {
		return Promise.reject( Error( "Authorization required" ) );
	} );

	let request = api.prepareInternalRequest( `Customers/2/subscriptions/` );

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );

	return getAllSubscriptionsFunc( dispatch ).then( () => {
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllSubscriptionsFailure( "Authorization required" ) );
	} );
} );
