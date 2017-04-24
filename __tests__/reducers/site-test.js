import { uiSiteSubscriptionsReducer } from "../../src/reducers/site";
import { SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_REMOVE_SUBSCRIPTION_SUCCESS, SITE_TOGGLE_SUBSCRIPTION_REQUEST, SITE_TOGGLE_SUBSCRIPTION_FAILURE } from "../../src/actions/site";

test( 'the site add subscription request action', () => {
	const state = {
		toggling: false,
		error: "",
		active: [],
	};
	const action = {
		type: SITE_TOGGLE_SUBSCRIPTION_REQUEST,
	};
	const expected = {
		toggling: true,
		error: "",
		active: [],
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription success action', () => {
	const state = {
		toggling: true,
		error: "",
	};
	const subscriptionToBeAdded = {
		"siteId": "2",
		"subscriptionId": "4",
		"id": 8
	};
	const action = {
		type: SITE_ADD_SUBSCRIPTION_SUCCESS,
		"siteId": 108,
		"subscriptionId": 120,
	};
	const expected = {
		toggling: false,
		error: "",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription failure action', () => {
	const state = {
		toggling: true,
		error: "",
	};
	const action = {
		type: SITE_TOGGLE_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: "This is an error"
	};
	const expected = {
		toggling: false,
		error: "This is an error",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'an action not defined in the getSiteSubscriptionsReducer switch', () => {
	const state = {};

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = {};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );
