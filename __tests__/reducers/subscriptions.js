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
