import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getOrders } from "../actions/orders";
import OrderPage from "../components/OrderPage";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.orders.allIds;

	let orders = allIds.map( ( orderId ) => {
		let order = state.entities.orders.byId[ orderId ];

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

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		console.log( orders );
		orders = orders.filter( ( order ) => {
			return order.items.find( item => item.productName.toUpperCase().includes( query.toUpperCase() ) ) ||
				order.orderNumber.toUpperCase().includes( query.toUpperCase() );
		} );
	}

	return {
		orders,
		query,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( getOrders() );

	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
	};
};

const OrdersPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( OrderPage );

export default OrdersPageContainer;
