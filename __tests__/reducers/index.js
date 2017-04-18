import { LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";
import { uiReducer, entitiesSitesReducer, entitiesReducer, rootReducer , entitiesSubscriptionsReducer, uiSiteReducer} from "../../src/reducers/index"
import { uiSiteSubscriptionsReducer, byIdSubscriptionsReducer, allIdsSubscriptionsReducer, uiAllSubscriptionsReducer } from "../../src/reducers/subscriptions";
import { GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../../src/actions/subscriptions";
import { uiSearch } from "../../src/reducers/search";
import { SEARCH_QUERY_CHANGE } from "../../src/actions/search";
import { allIdsReducer, byIdReducer, uiSitesReducer } from "../../src/reducers/sites";
import { userReducer } from "../../src/reducers/user";

jest.mock( "../../src/reducers/sites.js", () => {
	return {
		uiSitesReducer: jest.fn( ( state = {} ) => { return { name: "uiSitesReducer" }; } ),
		byIdReducer: jest.fn( ( state = {} ) => { return { name: "byIdReducer" }; } ),
		allIdsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/user.js", () => {
	return {
		userReducer: jest.fn( ( state = {} ) => { return { name: "userReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/subscriptions.js", () => {
	return {
		uiSiteSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "uiSiteSubscriptionsReducer" }; } ),
		byIdSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSubscriptionsReducer" }; } ),
		allIdsSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSubscriptionsReducer" }; } ),
		uiAllSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllSubscriptionsReducer" }; } ),
	}
} );

test( 'ui reducer', () => {

	const state = { sites: {}, site: { subscriptions: {}, }, search: {}, orders: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = { sites: { name: "uiSitesReducer" }, site: { subscriptions: { name: "uiSiteSubscriptionsReducer" }, }, subscriptions: { name: "uiAllSubscriptionsReducer" }, search: { query: "" }, orders: {} };

	const actual = uiReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( uiSitesReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities site reducer', () => {
	const state = { allIds: {}, byId: {} , orders: [] };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { allIds: { name: "allIdsReducer"}, byId: { name: "byIdReducer" } };
	const actual = entitiesSitesReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities subscriptions reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsSubscriptionsReducer"}, byId: { name: "byIdSubscriptionsReducer" } };
	const actual = entitiesSubscriptionsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities reducer', () => {
	const state = { sites: { allIds: {}, byId: {} }, subscriptions: { allIds: {}, byId: {} } };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = {
		sites: { allIds: { name: "allIdsReducer" }, byId: { name: "byIdReducer" } },
		subscriptions: { allIds: { name: "allIdsSubscriptionsReducer" }, byId: { name: "byIdSubscriptionsReducer"} },
		orders: { allIds: [], byId: {} }
	};


	const actual = entitiesReducer( state, action );
	expect( actual ).toEqual( expected );
} );

test( 'ui reducer with search input', () => {
	const state = { query: "" };
	const action = {
		type: SEARCH_QUERY_CHANGE,
		query: "teststring",
	};
	const expected = { query: "teststring" };
	const actual = uiSearch( state, action );
	expect( actual ).toEqual( expected );
} );

test( 'root reducer', () => {
	const state = { user: {}, router: { location: "URL" } };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = {
		entities: {
			orders: {
				byId: {},
				allIds:[],
			},
			sites: {

				byId: { name: "byIdReducer" },
				allIds: { name: "allIdsReducer" },
			},
			subscriptions: {
				byId: { name: "byIdSubscriptionsReducer" },
				allIds: { name: "allIdsSubscriptionsReducer" },
			},
		},
		router: {
			location: "URL",
		},
		ui: {
			sites: { name: "uiSitesReducer" },

     	search: {
				query: "",
			},
			site: {
				subscriptions: { name: "uiSiteSubscriptionsReducer" },
			},
			subscriptions: { name: "uiAllSubscriptionsReducer" },
			orders: {
				"error": "",
				"retrievingOrders": false,
			},
		},
		user: { name: "userReducer" }
	};
	const actual = rootReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( userReducer ).toHaveBeenCalledWith( {}, action );
} );
