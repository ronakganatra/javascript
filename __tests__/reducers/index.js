import { LINK_SITE_FAILURE } from "../../src/actions/sites";
import { uiReducer, entitiesSitesReducer, entitiesReducer, rootReducer, entitiesSubscriptionsReducer, entitiesProductsReducer, uiSiteReducer, entitiesCoursesReducer} from "../../src/reducers/index"
import { uiSiteSubscriptionsReducer, byIdSubscriptionsReducer, allIdsSubscriptionsReducer, uiAllSubscriptionsReducer } from "../../src/reducers/subscriptions";
import { GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../../src/actions/subscriptions";
import { uiSiteProductsReducer, byIdProductsReducer, allIdsProductsReducer, uiAllProductsReducer } from "../../src/reducers/products";
import { byIdProductGroupsReducer, allIdsProductGroupsReducer, uiAllProductGroupsReducer } from "../../src/reducers/productGroups";
import { allIdsCourseEnrollmentsReducer, byIdCourseEnrollmentsReducer, allIdsCoursesReducer, byIdCoursesReducer, RETRIEVE_COURSES_SUCCESS } from "../../src/reducers/courses";
import { GET_SITE_PRODUCTS_SUCCESS } from "../../src/actions/subscriptions";
import { uiSearch } from "../../src/reducers/search";
import { SEARCH_QUERY_CHANGE } from "../../src/actions/search";
import { allIdsReducer, byIdReducer, uiSitesReducer } from "../../src/reducers/sites";
import { userReducer } from "../../src/reducers/user";
import { CREATE_COMPOSER_TOKEN_REQUEST } from "../../src/actions/composerTokens";
import { allIdsComposerTokensReducer, byIdComposerTokensReducer } from "../../src/reducers/composerTokens";
import { entitiesComposerTokensReducer, entitiesProductGroupsReducer } from "../../src/reducers";
import { GET_PRODUCT_GROUPS_SUCCESS } from "../../src/actions/productGroups";

jest.mock( "../../src/reducers/sites.js", () => {
	return {
		uiSitesReducer: jest.fn( ( state = {} ) => { return { name: "uiSitesReducer" }; } ),
		byIdReducer: jest.fn( ( state = {} ) => { return { name: "byIdReducer" }; } ),
		allIdsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/user.js", () => {
	return {
		userReducer: jest.fn( ( state = {} ) => { return { name: "userReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/helpBeacon.js", () => {
	return {
		uiHelpBeaconModalReducer: jest.fn( ( state = {} ) => { return { name: "uiHelpBeaconModalReducer" }; } ),
	}
} );


jest.mock( "../../src/reducers/site.js", () => {
	return {
		getSiteSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "getSiteSubscriptionsReducer" }; } ),
		siteAddSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "siteAddSubscriptionsReducer" }; } ),
		uiSiteReducer: jest.fn( ( state = {} ) => { return { name: "uiSiteReducer" }; } ),
		byIdSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSubscriptionsReducer" }; } ),
		allIdsSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSubscriptionsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/subscriptions.js", () => {
	return {
		byIdSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "byIdSubscriptionsReducer" }; } ),
		allIdsSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsSubscriptionsReducer" }; } ),
		uiAllSubscriptionsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllSubscriptionsReducer" }; } ),
		uiAddSubscriptionModalReducer: jest.fn( ( state = {} ) => { return { name: "uiAddSubscriptionModalReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/refunds.js", () => {
	return {
		allIdsRefundsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsRefundsReducer" }; } ),
		byIdRefundsReducer: jest.fn( ( state = {} ) => { return { name: "byIdRefundsReducer" }; } ),
		uiRefundsReducer: jest.fn( ( state = {} ) => { return { name: "uiRefundsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/invoices.js", () => {
	return {
		uiInvoicesReducer: jest.fn( ( state = {} ) => { return { name: "uiInvoicesReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/courses.js", () => {
	return {
		allIdsCourseEnrollmentsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsCourseEnrollmentsReducer" }; } ),
		byIdCourseEnrollmentsReducer: jest.fn( ( state = {} ) => { return { name: "byIdCourseEnrollmentsReducer" }; } ),
		allIdsCoursesReducer: jest.fn( ( state = {} ) => { return { name: "allIdsCoursesReducer" }; } ),
		byIdCoursesReducer: jest.fn( ( state = {} ) => { return { name: "byIdCoursesReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/products.js", () => {
	return {
		byIdProductsReducer: jest.fn( ( state = {} ) => { return { name: "byIdProductsReducer" }; } ),
		allIdsProductsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsProductsReducer" }; } ),
		uiAllProductsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllProductsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/productGroups.js", () => {
	return {
		byIdProductGroupsReducer: jest.fn( ( state = {} ) => { return { name: "byIdProductGroupsReducer" }; } ),
		allIdsProductGroupsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsProductGroupsReducer" }; } ),
		uiAllProductGroupsReducer: jest.fn( ( state = {} ) => { return { name: "uiAllProductGroupsReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/composerTokens.js", () => {
	return {
		byIdComposerTokensReducer: jest.fn( ( state = {} ) => { return { name: "byIdComposerTokensReducer" }; } ),
		allIdsComposerTokensReducer: jest.fn( ( state = {} ) => { return { name: "allIdsComposerTokensReducer" }; } ),
		uiComposerTokensReducer: jest.fn( ( state = {} ) => { return { name: "uiComposerTokensReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/configurationServiceRequest.js", () => {
	return {
		byIdConfigurationServiceRequestsReducer: jest.fn( ( state = {} ) => { return { name: "byIdConfigurationServiceRequestsReducer" }; } ),
		allIdsConfigurationServiceRequestsReducer: jest.fn( ( state = {} ) => { return { name: "allIdsConfigurationServiceRequestsReducer" }; } ),
		uiConfigurationServiceRequestReducer: jest.fn( ( state = {} ) => { return { name: "uiConfigurationServiceRequestReducer" }; } ),
	}
} );

jest.mock( "../../src/reducers/newsletter.js", () => {
	return {
		uiNewsletterReducer: jest.fn( ( state = {} ) => { return { name: "uiNewsletterReducer" }; } ),
	}
} );

test( 'ui reducer', () => {
	const state = { addSubscriptionModal: {}, sites: {}, site: { name: "uiSiteReducer", }, search: {}, orders: {}, subscriptions: {}, products: {}, newsletter: {}, login: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = {
		"activate": { "activationError": null, "loading": false },
		"addSubscriptionModal": { "name": "uiAddSubscriptionModalReducer" },
		"composerTokens": { "name": "uiComposerTokensReducer" },
		"configurationServiceRequests": { "name": "uiConfigurationServiceRequestReducer" },
		"helpBeaconModal": { "name": "uiHelpBeaconModalReducer" },
		"home": {
			"blogFeed": {
				"items": [],
			},
			"retrievingFeed": true,
			"blogFeedErrorFound": false,
			"blogFeedError": null,
		},
		"invoiceModal": { "name": "uiInvoicesReducer" },
		"login": {},
		"newsletter": { "name": "uiNewsletterReducer" },
		"orders": {},
		"products": { "name": "uiAllProductsReducer" },
		"productGroups": { "name": "uiAllProductGroupsReducer" },
		"refunds": { "name": "uiRefundsReducer" },
		"resetPassword": {
			"error": null,
			"loading": false,
			"passwordRequestSent": false,
			"passwordResetSuccess": false,
			"submitErrors": null
		},
		"search": { "query": "" },
		"signup": { "error": null, "loading": false, "signupRequestSuccess": false },
		"site": { "name": "uiSiteReducer" },
		"sites": { "name": "uiSitesReducer" },
		"subscriptions": { "name": "uiAllSubscriptionsReducer" }
	};


	const actual = uiReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( uiSitesReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities courses reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: RETRIEVE_COURSES_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsCoursesReducer"}, byId: { name: "byIdCoursesReducer" } };
	const actual = entitiesCoursesReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdCoursesReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsCoursesReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities composerTokens reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: CREATE_COMPOSER_TOKEN_REQUEST,
	};
	const expected = { allIds: { name: "allIdsComposerTokensReducer"}, byId: { name: "byIdComposerTokensReducer" } };
	const actual = entitiesComposerTokensReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdComposerTokensReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsComposerTokensReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities site reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = { allIds: { name: "allIdsReducer"}, byId: { name: "byIdReducer" } };
	const actual = entitiesSitesReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities subscriptions reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: GET_SITE_SUBSCRIPTIONS_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsSubscriptionsReducer"}, byId: { name: "byIdSubscriptionsReducer" } };
	const actual = entitiesSubscriptionsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsSubscriptionsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities products reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: GET_SITE_PRODUCTS_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsProductsReducer"}, byId: { name: "byIdProductsReducer" } };
	const actual = entitiesProductsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdProductsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsProductsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities productGroups reducer', () => {
	const state = { allIds: {}, byId: {} };
	const action = {
		type: GET_PRODUCT_GROUPS_SUCCESS,
	};
	const expected = { allIds: { name: "allIdsProductGroupsReducer"}, byId: { name: "byIdProductGroupsReducer" } };
	const actual = entitiesProductGroupsReducer( state, action );
	expect( actual ).toEqual( expected );
	expect( byIdProductGroupsReducer ).toHaveBeenCalledWith( {}, action );
	expect( allIdsProductGroupsReducer ).toHaveBeenCalledWith( {}, action );
} );

test( 'entities reducer', () => {
	const state = { sites: { allIds: {}, byId: {} }, composerTokens: { allIds: {}, byId: {} }, subscriptions: { allIds: {}, byId: {} }, courses: { allIds: {}, byId: {} } };
	const action = {
		type: LINK_SITE_FAILURE,
	};

	const expected = {
		composerTokens: { allIds: { name: "allIdsComposerTokensReducer" }, byId: { name: "byIdComposerTokensReducer" } },
		sites: { allIds: { name: "allIdsReducer" }, byId: { name: "byIdReducer" } },
		subscriptions: { allIds: { name: "allIdsSubscriptionsReducer" }, byId: { name: "byIdSubscriptionsReducer"} },
		products: { allIds: { name: "allIdsProductsReducer" }, byId: { name: "byIdProductsReducer" } },
		productGroups: { allIds: { name: "allIdsProductGroupsReducer" }, byId: { name: "byIdProductGroupsReducer" } },
		refunds: { allIds: { name: "allIdsRefundsReducer" }, byId: { name: "byIdRefundsReducer" } },
		orders: { allIds: [], byId: {} },
		courses: { byId: { name: "byIdCoursesReducer" }, allIds: { name: "allIdsCoursesReducer" } },
		courseEnrollments: { byId: { name: "byIdCourseEnrollmentsReducer" }, allIds: { name: "allIdsCourseEnrollmentsReducer" } },
		configurationServiceRequests: { byId: { name: "byIdConfigurationServiceRequestsReducer" }, allIds: { name: "allIdsConfigurationServiceRequestsReducer" } },
	};

	const actual = entitiesReducer( state, action );
	expect( actual ).toEqual( expected );
} );

test( 'ui reducer with search input', () => {
	const state = { query: "" };
	const action = {
		type: SEARCH_QUERY_CHANGE,
		query: "teststring",
	};
	const expected = { query: "teststring" };
	const actual = uiSearch( state, action );
	expect( actual ).toEqual( expected );
} );

test( 'root reducer with LINK_SITE_FAILURE action', () => {
	const state = { user: {}, router: { location: "URL" } };
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = {
		"entities": {
			"composerTokens": {
				"allIds": { "name": "allIdsComposerTokensReducer" },
				"byId": { "name": "byIdComposerTokensReducer" }
			},
			"configurationServiceRequests": {
				"allIds": { "name": "allIdsConfigurationServiceRequestsReducer" },
				"byId": { "name": "byIdConfigurationServiceRequestsReducer" }
			},
			"courses": { "allIds": { "name": "allIdsCoursesReducer" }, "byId": { "name": "byIdCoursesReducer" } },
			"courseEnrollments": {
				"allIds": { "name": "allIdsCourseEnrollmentsReducer" },
				"byId": { "name": "byIdCourseEnrollmentsReducer" }
			},
			"orders": { "allIds": [], "byId": {} },
			"products": { "allIds": { "name": "allIdsProductsReducer" }, "byId": { "name": "byIdProductsReducer" } },
			"productGroups": { "allIds": { "name": "allIdsProductGroupsReducer" }, "byId": { "name": "byIdProductGroupsReducer" } },
			"refunds": { "allIds": { "name": "allIdsRefundsReducer" }, "byId": { "name": "byIdRefundsReducer" } },
			"sites": { "allIds": { "name": "allIdsReducer" }, "byId": { "name": "byIdReducer" } },
			"subscriptions": {
				"allIds": { "name": "allIdsSubscriptionsReducer" },
				"byId": { "name": "byIdSubscriptionsReducer" }
			}
		},
		"router": { "location": "URL" },
		"ui": {
			"activate": { "activationError": null, "loading": false },
			"addSubscriptionModal": { "name": "uiAddSubscriptionModalReducer" },
			"composerTokens": { "name": "uiComposerTokensReducer" },
			"configurationServiceRequests": { "name": "uiConfigurationServiceRequestReducer" },
			"helpBeaconModal": { "name": "uiHelpBeaconModalReducer" },
			"home": {
				"blogFeed": {
					"items": [],
				},
				"retrievingFeed": true,
				"blogFeedErrorFound": false,
				"blogFeedError": null,
			},
			"invoiceModal": { "name": "uiInvoicesReducer" },
			"login": {
				"amountOfOTPWarnings": 0,
				"error": null,
				"loading": false,
				"oauthError": false,
				"requireOTP": false
			},
			"newsletter": { "name": "uiNewsletterReducer" },
			"orders": { "error": "", "retrievingOrders": false },
			"products": { "name": "uiAllProductsReducer" },
			"productGroups": { "name": "uiAllProductGroupsReducer" },
			"refunds": { "name": "uiRefundsReducer" },
			"resetPassword": {
				"error": null,
				"loading": false,
				"passwordRequestSent": false,
				"passwordResetSuccess": false,
				"submitErrors": null
			},
			"search": { "query": "" },
			"signup": { "error": null, "loading": false, "signupRequestSuccess": false },
			"site": { "name": "uiSiteReducer" },
			"sites": { "name": "uiSitesReducer" },
			"subscriptions": { "name": "uiAllSubscriptionsReducer" }
		},
		"user": { "name": "userReducer" }
	};

const actual = rootReducer( state, action );
	expect( actual ).toEqual( expected );
} );
