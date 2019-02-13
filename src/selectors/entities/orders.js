/* External dependencies */
import { createSelector } from "reselect";

/* Internal dependencies */
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
 * Returns all orders in the state, sorted by date.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All orders, sorted by order date.
 */
export const getOrders = createSelector(
	createAllOfEntitySelector( "orders" ),
	orders => orders.sort( ( a, b ) => {
		return new Date( b.date ) -  new Date( a.date );
	} )
);

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
	orders => orders.filter( order => {
		return [ "completed", "processing", "refunded" ].includes( order.status );
	} )
);

/**
 * Factory for creating selectors with different order selectors, and filtering by query.
 *
 * @function
 *
 * @param {Function}   orderSelector The order selector to use in the resulting selector.
 *
 * @returns {Function}               The createSelector.
 */
function createFilteredOrderSelector( orderSelector ) {
	return createSelector(
		orderSelector,
		getSearchQuery,
		( orders, query ) => {
			if ( query.length > 0 ) {
				orders = orders.filter( order => {
					const formattedDate = new Intl.DateTimeFormat( "en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					} ).format( new Date( order.date ) );

					// Orders where one of productName, invoiceNumber, totalAmount or the date matches the query.
					return order.items.find( item => item.productName.toUpperCase().includes( query.toUpperCase() ) ) ||
						order.invoiceNumber.toUpperCase().includes( query.toUpperCase() ) ||
						( order.totalAmount / 100 ).toString().includes( query ) ||
						formattedDate.toUpperCase().includes( query.toUpperCase() );
				} );
			}
			return orders;
		}
	);
}

/**
 * Gets the orders from the state, filtered by the search query.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The orders, filtered by the search query.
 */
export const getFilteredOrders = createFilteredOrderSelector( getOrders );

/**
 * Returns the orders that were paid, filtered by the search query.
 *
 * @function
 *
 * @param {Object}  state Application state.
 *
 * @returns {Array}       The filtered paid orders.
 */
export const getFilteredPaidOrders = createFilteredOrderSelector( getPaidOrders );

/**
 * Gets the data required from the selected orders, and maps them to the props.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} An array of orders to show on the orders page.
 */
export const getOrdersPageProps = createSelector(
	getFilteredPaidOrders,
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
