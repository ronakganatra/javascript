import { GET_SITE_SUBSCRIPTIONS_REQUEST, GET_SITE_SUBSCRIPTIONS_SUCCESS, GET_SITE_SUBSCRIPTIONS_FAILURE } from "../actions/subscriptions";

/**
 * Initial state
 */

const rootState = {
	entities: {
		subscriptions: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		site: {
			subscriptions: {
				retrievingSiteSubscriptions: false,
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
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Sites object.
 */
export function uiSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_REQUEST:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: true,
			} );
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: false,
			} );
		case GET_SITE_SUBSCRIPTIONS_FAILURE:
			return Object.assign( {}, state, {
				retrievingSiteSubscriptions: false,
				error: action.message,
			} );
		default:
			return state;
	}
}
