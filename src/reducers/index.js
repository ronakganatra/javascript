import { userReducer } from "./user";
import { combineReducers } from "redux";
import { uiSitesReducer, byIdReducer, allIdsReducer } from "./sites.js";
import { byIdCoursesReducer, allIdsCoursesReducer, uiCoursesReducer, uiCoursesEnrollmentsReducer,
	byIdCoursesEnrollmentsReducer, allIdsCoursesEnrollmentsReducer, uiCourseInviteModalReducer } from "./courses.js";
import { uiSiteReducer } from "./site.js";
import { routerReducer } from "react-router-redux";
import { uiCancelSubscriptionsReducer, allIdsSubscriptionsReducer, byIdSubscriptionsReducer, uiAllSubscriptionsReducer, uiAddSubscriptionModalReducer } from "./subscriptions.js";
import { allIdsProductsReducer, byIdProductsReducer, uiAllProductsReducer } from "./products.js";
import { uiOrdersReducer, byIdOrdersReducer, allIdsOrdersReducer } from "./orders";
import { uiHelpBeaconModalReducer } from "./helpBeacon";
import { uiSearch } from "./search.js";
import { uiCourseInviteRequestReducer } from "./courses";
import { allIdsRefundsReducer, byIdRefundsReducer, uiRefundsReducer } from "./refunds";
import { allIdsComposerTokensReducer, byIdComposerTokensReducer, uiComposerTokensReducer } from "./composerTokens";
import { uiInvoicesReducer } from "./invoices";
import { uiConfigurationServiceRequestReducer, allIdsConfigurationServiceRequestsReducer, byIdConfigurationServiceRequestsReducer } from "./configurationServiceRequest";
import { uiNewsletterReducer } from "./newsletter";
import { uiResetPasswordReducer } from "./resetPassword";
import { uiLoginReducer } from "./login";


export const uiReducer = combineReducers( {
	sites: uiSitesReducer,
	site: uiSiteReducer,
	search: uiSearch,
	subscriptions: uiAllSubscriptionsReducer,
	subscriptionsCancel: uiCancelSubscriptionsReducer,
	courses: uiCoursesReducer,
	coursesEnrollments: uiCoursesEnrollmentsReducer,
	courseInviteModal: uiCourseInviteModalReducer,
	courseInviteRequest: uiCourseInviteRequestReducer,
	products: uiAllProductsReducer,
	orders: uiOrdersReducer,
	invoiceModal: uiInvoicesReducer,
	refunds: uiRefundsReducer,
	addSubscriptionModal: uiAddSubscriptionModalReducer,
	helpBeaconModal: uiHelpBeaconModalReducer,
	composerTokens: uiComposerTokensReducer,
	configurationServiceRequests: uiConfigurationServiceRequestReducer,
	newsletter: uiNewsletterReducer,
	resetPassword: uiResetPasswordReducer,
	login: uiLoginReducer,
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

export const entitiesRefundsReducer = combineReducers( {
	byId: byIdRefundsReducer,
	allIds: allIdsRefundsReducer,
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

export const entitiesConfigurationServiceRequestsReducer = combineReducers( {
	byId: byIdConfigurationServiceRequestsReducer,
	allIds: allIdsConfigurationServiceRequestsReducer,
} );

export const entitiesReducer = combineReducers( {
	sites: entitiesSitesReducer,
	subscriptions: entitiesSubscriptionsReducer,
	courses: entitiesCoursesReducer,
	coursesEnrollments: entitiesCoursesEnrollmentsReducer,
	products: entitiesProductsReducer,
	orders: entitiesOrdersReducer,
	refunds: entitiesRefundsReducer,
	composerTokens: entitiesComposerTokensReducer,
	configurationServiceRequests: entitiesConfigurationServiceRequestsReducer,
} );

export const rootReducer = combineReducers( {
	ui: uiReducer,
	user: userReducer,
	entities: entitiesReducer,
	router: routerReducer,
} );

export default rootReducer;
