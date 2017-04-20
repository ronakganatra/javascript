import { GET_SITE_SUBSCRIPTIONS_REQUEST, GET_SITE_SUBSCRIPTIONS_SUCCESS, GET_SITE_SUBSCRIPTIONS_FAILURE,
	GET_ALL_SUBSCRIPTIONS_FAILURE, GET_ALL_SUBSCRIPTIONS_REQUEST, GET_ALL_SUBSCRIPTIONS_SUCCESS } from "../actions/subscriptions";
import _union from "lodash/union";

/*
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
		subscriptions: {
			requestingAllSubscriptions: false,
			error: "",
		},
	},
};

/*
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
				requestingSiteSubscriptions: true,
				error: "",
			} );
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
			return Object.assign( {}, state, {
				requestingSiteSubscriptions: false,
			} );
		case GET_SITE_SUBSCRIPTIONS_FAILURE:
			return Object.assign( {}, state, {
				requestingSiteSubscriptions: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the ui subscriptions object.
 *
 * @param {Object} state The current state of the ui subscriptions object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui subscription object.
 */
export function uiAllSubscriptionsReducer( state = rootState.ui.subscriptions, action ) {
	switch ( action.type ) {
		case GET_ALL_SUBSCRIPTIONS_REQUEST:
			return Object.assign( {}, state, {
				requestingAllSubscriptions: true,
				error: "",
			} );
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			return Object.assign( {}, state, {
				requestingAllSubscriptions: false,
	} );
		case GET_ALL_SUBSCRIPTIONS_FAILURE:
			return Object.assign( {}, state, {
				requestingAllSubscriptions: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdSubscriptions object.
 *
 * @param {Object} state The current state of the byIdSubscriptions object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdSubscriptions object.
 */
export function byIdSubscriptionsReducer( state = rootState.entities.subscriptions.byId, action ) {
	let subscriptions;

	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
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
 * A reducer for the allIdsSubscriptions array.
 *
 * @param {Array} state The current state of the allIdsSubscriptions array.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsSubscriptions array.
 */
export function allIdsSubscriptionsReducer( state = rootState.entities.subscriptions.allIds, action ) {
	switch ( action.type ) {
		case GET_SITE_SUBSCRIPTIONS_SUCCESS:
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			return _union( state, action.subscriptions.map( subscription => subscription.id ) );
		default:
			return state;
	}
}
