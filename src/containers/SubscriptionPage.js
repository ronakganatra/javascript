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
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import {
	getProductsFromSubscription,
} from "../functions/productGroups";
import { sortPluginsByPopularity } from "../functions/products";
import { getSubscriptions, getSubscriptionsById } from "../selectors/entities/subscriptions";
import { getOrdersById } from "../selectors/entities/orders";
import { getAllSites } from "../selectors/entities/sites";


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

	let sites = [];
	const allSites = getAllSites( state );
	if ( isEmpty( allSites ) === false ) {
		sites = allSites
			.filter( site => site.subscriptions.includes( selectedSubscription.id ) );
	}

	// Get subscriptions that are connected to the same order in WooCommerce.
	let connectedSubscriptions = [];
	const allSubscriptions = getSubscriptions( state );
	if ( isEmpty( allSubscriptions ) === false ) {
		connectedSubscriptions = allSubscriptions
			.filter( subscription => subscription.sourceId === selectedSubscription.sourceId )
			.filter( subscription => subscription.id !== selectedSubscription.id );
	}

	// Gather sites that use one or more of the connected subscriptions.
	let connectedSubscriptionsSites = [];
	if ( isEmpty( allSites ) === false ) {
		connectedSubscriptionsSites = allSites
			.filter( site =>
				site.subscriptions.some( subId =>
					connectedSubscriptions.some( connectedSubscription => connectedSubscription.id === subId )
				)
			);
	}

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
