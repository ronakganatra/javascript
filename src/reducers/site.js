import { SITE_TOGGLE_SUBSCRIPTION_REQUEST, SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_REMOVE_SUBSCRIPTION_SUCCESS, SITE_TOGGLE_SUBSCRIPTION_FAILURE, SITE_REMOVE_START } from "../actions/site";

/**
 * Initial state
 */

const rootState = {
	ui: {
		site: {
			subscriptions: {
				toggling: false,
				error: "",
			},
			removing: false,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the site add subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated state.
 */
export function uiSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case SITE_TOGGLE_SUBSCRIPTION_REQUEST:
			return Object.assign( {}, state, {
				toggling: true,
				error: "",
			} );
		case SITE_ADD_SUBSCRIPTION_SUCCESS:
		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			return Object.assign( {}, state, {
				toggling: false,
			} );
		case SITE_TOGGLE_SUBSCRIPTION_FAILURE:
			return Object.assign( {}, state, {
				toggling: false,
				error: action.addingSubscriptionError,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for global site actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated state.
 */
export function uiSiteReducer( state = rootState.ui.site, action ) {
	switch ( action.type ) {
		case SITE_REMOVE_START:
			return Object.assign( {}, state, {
				removing: true,
			} );
		default:
			return state;
	}
}
