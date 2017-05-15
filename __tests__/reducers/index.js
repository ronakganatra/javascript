import { LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";
import { uiReducer, entitiesSitesReducer, entitiesReducer, rootReducer, entitiesSubscriptionsReducer, entitiesProductsReducer, uiSiteReducer} from "../../src/reducers/index"
import { uiSiteSubscriptionsReducer, byIdSubscriptionsReducer, allIdsSubscriptionsReducer, uiAllSubscriptionsReducer } from "../../src/reducers/subscriptions";
import { GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../../src/actions/subscriptions";
import { uiSiteProductsReducer, byIdProductsReducer, allIdsProductsReducer, uiAllProductsReducer } from "../../src/reducers/products";
import { GET_SITE_PRODUCTS_SUCCESS } from "../../src/actions/subscriptions";
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
		uiSiteReducer: jest.fn( ( state = {} ) => { return { name: "uiSiteReducer" }; } ),
		byIdSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSubscriptionsReducer" }; } ),
		allIdsSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSubscriptionsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/subscriptions.js", () => {
	return {
		byIdSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSubscriptionsReducer" }; } ),
		allIdsSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSubscriptionsReducer" }; } ),
		uiAllSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllSubscriptionsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/products.js", () => {
	return {
		byIdProductsReducer: jest.fn( ( state = {} ) => { return { name: "byIdProductsReducer" }; } ),
		allIdsProductsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsProductsReducer" }; } ),
		uiAllProductsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllProductsReducer" }; } ),
	}
} );

test( 'ui reducer', () => {
	const state = { sites: {}, site: { name: "uiSiteReducer", }, search: {}, orders: {}, subscriptions: {}, products: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = { sites: { name: "uiSitesReducer" }, site: { name: "uiSiteReducer", }, subscriptions: { name: "uiAllSubscriptionsReducer" }, products: { name: "uiAllProductsReducer" }, search: { query: "" }, orders: {} };

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
	const expected = { allIds: { name: "allIdsSubscriptionsReducer"}, byId: { name: "byIdSubscriptionsReducer" } };
	const actual = entitiesSubscriptionsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities products reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: GET_SITE_PRODUCTS_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsProductsReducer"}, byId: { name: "byIdProductsReducer" } };
	const actual = entitiesProductsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdProductsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsProductsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities reducer', () => {
	const state = { sites: { allIds: {}, byId: {} }, subscriptions: { allIds: {}, byId: {} } };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = {
		sites: { allIds: { name: "allIdsReducer" }, byId: { name: "byIdReducer" } },
		subscriptions: { allIds: { name: "allIdsSubscriptionsReducer" }, byId: { name: "byIdSubscriptionsReducer"} },
		products: { allIds: { name: "allIdsProductsReducer" }, byId: { name: "byIdProductsReducer"} },
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

test( 'root reducer with LINK_SITE_FAILURE action', () => {
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
			products: {
				byId: { name: "byIdProductsReducer" },
				allIds: { name: "allIdsProductsReducer" },
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
			site: { name: "uiSiteReducer" },
			subscriptions: { name: "uiAllSubscriptionsReducer" },
			products: { name: "uiAllProductsReducer" },
			orders: {
				"error": "",
				"retrievingOrders": false,
			},
		},
		user: { name: "userReducer" },
	};
	const actual = rootReducer( state, action );
	expect( actual ).toEqual( expected );
} );
