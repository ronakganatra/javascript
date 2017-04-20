import {
	uiSiteSubscriptionsReducer,
	uiAllSubscriptionsReducer,
	byIdSubscriptionsReducer,
	allIdsSubscriptionsReducer,
} from "../../src/reducers/subscriptions";
import {
	GET_SITE_SUBSCRIPTIONS_REQUEST,
	GET_SITE_SUBSCRIPTIONS_SUCCESS,
	GET_SITE_SUBSCRIPTIONS_FAILURE,
	GET_ALL_SUBSCRIPTIONS_REQUEST,
	GET_ALL_SUBSCRIPTIONS_SUCCESS,
	GET_ALL_SUBSCRIPTIONS_FAILURE,
} from "../../src/actions/subscriptions";

test( 'The uiSiteSubscriptionsReducer processes the get site subscription request action in ', () => {
	const state = {};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_REQUEST,
	};
	const expected = {
		retrievingSiteSubscriptions: true,
		error: "",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSiteSubscriptionsReducer processes the get site subscription success action in ', () => {
	const state = {
		retrievingSiteSubscriptions: true,
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		retrievingSiteSubscriptions: false,
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSiteSubscriptionsReducer processes the get site subscription failure action', () => {
	const state = {
		retrievingSiteSubscriptions: true,
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		retrievingSiteSubscriptions: false,
		error: "test_errorMessage",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription request action', () => {
	const state = {
		retrievingAllSubscriptions: false,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_REQUEST,
	};
	const expected = {
		retrievingAllSubscriptions: true,
		error: "",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription success action', () => {
	const state = {
		retrievingAllSubscriptions: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		retrievingAllSubscriptions: false,
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription failure action', () => {
	const state = {
		retrievingAllSubscriptions: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		retrievingAllSubscriptions: false,
		error: "test_errorMessage",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );
