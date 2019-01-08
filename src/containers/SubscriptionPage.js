import { connect } from "react-redux";
import SubscriptionPage from "../components/account/subscriptions/SubscriptionPage";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
	getAllSubscriptions,
	openCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import { getOrders } from "../actions/orders";
import _isUndefined from "lodash/isUndefined";
import { retrieveSites } from "../actions/sites";
import isEmpty from "lodash/isEmpty";
import {
	getProductsFromSubscription,
} from "../functions/productGroups";
import { sortPluginsByPopularity } from "../functions/products";
import { getSubscriptions, getSubscriptionsById } from "../selectors/entities/subscriptions";
import { getOrdersById, getOrdersPageOrders } from "../selectors/entities/orders";
import { getAllSites } from "../selectors/entities/sites";

/**
 * Get the subscriptions that are connected to the same order in WooCommerce
 *
 * @param {Object} selectedSubscription The selected subscription.
 * @param {Array} allSubscriptions 		All subscriptions in the state.
 *
 * @returns {Array}						All connected subscriptions.
 */
function getConnectedSubscriptions( selectedSubscription, allSubscriptions ) {
	let connectedSubscriptions = [];
	if ( isEmpty( allSubscriptions ) === false ) {
		connectedSubscriptions = allSubscriptions
			.filter( subscription => subscription.sourceId === selectedSubscription.sourceId )
			.filter( subscription => subscription.id !== selectedSubscription.id );
	}
	return connectedSubscriptions;
}

/**
 * Get the sites that are connected to the subscription.
 *
 * @param {Object} subscription The selected subscription.
 * @param {Array} allSites 		All sites in the state.
 *
 * @returns {Array}				All connected sites.
 */
function getConnectedSites( subscription, allSites ) {
	let connectedSites = [];
	if ( isEmpty( allSites ) === false ) {
		connectedSites = allSites
			.filter( site => site.subscriptions.includes( subscription.id ) );
	}
	return connectedSites;
}

/**
 * Get the sites that are related to the connected subscriptions.
 *
 * @param {Object} connectedSubscriptions 	The connected subscriptions.
 * @param {Array} allSites 					All sites in the state.
 *
 * @returns {Array}							All sites related to the connected subscriptions.
 */
function getConnectedSubscriptionsSites( connectedSubscriptions, allSites ) {
	let connectedSubscriptionsSites = [];
	if ( isEmpty( allSites ) === false ) {
		connectedSubscriptionsSites = allSites
			.filter( site =>
				site.subscriptions.some( subId =>
					connectedSubscriptions.some( connectedSubscription => connectedSubscription.id === subId )
				)
			);
	}
	return connectedSubscriptionsSites;
}

/* eslint-disable require-jsdoc */
/* eslint-disable-next-line max-statements */
export const mapStateToProps = ( state, ownProps ) => {
	const selectedSubscriptionId = ownProps.match.params.id;

	const selectedSubscription = getSubscriptionsById( state )[ selectedSubscriptionId ];


	if ( _isUndefined( selectedSubscription ) || state.ui.subscriptions.requesting || state.ui.sites.retrievingSites ) {
		return {
			isLoading: true,
		};
	}

	let orders = selectedSubscription.orders.map( order => getOrdersById( state )[ order ] );

	// If some orders are undefined we are still waiting for some data.
	if ( orders.filter( order => ! ! order ).length !== orders.length ) {
		return {
			isLoading: true,
		};
	}

	orders = getOrdersPageOrders( state );

	const allSites = getAllSites( state );
	const sites = getConnectedSites( selectedSubscription, allSites );

	// Get subscriptions that are connected to the same order in WooCommerce.
	const allSubscriptions = getSubscriptions( state );
	const connectedSubscriptions = getConnectedSubscriptions( selectedSubscription, allSubscriptions );

	// Gather sites that use one or more of the connected subscriptions.
	const connectedSubscriptionsSites = getConnectedSubscriptionsSites( connectedSubscriptions, allSites );

	let products = getProductsFromSubscription( state, selectedSubscription )
		.filter( product => product.sourceShopId === 1 );

	products = sortPluginsByPopularity( products );

	const cancelSubscriptionState = {
		cancelModalOpen: state.ui.subscriptionsCancel.modalOpen,
		cancelLoading: state.ui.subscriptionsCancel.loading,
		cancelSuccess: state.ui.subscriptionsCancel.success,
		cancelError: state.ui.subscriptionsCancel.error,
	};

	return Object.assign( {}, {
		subscription: selectedSubscription,
		orders,
		sites,
		products,
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
			dispatch( getAllProducts() );
			dispatch( getProductGroups() );
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
