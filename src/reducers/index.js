import { userReducer as user } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { routerReducer } from "react-router-redux";
import { allIdsSubscriptionsReducer, byIdSubscriptionsReducer, uiSiteSubscriptionsReducer, uiAllSubscriptionsReducer } from "./subscriptions.js";
import { uiSearch } from "./search.js";

export const uiSiteReducer = combineReducers( {
	subscriptions: uiSiteSubscriptionsReducer,
} );

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	search: uiSearch,
	site: uiSiteReducer,
	subscriptions: uiAllSubscriptionsReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesSubscriptionsReducer = combineReducers( {
	byId: byIdSubscriptionsReducer,
	allIds: allIdsSubscriptionsReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	subscriptions: entitiesSubscriptionsReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	entities: entitiesReducer,
	user,
	router: routerReducer,
} );

export default rootReducer;
