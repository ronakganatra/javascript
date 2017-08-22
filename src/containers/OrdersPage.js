import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getOrders } from "../actions/orders";
import OrderPage from "../components/OrderPage";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.orders.allIds;

	let orders = allIds.map( ( orderId ) => {
		let order = state.entities.orders.byId[ orderId ];

		// Capitalize first letter in order status.
		order.status = order.status.charAt( 0 ).toUpperCase() + order.status.slice( 1 );

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

	// Only show completed orders.
	orders = orders.filter( ( order ) => {
		return order.status === "Completed" || order.status === "Processing" || order.status === "Refunded";
	} );

	// Sort orders based on order date.
	orders = orders.sort( ( a, b ) => {
		return b.date - a.date;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		orders = orders.filter( ( order ) => {
			let formattedDate = new Intl.DateTimeFormat( "en-US", {
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

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		loadData: () => dispatch( getOrders() ),
	};
};

const OrdersPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( OrderPage );

export default OrdersPageContainer;
