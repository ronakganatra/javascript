import SubscriptionEditModal from "../components/SubscriptionEditModal";
import { connect } from "react-redux";
import React from "react";
import { getSubscription } from "../selectors/subscriptions";
import {
	cancelSubscription,
	closeCancelSubscriptionModal,
} from "../actions/subscriptions";
import { getSitesForSubscription } from "../selectors/sites";

function mapStateToProps( state, ownProps ) {
	const { subscriptionId } = ownProps;

	const subscriptionsCancelState = state.ui.subscriptionsCancel;

	return {
		isOpen: subscriptionsCancelState.modalOpen,
		loading: subscriptionsCancelState.loading,
		error: subscriptionsCancelState.error,

		subscription: getSubscription( state, subscriptionId ),

		amountOfActiveSites: getSitesForSubscription( state, subscriptionId ).length,
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		onClose: () => {
			dispatch( closeCancelSubscriptionModal() );
		},
		cancelSubscription: ( subscriptionId, amount ) => {
			dispatch( cancelSubscription( subscriptionId, amount ) );
		}
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( SubscriptionEditModal );
