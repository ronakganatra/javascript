import user from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js"

const uiReducer = combineReducers( {
	uiSites: uiSitesReducer,
} );

const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

const entitiesReducer = combineReducers( {
	entitiesSites: entitiesSitesReducer,
} );

const rootReducer = combineReducers( {
	ui: uiReducer,
	entities: entitiesReducer,
	user,
} );

export default rootReducer;
