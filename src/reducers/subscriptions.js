import { GET_ALL_SUBSCRIPTIONS_FAILURE, GET_ALL_SUBSCRIPTIONS_REQUEST, GET_ALL_SUBSCRIPTIONS_SUCCESS,
	ADD_LICENCES_POPUP_CLOSE, ADD_LICENCES_POPUP_OPEN } from "../actions/subscriptions";
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
			requesting: false,
			error: "",
			addLicensesPopupOpen: false,

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
		case ADD_LICENCES_POPUP_OPEN:
			return Object.assign( {}, state, {
				addLicensesPopupOpen: true,
			} );
		case ADD_LICENCES_POPUP_CLOSE:
			return Object.assign( {}, state, {
				addLicensesPopupOpen: false,
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
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			subscriptions = Object.assign( {}, state );

			action.subscriptions.forEach( ( subscription ) => {
				subscriptions[ subscription.id ] = Object.assign( {}, subscription, {
					orders: subscription.orders.map( order => order.id ),
				} );
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
		case GET_ALL_SUBSCRIPTIONS_SUCCESS:
			return _union( state, action.subscriptions.map( subscription => subscription.id ) );
		default:
			return state;
	}
}
