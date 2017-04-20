import * as actions from "../../src/actions/subscriptions";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

test( 'get request action creator', () => {
	const expected = {
		type: actions.GET_SITE_SUBSCRIPTIONS_REQUEST,
	};
	const actual = actions.getSiteSubscriptionsRequest();
	expect( actual ).toEqual( expected );
} );

test( 'get success action creator', () => {
	const expected = {
		type: actions.GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const actual = actions.getSiteSubscriptionsSuccess();
	expect( actual ).toEqual( expected );
} );

test( 'get failure action creator', () => {
	const expected = {
		type: actions.GET_SITE_SUBSCRIPTIONS_FAILURE,
	};
	const actual = actions.getSiteSubscriptionsFailure();
	expect( actual ).toEqual( expected );
} );

test( 'get all subscriptions request action creator', () => {
	const expected = {
		type: actions.GET_ALL_SUBSCRIPTIONS_REQUEST,
	};

	const actual = actions.getAllSubscriptionsRequest();
	expect( actual ).toEqual( expected );
} );

test( 'get all subscriptions success action creator', () => {
	const expected = {
		type: actions.GET_ALL_SUBSCRIPTIONS_SUCCESS,
		subscriptions: "test subscriptions json",
	};

	const actual = actions.getAllSubscriptionsSuccess( "test subscriptions json" );
	expect( actual ).toEqual( expected );
} );

test( 'get all subscriptions request action creator', () => {
	const expected = {
		type: actions.GET_ALL_SUBSCRIPTIONS_FAILURE,
		message: "test subscriptions failure error",
	};

	const actual = actions.getAllSubscriptionsFailure( "test subscriptions failure error" );
	expect( actual ).toEqual( expected );
} );

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
