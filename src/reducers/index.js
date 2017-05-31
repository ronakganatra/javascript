import { userReducer } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { uiSiteReducer } from "./site.js";
import { routerReducer } from "react-router-redux";
import { allIdsSubscriptionsReducer, byIdSubscriptionsReducer, uiAllSubscriptionsReducer, uiAddSubscriptionModalReducer } from "./subscriptions.js";
import { allIdsProductsReducer, byIdProductsReducer, uiAllProductsReducer } from "./products.js";
import { uiOrdersReducer, byIdOrdersReducer, allIdsOrdersReducer } from "./orders";
import { uiHelpBeaconModalReducer } from "./helpBeacon";
import { uiSearch } from "./search.js";

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	site: uiSiteReducer,
	search: uiSearch,
	subscriptions: uiAllSubscriptionsReducer,
	products: uiAllProductsReducer,
	orders: uiOrdersReducer,
	addSubscriptionModal: uiAddSubscriptionModalReducer,
	helpBeaconModal: uiHelpBeaconModalReducer,
} );

export const entitiesSitesReducer = combineReducers( {
	byId: byIdReducer,
	allIds: allIdsReducer,
} );

export const entitiesSubscriptionsReducer = combineReducers( {
	byId: byIdSubscriptionsReducer,
	allIds: allIdsSubscriptionsReducer,
} );

export const entitiesProductsReducer = combineReducers( {
	byId: byIdProductsReducer,
	allIds: allIdsProductsReducer,
} );

export const entitiesOrdersReducer = combineReducers( {
	byId: byIdOrdersReducer,
	allIds: allIdsOrdersReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	subscriptions: entitiesSubscriptionsReducer,
	products: entitiesProductsReducer,
	orders: entitiesOrdersReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	user: userReducer,
	entities: entitiesReducer,
	router: routerReducer,
} );

export default rootReducer;
