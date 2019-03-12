import { uiSiteReducer } from "../../src/reducers/site";
import * as actions from "../../src/actions/site";

let defaultState = {
	removing: false,
	subscriptions: {
		error: "",
		toggling: false,
	},
};

test( 'the site add subscription request action', () => {
	const action = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_REQUEST,
	};

	const initialState = Object.assign( {}, defaultState );

	const expected = Object.assign( {}, initialState );
	expected.subscriptions.toggling = true;

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription success action', () => {
	const action = {
		type: actions.SITE_ADD_SUBSCRIPTION_SUCCESS,
		"siteId": 108,
		"subscriptionId": 120,
	};

	const initialState = Object.assign( {}, defaultState );
	initialState.subscriptions.toggling = true;

	const expected = Object.assign( {}, initialState );
	expected.subscriptions.toggling = false;

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site add subscription failure action', () => {
	const action = {
		type: actions.SITE_TOGGLE_SUBSCRIPTION_FAILURE,
		addingSubscriptionError: "This is an error"
	};

	const initialState = Object.assign( {}, defaultState );
	initialState.subscriptions.toggling = true;

	const expected = Object.assign( {}, initialState );
	expected.subscriptions.toggling = false;
	expected.subscriptions.error = "This is an error";

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site remove start action', () => {
	const action = {
		type: actions.SITE_REMOVE_START,
	};

	const initialState = Object.assign( {}, defaultState );

	const expected = Object.assign( {}, initialState );
	expected.removing = true;

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site remove success action', () => {
	const action = {
		type: actions.SITE_REMOVE_SUCCESS,
	};

	const initialState = Object.assign( {}, defaultState );
	initialState.removing = true;

	const expected = Object.assign( {}, initialState );
	expected.removing = false;

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'the site remove failure action', () => {
	const action = {
		type: actions.SITE_REMOVE_FAILURE,
	};

	const initialState = Object.assign( {}, defaultState );
	initialState.removing = true;

	const expected = Object.assign( {}, initialState );
	expected.removing = false;

	const actual = uiSiteReducer( initialState, action );

	expect( actual ).toEqual( expected );
} );

test( 'an action not defined in the uiSiteReducer', () => {
	const state = { subscriptions: {} };

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = { subscriptions: {} };

	const actual = uiSiteReducer( state, action );

	expect( actual ).toEqual( expected );
} );
