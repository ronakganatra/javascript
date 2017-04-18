import { GET_SITE_SUBSCRIPTIONS_REQUEST, GET_SITE_SUBSCRIPTIONS_SUCCESS, GET_SITE_SUBSCRIPTIONS_FAILURE } from "../actions/subscriptions";
// import { GET_ALL_SUBSCRIPTIONS_FAILURE, GET_ALL_SUBSCRIPTIONS_REQUEST, GET_ALL_SUBSCRIPTIONS_SUCCESS } from "../actions/subscriptions";
import _union from "lodash/union";

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
				error: "",
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

/**
 * A reducer for the IdSitesSubscriptions object.
 *
 * @param {Object} state The current state of the IdSitesSubscriptions object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated IdSitesSubscriptions object.
 */
export function byIdSitesSubscriptionsReducer( state = rootState.entities.subscriptions.byId, action ) {
	let subscriptions;

	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
			subscriptions = Object.assign( {}, state );

			action.subscriptions.forEach( ( subscription ) => {
				subscriptions[ subscription.id ] = subscription;
			} );

			return subscriptions;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsSitesSubscriptions array.
 *
 * @param {Array} state The current state of the allIdsSitesSubscriptions array.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsSitesSubscriptions array.
 */
export function allIdsSitesSubscriptionsReducer( state = rootState.entities.subscriptions.allIds, action ) {
	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
			return _union( state, action.subscriptions.map( subscription => subscription.id ) );
		default:
			return state;
	}
}
