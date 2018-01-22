import {
	uiSiteSubscriptionsReducer,
	uiAllSubscriptionsReducer,
	byIdSubscriptionsReducer,
	uiAddSubscriptionModalReducer,
} from "../../src/reducers/subscriptions";
import {
	GET_ALL_SUBSCRIPTIONS_REQUEST,
	GET_ALL_SUBSCRIPTIONS_SUCCESS,
	GET_ALL_SUBSCRIPTIONS_FAILURE,
	ADD_LICENCES_MODAL_OPEN,
	ADD_LICENCES_MODAL_CLOSE,
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

test( 'The uiAddSubscriptionModalReducer processes the add licenses modal open action', () => {
	const state = {
		storeUrl: null,
		modalOpen: false,
	};

	const action = {
		type: ADD_LICENCES_MODAL_OPEN,
		storeUrl: "http://yoast.test/shop/product-url",
	};

	const expected = {
		storeUrl: "http://yoast.test/shop/product-url",
		modalOpen: true,
	};

	const actual = uiAddSubscriptionModalReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAddSubscriptionModalReducer processes the add licenses modal close action', () => {
	const state = {
		storeUrl: "http://yoast.test/shop/product-url",
		modalOpen: true,
	};

	const action = {
		type: ADD_LICENCES_MODAL_CLOSE,
	};

	const expected = {
		storeUrl: null,
		modalOpen: false,
	};

	const actual = uiAddSubscriptionModalReducer( state, action );

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
