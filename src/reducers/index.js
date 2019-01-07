import { userReducer } from "./user";
import { combineReducers } from "redux";
import { uiNewsletterReducer } from "./newsletter";
import { uiResetPasswordReducer } from "./resetPassword";
import { uiLoginReducer } from "./login";
import { uiSignupReducer } from "./signup";
import { uiActivateReducer } from "./activate";
import { uiHomeReducer } from "./home";
import { uiSiteReducer } from "./site.js";
import { routerReducer } from "react-router-redux";
import { uiHelpBeaconModalReducer } from "./helpBeacon";
import { uiSearch } from "./search.js";
import { uiCourseInviteRequestReducer } from "./courses";
import { uiInvoicesReducer } from "./invoices";
import {
	allIdsReducer,
	byIdReducer,
	uiSitesReducer,
} from "./sites.js";
import {
	allIdsCourseEnrollmentsReducer,
	allIdsCoursesReducer,
	byIdCourseEnrollmentsReducer,
	byIdCoursesReducer,
	uiCourseInviteModalReducer,
	uiCourseEnrollmentsReducer,
	uiCoursesReducer,
} from "./courses.js";
import {
	allIdsSubscriptionsReducer,
	byIdSubscriptionsReducer,
	uiAddSubscriptionModalReducer,
	uiAllSubscriptionsReducer,
	uiCancelSubscriptionsReducer,
} from "./subscriptions.js";
import {
	allIdsProductsReducer,
	byIdProductsReducer,
	uiAllProductsReducer,
} from "./products.js";
import {
	allIdsOrdersReducer,
	byIdOrdersReducer,
	uiOrdersReducer,
} from "./orders";
import {
	allIdsRefundsReducer,
	byIdRefundsReducer,
	uiRefundsReducer,
} from "./refunds";
import {
	allIdsComposerTokensReducer,
	byIdComposerTokensReducer,
	uiComposerTokensReducer,
} from "./composerTokens";
import {
	allIdsConfigurationServiceRequestsReducer,
	byIdConfigurationServiceRequestsReducer,
	uiConfigurationServiceRequestReducer,
} from "./configurationServiceRequest";
import {
	allIdsProductGroupsReducer,
	byIdProductGroupsReducer,
	uiAllProductGroupsReducer,
} from "./productGroups";


export const uiReducer = combineReducers( {
	home: uiHomeReducer,
	sites: uiSitesReducer,
	site: uiSiteReducer,
	search: uiSearch,
	subscriptions: uiAllSubscriptionsReducer,
	subscriptionsCancel: uiCancelSubscriptionsReducer,
	courses: uiCoursesReducer,
	courseEnrollments: uiCourseEnrollmentsReducer,
	courseInviteModal: uiCourseInviteModalReducer,
	courseInviteRequest: uiCourseInviteRequestReducer,
	products: uiAllProductsReducer,
	productGroups: uiAllProductGroupsReducer,
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
	signup: uiSignupReducer,
	activate: uiActivateReducer,
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

export const entitiesProductGroupsReducer = combineReducers( {
	byId: byIdProductGroupsReducer,
	allIds: allIdsProductGroupsReducer,
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

export const entitiesCourseEnrollmentsReducer = combineReducers( {
	byId: byIdCourseEnrollmentsReducer,
	allIds: allIdsCourseEnrollmentsReducer,
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
	courseEnrollments: entitiesCourseEnrollmentsReducer,
	products: entitiesProductsReducer,
	productGroups: entitiesProductGroupsReducer,
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
