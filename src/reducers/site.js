import { GET_SITE_SUBSCRIPTIONS_FAILURE, GET_SITE_SUBSCRIPTIONS_REQUEST, GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../actions/subscriptions";
import { SITE_ADD_SUBSCRIPTION_REQUEST, SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_ADD_SUBSCRIPTION_FAILURE } from "../actions/site";

/**
 * Initial state
 */

const rootState = {
	ui: {
		site: {
			subscriptions: {
				retrievingSiteSubscriptions: false,
				addingSubscription: false,
				error: "",
				active: [],
			},
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the get site subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Site object.
 */
export function getSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_REQUEST:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: true,
				error: "",
			} );
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: false,
			} );
		case GET_SITE_SUBSCRIPTIONS_FAILURE:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: false,
				error: action.getSiteSubscriptionsError,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the site add subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Site object.
 */
export function siteAddSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case SITE_ADD_SUBSCRIPTION_REQUEST:
			return Object.assign( {}, state, {
				addingSubscription: true,
				error: "",
			} );
		case SITE_ADD_SUBSCRIPTION_SUCCESS:
			return Object.assign( {}, state, {
				addingSubscription: false,
				active: state.active.concat( [ action.active ] ),
			} );
		case SITE_ADD_SUBSCRIPTION_FAILURE:
			return Object.assign( {}, state, {
				addingSubscription: false,
				error: action.addingSubscriptionError,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the site object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Site object.
 */
export function uiSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	return siteAddSubscriptionsReducer( getSiteSubscriptionsReducer( state, action ), action );
}
