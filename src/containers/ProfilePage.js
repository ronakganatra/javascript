import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";

const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
	};
};

const ProfilePageContainer = connect(
	mapStateToProps
	)( ProfilePage );

export default ProfilePageContainer;
