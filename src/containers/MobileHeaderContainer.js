import { logout } from "../actions/user";
import { helpBeaconModalOpen } from "../actions/helpBeacon";
import { connect } from "react-redux";
import MobileHeader from "../components/MobileHeader";

const mapDispatchToProps = ( dispatch, ownProps ) => {
	console.log( "container", ownProps );
	return {
		onBeaconClick: () => {
			dispatch( helpBeaconModalOpen() );
		},
		onLogoutClick: () => {
			dispatch( logout() );
		},
		onBackClick: () => {
			document.location.href = "http://localhost:3001/sites";
		},
	};
};

const MobileHeaderContainer = connect(
	null,
	mapDispatchToProps
)( MobileHeader );

export default MobileHeaderContainer;
