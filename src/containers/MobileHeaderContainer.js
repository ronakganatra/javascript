/* External dependencies **/
import { connect } from "react-redux";

/* Internal dependencies */
import { logout } from "../actions/user";
import { helpBeaconModalOpen } from "../actions/helpBeacon";
import { getPathname } from "../selectors/router/location";
import { getByIdSites } from "../selectors/entities/sites";
import { getAllSubscriptionsById } from "../selectors/entities/subscriptions";
import MobileHeader from "../components/MobileHeader";
import { getLogoutError, isLoggingOut } from "../selectors/user/user";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const path = getPathname( state ).split( "/" );
	let pageTitle = "";

	const id = path.pop();
	const type = path.pop();

	// Set page title for sites and subscriptions detail pages.
	if ( type === "sites" && id ) {
		const site = getByIdSites( state )[ id ];
		pageTitle = site ? site.hostname : "";
	} else if ( type === "subscriptions" && id ) {
		const subscription = getAllSubscriptionsById( state )[ id ];
		pageTitle = subscription ? subscription.name : "";
	}

	return {
		pageTitle,
		loggingOut: isLoggingOut( state ),
		logoutError: getLogoutError( state ),
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
