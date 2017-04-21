import { logout } from "../actions/user";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";

const mapStateToProps = ( state ) => {
	return {
		displayName: state.user.data.profile.email,
		loggedIn: state.user.loggedIn,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		onLogoutClick: () => {
			dispatch( logout() );
		},
		displayImage: { src: "https://gravatar.com/avatar/f08c3c3253bf14b5616b4db53cea6b78?s=128", size: "64px" },
	};
};

const UserStatus = connect(
	mapStateToProps,
	mapDispatchToProps
)( UserProfile );

export default UserStatus;
