import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import OrderPage from "../components/OrderPage";
import { getApiUrl } from "../functions/api";
import { getAccessToken } from "../functions/auth";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.orders.allIds;

	let orders = allIds.map( ( orderId ) => {
		let order = state.entities.orders.byId[ orderId ];

		let orderProps = {
			id: order.id,
			orderNumber: "Order #",
			date: new Date( order.date ),
			total: order.totalAmount,
			currency: "USD",
			status: "completed",
			items: "Order items...",
		};

		return orderProps;
	} );

	let query = state.ui.search.query;
	if ( query.length > 0 ) {
		orders = orders.filter( ( order ) => {
			return order.items.toUpperCase().includes( query.toUpperCase() ) ||
						 order.orderNumber.toUpperCase().includes( query.toUpperCase() );
		} );
	}

	let searchProps = {
		query: query,
	};

	return {
		orders,
		searchProps,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onClickInvoice: ( orderId ) => {
			document.location = getApiUrl() + "/Orders/" + orderId + "/invoice?accessToken=" + getAccessToken();
		},
		searchProps: {
			onChange: ( query ) => {
				dispatch( onSearchQueryChange( query ) );
			},
		},
	};
};

const OrdersPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( OrderPage );

export default OrdersPageContainer;
