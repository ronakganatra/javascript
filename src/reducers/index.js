import { userReducer as user } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { routerReducer } from "react-router-redux";

import { allIdsSitesSubscriptionsReducer, byIdSitesSubscriptionsReducer, uiSiteSubscriptionsReducer } from "./subscriptions.js";
import { uiSiteSubscriptionsReducer } from "./site.js";
import { uiOrdersReducer, byIdOrdersReducer, allIdsOrdersReducer } from "./orders";

import { uiSearch } from "./search.js";

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	search: uiSearch,
	site: uiSiteSubscriptionsReducer,
	orders: uiOrdersReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesSubscriptionsReducer = combineReducers( {
	byId: byIdSitesSubscriptionsReducer,
	allIds: allIdsSitesSubscriptionsReducer,
} );

export const entitiesOrdersReducer = combineReducers( {
	byId: byIdOrdersReducer,
	allIds: allIdsOrdersReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	subscriptions: entitiesSubscriptionsReducer,
	orders: entitiesOrdersReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	entities: entitiesReducer,
	user,
	router: routerReducer,
} );

export default rootReducer;
