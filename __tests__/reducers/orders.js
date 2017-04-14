import { uiOrdersReducer, byIdOrdersReducer, allIdsOrdersReducer } from "../../src/reducers/orders";
import {
	GET_ORDERS_REQUEST, GET_ORDERS_FAILURE, GET_ORDERS_SUCCESS
} from "../../src/actions/orders";

test( "the orders request action modifies the state", () => {
	const state = {
		error: "",
	};
	const action = {
		type: GET_ORDERS_REQUEST,
	};
	const expected = {
		retrievingOrders: true,
		error: ""
	};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the orders request action clears the previous error message", () => {
	const state = {
		error: "Previous Error Message",
	};
	const action = {
		type: GET_ORDERS_REQUEST,
	};
	const expected = {
		retrievingOrders: true,
		error: ""
	};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order request success action updates the state", () => {
	const state = {
		retrievingOrders: true,
		error: "",
	};
	const action = {
		type: GET_ORDERS_SUCCESS,
	};
	const expected = {
		retrievingOrders: false,
		error: ""
	};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order request failed action updates the state", () => {
	const state = {};

	const action = {
		type: GET_ORDERS_FAILURE,
		message: "Error Message",
	};

	const expected = {
		retrievingOrders: false,
		error: action.message,
	};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order reducer ignores unrelated actions", () => {
	const state = {};

	const BOGUS = "BOGUS";

	const action = {
		type: BOGUS,
	};
	const expected = {};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order success action in the byIdOrderReducer", () => {
	const state = {};

	const action = {
		type: GET_ORDERS_SUCCESS,
		orders: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"url": "http://yoast.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}
		],
	};
	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1,
		},
	};

	const actual = byIdOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order success action in the byIdOrderReducer adds an order", () => {
	const state = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f2": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const action = {
		type: GET_ORDERS_SUCCESS,
		orders: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"url": "http://google.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}
		],
	};

	const expected = {
		"497490e6-eb8d-4627-be9b-bfd33fc217f2": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f2",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
		"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://google.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}
	};

	const actual = byIdOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order success action in the allIdsReducer", () => {
	const state = [];

	const action = {
		type: GET_ORDERS_SUCCESS,
		orders: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"url": "http://yoast.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}
		],
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ];

	const actual = allIdsOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the order success action in the allIdsReducer adds an order", () => {
	const state = [ "497490e6-eb8d-4627-be9b-bfd33fc217f2" ];

	const action = {
		type: GET_ORDERS_SUCCESS,
		orders: [
			{
				"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
				"url": "http://yoast.com",
				"creationDate": "2017-03-21T08:54:09.415Z",
				"userId": 1
			}
		],
	};
	const expected = [ "497490e6-eb8d-4627-be9b-bfd33fc217f2", "497490e6-eb8d-4627-be9b-bfd33fc217f1" ];

	const actual = allIdsOrdersReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( "the reducers don't touch state with different actions", () => {
	const action = {
		type: "FETCH_USER_SUCCESS",
		user: {}
	};

	const state = {
		addSitePopupOpen: false,
		linkingSite: false,
		linkingSiteUrl: "",
		linkSiteFailed: false,
		linkSiteError: "",
		retrievingSites: false,
		retrievingSitesFailed: false,
		retrievingSitesError: "",
		sitesRetrieved: true,
	};

	const actual = uiOrdersReducer( state, action );

	expect( actual ).toEqual( state );
} );

/*
 test( 'the reducers don\'t touch state with different actions', () => {
 const action = {
 type: "FETCH_USER_SUCCESS",
 user: {}
 };
 const state = {
 addSitePopupOpen: false,
 linkingSite: false,
 linkingSiteUrl: "",
 linkSiteFailed: false,
 linkSiteError: "",
 retrievingSites: false,
 retrievingSitesFailed: false,
 retrievingSitesError: "",
 sitesRetrieved: true,
 };

 const actual = uiSitesReducer( state, action );

 expect( actual ).toEqual( state );
 } );
 /*/