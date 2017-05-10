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

	let invoices = subscription.orders.map( order => state.entities.orders.byId[ order ] );

	// If some invoices are undefined we are still waiting for some data.
	if ( invoices.filter( invoice => !! invoice ).length !== invoices.length ) {
		return {
			isLoading: true,
		};
	}

	invoices = invoices.map( order => {
		return {
			invoiceId: order.id,
			invoiceDate: new Date( order.date ),
			invoiceCurrency: order.currency,
			invoiceAmount: order.totalAmount,
		};
	} );

	return {
		subscription,
		invoices,
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

	return {
		onAddSite: () => {},
		onShop: () => {},
		onCancel: () => {},
		onInvoiceDownload: () => {},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
