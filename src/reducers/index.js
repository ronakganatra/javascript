import { userReducer as user } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { routerReducer } from "react-router-redux";
import { allIdsSitesSubscriptionsReducer, byIdSitesSubscriptionsReducer, uiSiteSubscriptionsReducer } from "./subscriptions.js";


export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	site: uiSiteSubscriptionsReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesSubscriptionsReducer = combineReducers( {
	byId: byIdSitesSubscriptionsReducer,
	allIds: allIdsSitesSubscriptionsReducer,
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
