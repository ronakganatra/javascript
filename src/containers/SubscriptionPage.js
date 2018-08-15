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
	let selectedSubscriptionId = ownProps.match.params.id;

	let selectedSubscription = state.entities.subscriptions.byId[ selectedSubscriptionId ];


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

	let sites = [];
	let siteIds = state.entities.sites.allIds;
	if ( isEmpty( siteIds ) === false ) {
		sites = siteIds
			.map( siteId => state.entities.sites.byId[ siteId ] )
			.filter( site => site.subscriptions.includes( selectedSubscription.id ) );
	}

	// Get subscriptions that are connected to the same order in WooCommerce.
	let connectedSubscriptions = [];
	let subscriptionIds = state.entities.subscriptions.allIds;
	if ( isEmpty( subscriptionIds ) === false ) {
		connectedSubscriptions = subscriptionIds
			.map( subscriptionId => state.entities.subscriptions.byId[ subscriptionId ] )
			.filter( subscription => subscription.sourceId === selectedSubscription.sourceId )
			.filter( subscription => subscription.id !== selectedSubscription.id );
	}

	// Gather sites that use one or more of the connected subscriptions.
	let connectedSubscriptionsSites = [];
	if ( isEmpty( siteIds ) === false ) {
		connectedSubscriptionsSites = siteIds
			.map( siteId => state.entities.sites.byId[ siteId ] )
			.filter( site =>
				site.subscriptions.some( subId =>
					connectedSubscriptions.some( connectedSubscriptionId => connectedSubscriptionId === subId )
				)
			);
	}

	let cancelSubscriptionState = {
		cancelModalOpen: state.ui.subscriptionsCancel.modalOpen,
		cancelLoading: state.ui.subscriptionsCancel.loading,
		cancelSuccess: state.ui.subscriptionsCancel.success,
		cancelError: state.ui.subscriptionsCancel.error,
	};

	return Object.assign( {}, {
		subscription: selectedSubscription,
		orders,
		sites,
		connectedSubscriptions,
		connectedSubscriptionsSites,
	}, cancelSubscriptionState );
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			// Fetch required model data.
			dispatch( getOrders() );
			dispatch( getAllSubscriptions() );
			dispatch( retrieveSites() );
		},
		cancelSubscription: ( subscriptionId, shopId ) => {
			dispatch( cancelSubscription( subscriptionId, shopId ) );
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
