/* Internal dependencies */
import { createSelector } from "reselect";
import {
	createAllOfEntitySelector,
	createEntityByIdSelector,
	createEntityStateSelector,
} from "./factories";
import { capitalizeFirstLetter } from "../../functions/stringHelpers";
import { getSearchQuery } from "./search";

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
 * Returns the orders with a status indicating payment has been provided at some point.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The paid orders.
 */
export const getPaidOrders = createSelector(
	getOrders,
	orders => orders.filter( ( order ) => {
		return [ "completed", "processing", "refunded" ].includes( order.status );
	} )
);

/**
 * Returns the orders to show on the orders page. Alongside the data necessary there.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of orders to show on the orders page.
 */
export const getOrdersPageOrders = createSelector(
	getPaidOrders,
	orders => orders.map( order => {
		return {
			id: order.id,
			orderNumber: order.invoiceNumber,
			date: new Date( order.date ),
			total: order.totalAmount,
			status: capitalizeFirstLetter( order.status ),
			items: order.items,
			currency: order.currency,
		};
	} )
);

/**
 * Returns the orders for the orders page sorted by most recent date.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The sorted orders.
 */
export const getSortedOrdersPageOrders = createSelector(
	getOrdersPageOrders,
	orders => {
		return orders.sort( ( a, b ) => {
			return b.date - a.date;
		} );
	}
);

export const getFilteredOrdersPageOrders = createSelector(
	getSortedOrdersPageOrders,
	getSearchQuery,
	( orders, query ) => {
		if ( query.length > 0 ) {
			orders = orders.filter( ( order ) => {
				const formattedDate = new Intl.DateTimeFormat( "en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				} ).format( order.date );

				return order.items.find( item => item.productName.toUpperCase().includes( query.toUpperCase() ) ) ||
					order.orderNumber.toUpperCase().includes( query.toUpperCase() ) ||
					( order.total / 100 ).toString().includes( query ) ||
					formattedDate.toUpperCase().includes( query.toUpperCase() );
			} );
		}
		return orders;
	}
);
