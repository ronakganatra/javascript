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
	};

	const actual = actions.getAllSubscriptionsSuccess();
	expect( actual ).toEqual( expected );
} );

test( 'get all subscriptions request action creator', () => {
	const expected = {
		type: actions.GET_ALL_SUBSCRIPTIONS_FAILURE,
	};

	const actual = actions.getAllSubscriptionsFailure();
	expect( actual ).toEqual( expected );
} );
