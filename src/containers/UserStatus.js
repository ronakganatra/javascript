import { logout } from "../actions/user";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";
import { url } from "gravatar";
// import defaultAvatar from "../../public/images/defaultAvatar.svg";

console.log( process.env.PUBLIC_URL );
// let avatarPlaceholder = process.env.PUBLIC_URL + defaultAvatar;
// let avatarPlaceholder = "https://thesocietypages.org/socimages/files/2009/05/yammer.gif";

// console.log( process.env.PUBLIC_URL + defaultAvatar );

const mapStateToProps = ( state ) => {
	return {
		displayName: state.user.data.profile.email,
		loggedIn: state.user.loggedIn,
		displayImage: {
			src: url( state.user.data.profile.email, {
				r: "pg",
				d: "http://localhost:3001/static/media/defaultAvatar.2bd68eae.svg",
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
