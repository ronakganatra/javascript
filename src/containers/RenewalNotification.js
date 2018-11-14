import { connect } from "react-redux";
import { getAllSubscriptions } from "../actions/subscriptions";
import RenewalNotification from "../components/RenewalNotification";
import without from "lodash/without";
import { getSubscriptions } from "../selectors/subscriptions";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	let upcomingRenewals = getSubscriptions( state ).map( ( subscription ) => {
		const nextPayment = subscription.nextPayment ? new Date( subscription.nextPayment ) : null;
		const endDate = subscription.endDate ? new Date( subscription.endDate ) : null;
		const monthFromNow = new Date();
		monthFromNow.setMonth( monthFromNow.getMonth() + 1 );

		const expiresWithinMonth = ( nextPayment && nextPayment < monthFromNow ) || ( endDate && endDate < monthFromNow );
		const isUpcomingRenewal = subscription.status === "active" &&
			subscription.renewalUrl &&
			expiresWithinMonth &&
			subscription.requiresManualRenewal;

		if ( ! isUpcomingRenewal ) {
			return null;
		}

		return {
			id: subscription.id,
			name: subscription.name,
			hasNextPayment: subscription.nextPayment !== null,
			nextPayment: nextPayment || endDate,
			endDate: subscription.endDate ? new Date( subscription.endDate ) : null,
			status: subscription.status,
			renewalUrl: subscription.renewalUrl,
		};
	} );

	// Removing nulls from the array.
	upcomingRenewals = without( upcomingRenewals, null );

	// Sorting upcoming renewals by nextPayment date.
	upcomingRenewals = upcomingRenewals.sort( ( a, b ) => {
		return new Date( a.nextPayment || a.endDate ) - new Date( b.nextPayment || b.endDate );
	} );

	return {
		upcomingRenewals,
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
