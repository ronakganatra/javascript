import { connect } from "react-redux";
import SubscriptionPage from "../components/SubscriptionPage";
import _isUndefined from "lodash/isUndefined";

export const mapStateToProps = ( state, ownProps ) => {
	let subscriptionId = ownProps.match.params.id;

	let subscription = state.entities.subscriptions.byId[ subscriptionId ];

	if ( _isUndefined( subscription ) ) {
		return {
			isLoading: true,
		};
	}

	return {
		subscription,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onAddSite: () => {},
		onShop: () => {},
		onCancel: () => {},
		onInvoiceDownload: () => {},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionPage );

export default SubscriptionsPageContainer;
