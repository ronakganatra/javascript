/* External dependencies */
import { connect } from "react-redux";

/* Internal dependencies */
import { onSearchQueryChange } from "../actions/search";
import { getOrders } from "../actions/orders";
import OrderPage from "../components/OrderPage";
import { getRefunds } from "../actions/refunds";
import { getSearchQuery } from "../selectors/entities/search";
import { getFilteredPaidOrders } from "../selectors/entities/orders";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const query = getSearchQuery( state );
	const orders = getFilteredPaidOrders( state );

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
