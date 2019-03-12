import { logout } from "../actions/user";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";
import { getDisplayImage, getUserEmail } from "../selectors/user/data/profile";
import { getLogoutError, isLoggedIn, isLoggingOut } from "../selectors/user/user";

/* eslint-disable require-jsdoc */
const mapStateToProps = ( state ) => {
	return {
		displayEmail: getUserEmail( state ),
		loggedIn: isLoggedIn( state ),
		loggingOut: isLoggingOut( state ),
		logoutError: getLogoutError( state ),
		displayImage: getDisplayImage( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		onLogoutClick: () => {
			dispatch( logout() );
		},
	};
};

const UserStatus = connect(
	mapStateToProps,
	mapDispatchToProps
)( UserProfile );

export default UserStatus;
