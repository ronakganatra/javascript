import { logout } from "../actions/user";
import { connect } from "react-redux";
import MobileHeader from "../components/MobileHeader";

const mapDispatchToProps = ( dispatch ) => {
	return {
		onLogoutClick: () => {
			dispatch( logout() );
		},
	};
};

const MobileHeaderContainer = connect(
	mapDispatchToProps
)( MobileHeader );

export default MobileHeaderContainer;
