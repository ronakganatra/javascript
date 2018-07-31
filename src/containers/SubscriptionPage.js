import { connect } from "react-redux";
import SubscriptionPage from "../components/SubscriptionPage";
import { getAllSubscriptions } from "../actions/subscriptions";
import { getOrders } from "../actions/orders";
import _isUndefined from "lodash/isUndefined";

export const mapStateToProps = ( state, ownProps ) => {
	let subscriptionId = ownProps.match.params.id;

	let subscription = state.entities.subscriptions.byId[ subscriptionId ];

	if ( _isUndefined( subscription ) ) {
		return {
			isLoading: true,
		};
	}

	let orders = subscription.orders.map( order => state.entities.orders.byId[ order ] );

	// If some orders are undefined we are still waiting for some data.
	if ( orders.filter( order => !! order ).length !== orders.length ) {
		return {
			isLoading: true,
		};
	}

	orders = orders.map( order => {
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

	return {
		subscription,
		orders,
	};
};

const getOrdersAndSubscriptions = ( dispatch ) => {
	return ( dispatch ) => {
		dispatch( getOrders() );
		dispatch( getAllSubscriptions() );
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( getOrdersAndSubscriptions( dispatch ) );

	return {};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
