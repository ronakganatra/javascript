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
		requestingSiteSubscriptions: true,
		error: "",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSiteSubscriptionsReducer processes the get site subscription success action in ', () => {
	const state = {
		requestingSiteSubscriptions: true,
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		requestingSiteSubscriptions: false,
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSiteSubscriptionsReducer processes the get site subscription failure action', () => {
	const state = {
		requestingSiteSubscriptions: true,
	};
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		requestingSiteSubscriptions: false,
		error: "test_errorMessage",
	};

	const actual = uiSiteSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription request action', () => {
	const state = {
		requestingAllSubscriptions: false,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_REQUEST,
	};
	const expected = {
		requestingAllSubscriptions: true,
		error: "",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription success action', () => {
	const state = {
		requestingAllSubscriptions: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = {
		requestingAllSubscriptions: false,
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllSubscriptionsReducer processes the get all subscription failure action', () => {
	const state = {
		requestingAllSubscriptions: true,
	};
	const action = {
		type: GET_ALL_SUBSCRIPTIONS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		requestingAllSubscriptions: false,
		error: "test_errorMessage",
	};

	const actual = uiAllSubscriptionsReducer( state, action );

	expect( actual ).toEqual( expected );
} );
