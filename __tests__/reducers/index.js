import { LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";
import { uiReducer, entitiesSitesReducer, entitiesReducer, rootReducer } from "../../src/reducers/index"
import { uiSitesReducer, byIdReducer, allIdsReducer } from "../../src/reducers/sites"
import { userReducer } from "../../src/reducers/user"

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

test( 'ui reducer', () => {
	const state = { sites: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { sites: { name: "uiSitesReducer" } };
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

test( 'entities reducer', () => {
	const state = { sites: { allIds: {}, byId: {} } };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { sites: { allIds: { name: "allIdsReducer"}, byId: { name: "byIdReducer" } } };
	const actual = entitiesReducer( state, action );
	expect( actual ).toEqual( expected );
} );

test( 'root reducer', () => {
	const state = { user: {}, router: { location: "URL" } };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { entities: {
		sites: {
			byId: { name: "byIdReducer" },
			allIds: { name: "allIdsReducer" },
			}
		},
		router: {
			location: "URL",
		},
		ui: {
			sites: { name: "uiSitesReducer" }
		},
		user: { name: "userReducer" }
	};
	const actual = rootReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( userReducer ).toHaveBeenCalledWith( {}, action );
} );
