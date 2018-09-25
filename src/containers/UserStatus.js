import { logout } from "../actions/user";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";
import { url } from "gravatar";
const avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

const mapStateToProps = ( state ) => {
	return {
		displayEmail: state.user.data.profile.email,
		loggedIn: state.user.loggedIn,
		loggingOut: state.user.loggingOut,
		logoutError: state.user.logoutError,
		displayImage: {
			src: state.user.data.profile.userAvatarUrl || url( state.user.data.profile.email, {
				// Gravatar rating
				rating: "pg",
				// Default image
				d: avatarPlaceholder,
				protocol: "https",
			} ),
			size: "64px",
		},
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
