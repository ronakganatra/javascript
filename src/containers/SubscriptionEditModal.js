import SubscriptionEditModal from "../components/SubscriptionEditModal";
import { connect } from "react-redux";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getSitesForSubscription } from "../selectors/sites";
import { getCoursesFromSubscription } from "../selectors/courseEnrollments";
import { getSubscriptionsById } from "../selectors/entities/subscriptions";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state, ownProps ) => {
	const { subscriptionId } = ownProps;
	const subscription = getSubscriptionsById( state )[ subscriptionId ];

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
