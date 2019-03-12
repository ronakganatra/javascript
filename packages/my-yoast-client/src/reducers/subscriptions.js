import {
	GET_ALL_SUBSCRIPTIONS_FAILURE,
	GET_ALL_SUBSCRIPTIONS_REQUEST,
	GET_ALL_SUBSCRIPTIONS_SUCCESS,
	ADD_LICENCES_MODAL_CLOSE,
	ADD_LICENCES_MODAL_OPEN,
	CANCEL_SUBSCRIPTION_FAILURE,
	CANCEL_SUBSCRIPTION_SUCCESS,
	CANCEL_SUBSCRIPTION_REQUEST,
	CANCEL_SUBSCRIPTION_MODAL_OPEN,
	CANCEL_SUBSCRIPTION_MODAL_CLOSE,
} from "../actions/subscriptions";
import { SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_REMOVE_SUBSCRIPTION_SUCCESS } from "../actions/site";
import _union from "lodash/union";
import { LOCATION_CHANGE } from "react-router-redux";

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
			requesting: false,
			error: "",
		},
		addSubscriptionModal: {
			storeUrl: null,
			modalOpen: false,
		},
		subscriptionsCancel: {
			modalOpen: false,
			error: null,
			loading: false,
			success: false,
		},
	},
};

/*
 * Reducers
 */

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
				requesting: true,
				error: "",
			} );
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			return Object.assign( {}, state, {
				requesting: false,
			} );
		case GET_ALL_SUBSCRIPTIONS_FAILURE:
			return Object.assign( {}, state, {
				requesting: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the ui addSubscriptionModal object.
 *
 * @param {Object} state The current state of the ui addSubscriptionModal object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui addSubscriptionModal object.
 */
export function uiAddSubscriptionModalReducer( state = rootState.ui.addSubscriptionModal, action ) {
	switch ( action.type ) {
		case ADD_LICENCES_MODAL_OPEN:
			return Object.assign( {}, state, {
				storeUrl: action.storeUrl,
				modalOpen: true,
			} );
		case ADD_LICENCES_MODAL_CLOSE:
			return Object.assign( {}, state, {
				storeUrl: null,
				modalOpen: false,
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
	const subscriptions = Object.assign( {}, state );

	switch ( action.type ) {
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			action.subscriptions.forEach( ( subscription ) => {
				subscriptions[ subscription.id ] = Object.assign( {}, subscription, {
					orders: subscription.orders.map( order => order.id ),
				} );
			} );

			return subscriptions;

		case SITE_ADD_SUBSCRIPTION_SUCCESS:
			subscriptions[ action.subscriptionId ].used += 1;

			return subscriptions;

		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			subscriptions[ action.subscriptionId ].used -= 1;

			return subscriptions;

		default:
			return subscriptions;
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
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			return _union( state, action.subscriptions.map( subscription => subscription.id ) );
		default:
			return state;
	}
}

/* eslint-disable complexity */
/**
 * A reducer for the ui cancelSubscription object.
 *
 * @param {Object} state The current state of the cancelSubscription object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated cancelSubscription object.
 */
export function uiCancelSubscriptionsReducer( state = rootState.ui.subscriptionsCancel, action ) {
	switch ( action.type ) {
		case CANCEL_SUBSCRIPTION_MODAL_OPEN:
			return Object.assign( {}, state, {
				modalOpen: true,
			} );
		case CANCEL_SUBSCRIPTION_MODAL_CLOSE:
			return Object.assign( {}, state, {
				modalOpen: false,
			} );
		case LOCATION_CHANGE:
			return Object.assign( {}, state, {
				modalOpen: false,
			} );
		case CANCEL_SUBSCRIPTION_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: null,
				success: false,
			} );
		case CANCEL_SUBSCRIPTION_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				error: null,
				success: true,
				modalOpen: false,
			} );
		case CANCEL_SUBSCRIPTION_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
				success: false,
			} );
		default:
			return state;
	}
}
/* eslint-enable complexity */
