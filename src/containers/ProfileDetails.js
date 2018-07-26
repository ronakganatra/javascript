import { connect } from "react-redux";
import ProfileDetails from "../components/login/ProfileDetails";
import { fetchUser, updateProfile, uploadAvatar } from "../actions/user";
import { getUserId } from "../functions/auth";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptSubmitProfile: ( profileDetails, avatarUrl ) => {
			dispatch( updateProfile( profileDetails ) );
			if ( avatarUrl ) {
				dispatch( uploadAvatar( avatarUrl ) );
			}
		},
		fetchProfile: () => {
			dispatch( fetchUser( getUserId() ) );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return {
		stateRouter: state.router,
		savingProfile: state.user.savingProfile,
		profileSaved: state.user.profileSaved,
		profile: state.user.data.profile,
		pendingRequests: state.user.pendingRequests,
		profileSaveError: state.user.saveEmailError,

	};
};

const ProfileDetailsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ProfileDetails );

export default ProfileDetailsContainer;
