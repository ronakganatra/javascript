/* Internal dependencies */
import {
	createAllOfEntitySelector,
	createEntityByIdSelector,
	createEntityStateSelector,
} from "./factories";

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
