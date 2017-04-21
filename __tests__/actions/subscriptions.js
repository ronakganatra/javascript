import * as actions from "../../src/actions/subscriptions";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 2 } ),
		getAccessToken: jest.fn( () => { return "access" } ),
	}
} );

let expectedRequest = new Request( getApiUrl() + "/MyYoastUsers/2/subscriptions/?access_token=access", {
	method: "GET",
	body: JSON.stringify(),
	headers: {
		"Content-Type": "application/json",
	},
} );

test( 'get all subscriptions action creator with success', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				test: "test",
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );

	let subscription = {
		test: "test",
	};

	return getAllSubscriptionsFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllSubscriptionsSuccess( subscription ) );
	} );
} );


test( 'get all subscriptions action creator with failure', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"message": "error message test",
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );

	return getAllSubscriptionsFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllSubscriptionsFailure( "error message test" ) );
	} );
} );
