import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getOrders } from "../actions/orders";
import OrderPage from "../components/OrderPage";
import { getRefunds } from "../actions/refunds";
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import { getSearchQuery } from "../selectors/search";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const allIds = state.entities.orders.allIds;

	let orders = allIds.map( ( orderId ) => {
		const order = state.entities.orders.byId[ orderId ];

		order.status = capitalizeFirstLetter( order.status );

		return {
			id: order.id,
			orderNumber: order.invoiceNumber,
			date: new Date( order.date ),
			total: order.totalAmount,
			status: order.status,
			items: order.items,
			currency: order.currency,
		};
	} );

	// Only show completed, processing and refunded orders.
	orders = orders.filter( ( order ) => {
		return order.status === "Completed" || order.status === "Processing" || order.status === "Refunded";
	} );

	// Sort orders based on order date.
	orders = orders.sort( ( a, b ) => {
		return b.date - a.date;
	} );

	const query = getSearchQuery( state );
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

	return {
		orders,
		query,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		loadData: () => {
			dispatch( getOrders() );
			dispatch( getRefunds() );
		},
	};
};

const OrdersPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( OrderPage );

export default OrdersPageContainer;
