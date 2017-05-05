import {
	uiSiteSubscriptionsReducer,
	uiAllSubscriptionsReducer,
	byIdSubscriptionsReducer,
	allIdsSubscriptionsReducer,
} from "../../src/reducers/subscriptions";
import {
	GET_ALL_SUBSCRIPTIONS_REQUEST,
	GET_ALL_SUBSCRIPTIONS_SUCCESS,
	GET_ALL_SUBSCRIPTIONS_FAILURE,
} from "../../src/actions/subscriptions";

import { siteAddSubscriptionSuccess, siteRemoveSubscriptionSuccess } from "../../src/actions/site";

test( 'The uiAllSubscriptionsReducer processes the get all subscription request action', () => {
	const state = {
		requesting: false,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_REQUEST,
	};
	const expected = {
		requesting: true,
		error: "",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription success action', () => {
	const state = {
		requesting: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		requesting: false,
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription failure action', () => {
	const state = {
		requesting: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		requesting: false,
		error: "test_errorMessage",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "Connecting a subscription to a site", () => {
	let subscriptionState = {
		"sub1id": {
			used: 1,
		},
	};

	let expected = {
		"sub1id": {
			used: 2,
		},
	};

	let action = siteAddSubscriptionSuccess( "site-id", "sub1id" );

	const actual = byIdSubscriptionsReducer( subscriptionState, action );

	expect( actual ).toEqual( expected );
} );

test( "Removing a subscription from a site", () => {
	let subscriptionState = {
		"sub1id": {
			used: 1,
		},
	};

	let expected = {
		"sub1id": {
			used: 0,
		},
	};

	let action = siteRemoveSubscriptionSuccess( "site-id", "sub1id" );

	const actual = byIdSubscriptionsReducer( subscriptionState, action );

	expect( actual ).toEqual( expected );
} );
