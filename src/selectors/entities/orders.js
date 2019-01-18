/* Internal dependencies */
import {
	createAllOfEntitySelector,
	createEntityByIdSelector,
	createEntityStateSelector,
} from "./factories";

/* External dependencies */
import { createSelector } from "reselect";
import _filter from "lodash/filter";

/**
 * Returns the full state of all orders.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The full state of all orders.
 */
export const getOrdersState = createEntityStateSelector( "orders" );

/**
 * Returns all orders in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All orders.
 */
export const getOrders = createAllOfEntitySelector( "orders" );

/**
 * Returns a map of all orders in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} A map of all orders.
 */
export const getOrdersById = createEntityByIdSelector( "orders" );

/**
 * Filters out the orders that have a certain status from the state.
 *
 * @param {String} status The status that the orders need to have.
 *
 * @returns {Array} An array of orders that match the provided status.
 */
export const filterOrdersByStatus = ( status ) => createSelector(
	[ getOrdersById ],
	( orders ) => {
		return _filter( orders, { status: status } );
	}
);

/**
 * Gets all orders with status "completed".
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of all orders with status completed.
 */
export const getCompletedOrders = filterOrdersByStatus( "completed" );
