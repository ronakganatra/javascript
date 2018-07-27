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
import isEmpty from "lodash/isEmpty";

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
	if ( orders.filter( order => ! ! order ).length !== orders.length ) {
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

	if ( state.ui.sites.retrievingSites ) {
		return {
			isLoading: true,
		};
	}

	let sites = [];
	let siteIds = state.entities.sites.allIds;
	if ( isEmpty( siteIds ) === false ) {
		sites = siteIds
			.map( siteId => state.entities.sites.byId[ siteId ] )
			.filter( site => site.subscriptions.includes( subscription.id ) );
	}

	let cancelSubscriptionState = {
		cancelModalOpen: state.ui.subscriptionsCancel.modalOpen,
		cancelLoading: state.ui.subscriptionsCancel.loading,
		cancelSuccess: state.ui.subscriptionsCancel.success,
		cancelError: state.ui.subscriptionsCancel.error,
	};

	return Object.assign( {}, { subscription, orders, sites }, cancelSubscriptionState );
};

const getData = () => {
	return ( dispatch ) => {
		dispatch( getOrders() );
		dispatch( getAllSubscriptions() );
		dispatch( retrieveSites() );
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	dispatch( getData() );

	return {
		cancelSubscription: ( subscriptionId ) => {
			dispatch( cancelSubscription( subscriptionId ) );
		},
		openCancelModal: () => {
			dispatch( openCancelSubscriptionModal() );
		},
		closeCancelModal: () => {
			dispatch( closeCancelSubscriptionModal() );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
