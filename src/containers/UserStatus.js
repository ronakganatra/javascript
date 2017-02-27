import { logout } from "../actions";
import { connect } from "react-redux";
import UserProfile from "../components/UserProfile";

const mapStateToProps = (state) => {
	return {
		displayName: state.user.data.email + ":" + state.user.data.username,
		loggedIn: state.user.loggedIn,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLogoutClick: () => {
			dispatch(logout());
		}
	}
};

const UserStatus = connect(
	mapStateToProps,
	mapDispatchToProps
)( UserProfile );

export default UserStatus;
