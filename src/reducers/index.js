import { userReducer } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { byIdCoursesReducer, allIdsCoursesReducer, uiCoursesReducer, uiCoursesEnrollmentsReducer,
	byIdCoursesEnrollmentsReducer, allIdsCoursesEnrollmentsReducer, uiCourseInviteModalReducer } from "./courses.js";
import { uiSiteReducer } from "./site.js";
import { routerReducer } from "react-router-redux";
import { allIdsSubscriptionsReducer, byIdSubscriptionsReducer, uiAllSubscriptionsReducer, uiAddSubscriptionModalReducer } from "./subscriptions.js";
import { allIdsProductsReducer, byIdProductsReducer, uiAllProductsReducer } from "./products.js";
import { uiOrdersReducer, byIdOrdersReducer, allIdsOrdersReducer } from "./orders";
import { uiHelpBeaconModalReducer } from "./helpBeacon";
import { uiSearch } from "./search.js";
import { uiCourseInviteRequestReducer } from "./courses";
import { allIdsComposerTokensReducer, byIdComposerTokensReducer, uiComposerTokensReducer } from "./composerTokens";

export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	site: uiSiteReducer,
	search: uiSearch,
	subscriptions: uiAllSubscriptionsReducer,
	courses: uiCoursesReducer,
	coursesEnrollments: uiCoursesEnrollmentsReducer,
	courseInviteModal: uiCourseInviteModalReducer,
	courseInviteRequest: uiCourseInviteRequestReducer,
	products: uiAllProductsReducer,
	orders: uiOrdersReducer,
	addSubscriptionModal: uiAddSubscriptionModalReducer,
	helpBeaconModal: uiHelpBeaconModalReducer,
	composerTokens: uiComposerTokensReducer,
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

export const entitiesCoursesReducer = combineReducers( {
	byId: byIdCoursesReducer,
	allIds: allIdsCoursesReducer,
} );

export const entitiesCoursesEnrollmentsReducer = combineReducers( {
	byId: byIdCoursesEnrollmentsReducer,
	allIds: allIdsCoursesEnrollmentsReducer,
} );

export const entitiesComposerTokensReducer = combineReducers( {
	byId: byIdComposerTokensReducer,
	allIds: allIdsComposerTokensReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	subscriptions: entitiesSubscriptionsReducer,
	courses: entitiesCoursesReducer,
	coursesEnrollments: entitiesCoursesEnrollmentsReducer,
	products: entitiesProductsReducer,
	orders: entitiesOrdersReducer,
	composerTokens: entitiesComposerTokensReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	user: userReducer,
	entities: entitiesReducer,
	router: routerReducer,
} );

export default rootReducer;
