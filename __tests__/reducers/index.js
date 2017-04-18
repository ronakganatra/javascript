import { LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";
import { uiReducer, entitiesSitesReducer, entitiesReducer, rootReducer , entitiesSubscriptionsReducer} from "../../src/reducers/index"
import { uiSiteSubscriptionsReducer, byIdSitesSubscriptionsReducer, allIdsSitesSubscriptionsReducer } from "../../src/reducers/subscriptions";
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

jest.mock( "../../src/reducers/site.js", () => {
	return {
		getSiteSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "getSiteSubscriptionsReducer" }; } ),
		siteAddSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "siteAddSubscriptionsReducer" }; } ),
		uiSiteSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "uiSiteSubscriptionsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/subscriptions.js", () => {
	return {
		byIdSitesSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSitesSubscriptionsReducer" }; } ),
		allIdsSitesSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSitesSubscriptionsReducer" }; } ),
	}
} );

test( 'ui reducer', () => {
	const state = { sites: {}, search: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = { sites: { name: "uiSitesReducer" }, site: { name: "uiSiteSubscriptionsReducer" }, search: { query: "" } };

	const actual = uiReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( uiSitesReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities site reducer', () => {
	const state = { allIds: {}, byId: {} };
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
	const expected = { allIds: { name: "allIdsSitesSubscriptionsReducer"}, byId: { name: "byIdSitesSubscriptionsReducer" } };
	const actual = entitiesSubscriptionsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdSitesSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsSitesSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities reducer', () => {
	const state = { sites: { allIds: {}, byId: {} }, subscriptions: { allIds: {}, byId: {} } };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { sites: { allIds: { name: "allIdsReducer" }, byId: { name: "byIdReducer" } }, subscriptions: { allIds: { name: "allIdsSitesSubscriptionsReducer" }, byId: { name: "byIdSitesSubscriptionsReducer"} } };

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
			sites: {

				byId: { name: "byIdReducer" },
				allIds: { name: "allIdsReducer" },
			},
			subscriptions: {
				byId: { name: "byIdSitesSubscriptionsReducer" },
				allIds: { name: "allIdsSitesSubscriptionsReducer" },
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
			site: { name: "uiSiteSubscriptionsReducer" }
		},
		user: { name: "userReducer" }
	};
	const actual = rootReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( userReducer ).toHaveBeenCalledWith( {}, action );
} );
