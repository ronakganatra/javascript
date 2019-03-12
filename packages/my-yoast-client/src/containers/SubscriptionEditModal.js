import isEmpty from "lodash/isEmpty";
import SubscriptionEditModal from "../components/SubscriptionEditModal";
import { connect } from "react-redux";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getCoursesFromSubscription } from "../selectors/entities/courseEnrollments";
import { getAllSubscriptionsById } from "../selectors/entities/subscriptions";

/**
 * Returns sites for a given subscription.
 *
 * @param {Object} state Application state.
 * @param {string} subscriptionId ID for the subscription to find sites for.
 *
 * @returns {Array} Sites belonging to the subscription.
 */
function getSitesForSubscription( state, subscriptionId ) {
	let sites = [];
	const siteIds = state.entities.sites.allIds;
	if ( isEmpty( siteIds ) === false ) {
		sites = siteIds
			.map( siteId => state.entities.sites.byId[ siteId ] )
			.filter( site => site.subscriptions.includes( subscriptionId ) );
	}

	return sites;
}


/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state, ownProps ) => {
	const { subscriptionId } = ownProps;
	const subscription = getAllSubscriptionsById( state )[ subscriptionId ];

	const subscriptionsCancelState = state.ui.subscriptionsCancel;

	return {
		isOpen: subscriptionsCancelState.modalOpen,
		loading: subscriptionsCancelState.loading,
		error: subscriptionsCancelState.error,

		subscription: subscription,

		amountOfActiveSites: getSitesForSubscription( state, subscriptionId ).length,

		numberOfCurrentSubscriptions: subscription.limit,

		numberOfActiveEnrollments: getCoursesFromSubscription( state, subscriptionId ).length,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClose: () => {
			dispatch( closeCancelSubscriptionModal() );
		},
		cancelSubscription: ( subscriptionId, amount ) => {
			dispatch( cancelSubscription( subscriptionId, amount ) );
		},
	};
};

const SubscriptionEditModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionEditModal );

export default SubscriptionEditModalContainer;
