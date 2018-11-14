import SubscriptionEditModal from "../components/SubscriptionEditModal";
import { connect } from "react-redux";
import { getSubscription } from "../selectors/subscriptions";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getSitesForSubscription } from "../selectors/sites";

export const mapStateToProps = ( state, ownProps ) => {
	const { subscriptionId } = ownProps;
	const subscription  = getSubscription( state, subscriptionId );

	const subscriptionsCancelState = state.ui.subscriptionsCancel;

	return {
		isOpen: subscriptionsCancelState.modalOpen,
		loading: subscriptionsCancelState.loading,
		error: subscriptionsCancelState.error,

		subscription: subscription,

		amountOfActiveSites: getSitesForSubscription( state, subscriptionId ).length,

		numberOfCurrentSubscriptions: subscription.limit,
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
