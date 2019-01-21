/* External dependencies */
import { connect } from "react-redux";

/* Internal dependencies */
import SubscriptionPage from "../components/account/subscriptions/SubscriptionPage";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import { getOrders } from "../actions/orders";
import { retrieveSites } from "../actions/sites";
import { retrieveCourseEnrollments } from "../actions/courses";
import {
	getAllSubscriptions,
	openCancelSubscriptionModal,
} from "../actions/subscriptions";
import {
	getAllSubscriptionsById,
	getConnectedSubscriptions,
	getSubscriptionsOrders,
	getSubscriptionsSites,
	getConnectedSubscriptionsSites,
	getSubscriptionsProducts,
} from "../selectors/entities/subscriptions";
import {
	getCancelSubscriptionState,
	isSubscriptionPageLoading,
} from "../selectors/ui/subscriptions";

/* eslint-disable require-jsdoc */
/* eslint-disable-next-line max-statements */
export const mapStateToProps = ( state, ownProps ) => {
	const selectedSubscriptionId = ownProps.match.params.id;
	const subscription = getAllSubscriptionsById( state )[ selectedSubscriptionId ];

	if ( ! subscription || isSubscriptionPageLoading( state ) ) {
		return {
			isLoading: true,
		};
	}

	const orders = getSubscriptionsOrders( state )[ selectedSubscriptionId ];
	const products = getSubscriptionsProducts( state )[ selectedSubscriptionId ]
		.filter( product => product.sourceShopId === 1 );

	const cancelSubscriptionState = getCancelSubscriptionState( state );

	return Object.assign(
		{},
		{
			subscription,
			orders,
			products,
			sites: getSubscriptionsSites( state )[ selectedSubscriptionId ],
			connectedSubscriptions: getConnectedSubscriptions( state )[ selectedSubscriptionId ],
			connectedSubscriptionsSites: getConnectedSubscriptionsSites( state )[ selectedSubscriptionId ],
		},
		cancelSubscriptionState
	);
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
			dispatch( retrieveCourseEnrollments() );
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
