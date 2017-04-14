import {
	GET_ORDERS_REQUEST,
	GET_ORDERS_SUCCESS,
	GET_ORDERS_FAILURE
} from "../actions/orders";
import _union from "lodash/union";

/**
 * Initial state
 */
const rootState = {
	entities: {
		orders: {
			byId: {},
			allIds: [],
		}
	},
	ui: {
		orders: {
			retrievingOrders: false,
			error: "",
		}
	}
};

/**
 * Reducers
 */

/**
 * A reducer for the orders object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Orders object.
 */
export function uiOrdersReducer( state = rootState.ui.orders, action ) {
	switch ( action.type ) {
		case GET_ORDERS_REQUEST:
			return Object.assign( {}, state, {
				retrievingOrders: true,
				error: "",
			} );
		case GET_ORDERS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingOrders: false,
			} );
		case GET_ORDERS_FAILURE:
			return Object.assign( {}, state, {
				retrievingOrders: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdOrdersReducer list.
 *
 * @param {Object} state The current state of the byIdOrdersReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdOrdersReducer object.
 */
export function byIdOrdersReducer( state = rootState.entities.orders.byId, action ) {
	let orders;

	switch ( action.type ) {
		case GET_ORDERS_SUCCESS:
			orders = Object.assign( {}, state );

			action.orders.forEach( ( order ) => {
				orders[ order.id ] = order;
			} );

			return orders;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsOrdersReducer list.
 *
 * @param {Array} state The current state of the allIdsOrdersReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsOrdersReducer array.
 */
export function allIdsOrdersReducer( state = rootState.entities.orders.allIds, action ) {
	switch ( action.type ) {
		case GET_ORDERS_SUCCESS:
			return _union( state, action.orders.map( order => order.id ) );
		default:
			return state;
	}
}
