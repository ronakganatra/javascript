import { userReducer as user } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { entitiesSearch } from "./search.js";

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	search: entitiesSearch,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	entities: entitiesReducer,
	user,
} );

export default rootReducer;
