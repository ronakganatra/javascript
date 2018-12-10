import { logout } from "../actions/user";
import { helpBeaconModalOpen } from "../actions/helpBeacon";
import { connect } from "react-redux";
import MobileHeader from "../components/MobileHeader";
import { getSubscription } from "../selectors/subscriptions";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	let pageTitle = "";

	const path = state.router.location.pathname.split( "/" );

	const id = path.pop();
	const type = path.pop();

	// Set page title for sites and subscriptions detail pages.
	if ( type === "sites" && id ) {
		const site = state.entities.sites.byId[ id ];
		pageTitle = site ? site.hostname : "";
	} else if ( type === "subscriptions" && id ) {
		const subscription = getSubscription( state, id );
		pageTitle = subscription ? subscription.name : "";
	}

	return {
		pageTitle,
		loggingOut: state.user.loggingOut,
		logoutError: state.user.logoutError,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onBeaconClick: () => {
			dispatch( helpBeaconModalOpen() );
		},
		onLogoutClick: () => {
			dispatch( logout() );
		},
		onBackClick: () => {
			let backSteps = -1;
			// When the skip link has been activated, go back by two steps in the history.
			if ( ownProps.history.location.hash === "#content" ) {
				backSteps = -2;
			}
			ownProps.history.go( backSteps );
		},
	};
};

const MobileHeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( MobileHeader );

export default MobileHeaderContainer;
