import { logout } from "../actions/user";
import { helpBeaconPopupOpen } from "../actions/helpBeacon";
import { connect } from "react-redux";
import MobileHeader from "../components/MobileHeader";

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onBeaconClick: () => {
			dispatch( helpBeaconPopupOpen() );
		},
		onLogoutClick: () => {
			dispatch( logout() );
		},
	};
};

const MobileHeaderContainer = connect(
	null,
	mapDispatchToProps
)( MobileHeader );

export default MobileHeaderContainer;
