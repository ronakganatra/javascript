import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getOrders } from "../actions/orders";
import OrderPage from "../components/OrderPage";
import { getRefunds } from "../actions/refunds";
import { getSearchQuery } from "../selectors/entities/search";
import { getSortedOrdersPageOrders } from "../selectors/entities/orders";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	let orders = getSortedOrdersPageOrders( state );

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
