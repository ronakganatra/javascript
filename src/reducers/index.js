import { userReducer as user } from "./user";
import { uiSiteSubscriptionsReducer } from "./subscriptions.js";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	site: uiSiteSubscriptionsReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	entities: entitiesReducer,
	user,
} );

export default rootReducer;
