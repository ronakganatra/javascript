import { logout } from "../actions/user";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";
import { url } from "gravatar";
let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

const mapStateToProps = ( state ) => {
	return {
		displayName: state.user.data.profile.email,
		loggedIn: state.user.loggedIn,
		displayImage: {
			src: url( state.user.data.profile.email, {
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
