import { connect } from "react-redux";
import ProfileDetails from "../components/login/ProfileDetails";
import { fetchUser, updateProfile, uploadAvatar } from "../actions/user";
import { getUserId } from "../functions/auth";
import { getSaveEmailError, isProfilePageSaved, isProfilePageSaving } from "../selectors/user/profilePage";
import { getPendingRequests } from "../selectors/user/user";
import { getProfile } from "../selectors/user/data/profile";
import { getRouter } from "../selectors/router/router";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		attemptSubmitProfile: ( nameDetails, avatarUrl ) => {
			dispatch( updateProfile( nameDetails ) );
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
		stateRouter: getRouter( state ),
		savingProfile: isProfilePageSaving( state ),
		profileSaved: isProfilePageSaved( state ),
		profile: getProfile( state ),
		pendingRequests: getPendingRequests( state ),
		profileSaveError: getSaveEmailError( state ),

	};
};

const ProfileDetailsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ProfileDetails );

export default ProfileDetailsContainer;
