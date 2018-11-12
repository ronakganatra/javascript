import { connect } from "react-redux";
import SubscriptionPage from "../components/SubscriptionPage";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
	getAllSubscriptions,
	openCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getOrders } from "../actions/orders";
import _isUndefined from "lodash/isUndefined";
import { retrieveSites } from "../actions/sites";
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import { getSubscription } from "../selectors/subscriptions";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state, ownProps ) => {
	const selectedSubscriptionId = ownProps.match.params.id;

	const selectedSubscription = getSubscription( state, selectedSubscriptionId );

	if ( _isUndefined( selectedSubscription ) || state.ui.subscriptions.requesting || state.ui.sites.retrievingSites ) {
		return {
			isLoading: true,
		};
	}

	let orders = selectedSubscription.orders.map( order => state.entities.orders.byId[ order ] );

	// If some orders are undefined we are still waiting for some data.
	if ( orders.filter( order => ! ! order ).length !== orders.length ) {
		return {
			isLoading: true,
		};
	}

	orders = orders
		.map( order => {
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
		.filter( ( order ) => {
			return order.status === "Completed" || order.status === "Processing" || order.status === "Refunded";
		} );

	return {
		subscription: selectedSubscription,
		orders,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			// Fetch required model data.
			dispatch( getOrders() );
			dispatch( getAllSubscriptions() );
			dispatch( retrieveSites() );
		},
		openCancelModal: () => {
			dispatch( openCancelSubscriptionModal() );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
