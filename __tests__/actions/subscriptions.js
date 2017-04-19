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
				"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
				"url": "5",
				"creationDate": "2017-03-21T15:24:34.606Z",
				"userId": 2
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );

	let subscription = {
		"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
		"url": "5",
		"creationDate": "2017-03-21T15:24:34.606Z",
		"userId": 2
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
					"statusCode": 500,
					"name": "Error",
					"message": "Duplicate entry for Site.id",
					"stack": "Error: Duplicate entry for Site.id\n    at Memory._createSync (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/connectors/memory.js:224:15)\n    at Memory.create (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/connectors/memory.js:232:8)\n    at /Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/dao.js:397:23\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:122:5)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at ModelConstructor.<anonymous> (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/dao.js:393:15)"
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllSubscriptionsFunc = actions.getAllSubscriptions();

	expect( getAllSubscriptionsFunc ).toBeInstanceOf( Function );

	return getAllSubscriptionsFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllSubscriptionsFailure( "Duplicate entry for Site.id" ) );
	} );
} );
