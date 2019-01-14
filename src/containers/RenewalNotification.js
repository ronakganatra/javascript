import { connect } from "react-redux";
import { getAllSubscriptions } from "../actions/subscriptions";
import RenewalNotification from "../components/RenewalNotification";
import { getUpcomingRenewalSubscriptions } from "../selectors/entities/subscriptions";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return {
		upcomingRenewals: getUpcomingRenewalSubscriptions( state ),
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadData: () => {
			dispatch( getAllSubscriptions() );
		},
	};
};

const RenewalNotificationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( RenewalNotification );

export default RenewalNotificationContainer;
