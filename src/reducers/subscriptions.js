import { GET_SITE_SUBSCRIPTIONS_SUCCESS } from "../actions/subscriptions";
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
};

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
