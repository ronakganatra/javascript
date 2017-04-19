import { getSiteSubscriptionsReducer, siteAddSubscriptionsReducer } from "../../src/reducers/site";
import { GET_SITE_SUBSCRIPTIONS_FAILURE, GET_SITE_SUBSCRIPTIONS_REQUEST, GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../../src/actions/subscriptions";
import { SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_ADD_SUBSCRIPTION_REQUEST, SITE_ADD_SUBSCRIPTION_FAILURE } from "../../src/actions/site";

test( 'the get site subscriptions request action', () => {
	const state = {
		retrievingSiteSubscriptions: false,
		addingSubscription: false,
		error: "",
		active: [],
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_REQUEST,
	};
	const expected = {
		retrievingSiteSubscriptions: true,
		addingSubscription: false,
		error: "",
		active: [],
	};

	const actual = getSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the get site subscriptions success action', () => {
	const state = {
		retrievingSiteSubscriptions: true,
		addingSubscription: false,
		error: "",
		active: [],
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		addingSubscription: false,
		retrievingSiteSubscriptions: false,
		error: "",
		active: [],
	};

	const actual = getSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the get site subscriptions failure action', () => {
	const state = {
		retrievingSiteSubscriptions: true,
		addingSubscription: false,
		error: "",
		active: [],
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_FAILURE,
		getSiteSubscriptionsError: "This is an error",
	};
	const expected = {
		addingSubscription: false,
		retrievingSiteSubscriptions: false,
		error: "This is an error",
		active: [],
	};

	const actual = getSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'an action not defined in the getSiteSubscriptionsReducer switch', () => {
	const state = {};

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = {};

	const actual = getSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );


test( 'the site add subscription request action', () => {
	const state = {
		retrievingSiteSubscriptions: false,
		addingSubscription: false,
		error: "",
		active: [],
	};
	const action = {
		type: SITE_ADD_SUBSCRIPTION_REQUEST,
	};
	const expected = {
		retrievingSiteSubscriptions: false,
		addingSubscription: true,
		error: "",
		active: [],
	};

	const actual = siteAddSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription success action', () => {
	const state = {
		retrievingSiteSubscriptions: false,
		addingSubscription: true,
		error: "",
		active: [ {
			"siteId": "1",
			"subscriptionId": "3",
			"id": 7
		} ],
	};
	const subscriptionToBeAdded = {
		"siteId": "2",
		"subscriptionId": "4",
		"id": 8
	};
	const action = {
		type: SITE_ADD_SUBSCRIPTION_SUCCESS,
		active: subscriptionToBeAdded,
	};
	const expected = {
		retrievingSiteSubscriptions: false,
		addingSubscription: false,
		error: "",
		active: [ {
			"siteId": "1",
			"subscriptionId": "3",
			"id": 7
		},
		{
			"siteId": "2",
			"subscriptionId": "4",
			"id": 8
		} ],
	};

	const actual = siteAddSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription failure action', () => {
	const state = {
		retrievingSiteSubscriptions: false,
		addingSubscription: true,
		error: "",
		active: [],
	};
	const action = {
		type: SITE_ADD_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: "This is an error"
	};
	const expected = {
		retrievingSiteSubscriptions: false,
		addingSubscription: false,
		error: "This is an error",
		active: [],
	};

	const actual = siteAddSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'an action not defined in the getSiteSubscriptionsReducer switch', () => {
	const state = {};

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = {};

	const actual = siteAddSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );
