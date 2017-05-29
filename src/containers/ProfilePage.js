import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import { profileUpdateEmail, updateProfile, passwordResetSend, disableUser } from "../actions/user";
import { url } from "gravatar";
let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/My_Yoast_default_avatar.png";

export const mapStateToProps = ( state ) => {
	return {
		email: state.user.email,
		image: url( state.user.data.profile.email, {
			s: "150",
			r: "pg",
			d: avatarPlaceholder,
			protocol: "https",
		} ),
		isSaving: state.user.savingProfile,
		isDeleting: state.user.deletingProfile,
		error: state.user.savingError,
		isSendingPasswordReset: state.user.sendingPasswordReset,
		hasSendPasswordReset: state.user.sendPasswordReset,
		passwordResetError: state.user.passwordResetError,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onUpdateEmail: ( email ) => {
			dispatch( profileUpdateEmail( email ) );
		},
		onSaveProfile: ( profile ) => {
			dispatch( updateProfile( profile ) );
		},
		onDeleteProfile: ( profile ) => {
			// eslint-disable-next-line
			if ( window.confirm( "WARNING! This action CANNOT be undone.\n\n" +
				"If you continue, you will lose access to your downloads and will no longer receive updates to" +
				" the premium plugins you've bought from Yoast.\n\nAre you sure you want to delete your Yoast account?" ) ) {
				dispatch( disableUser() );
			}
		},
		onPasswordReset: ( email ) => {
			dispatch( passwordResetSend( email ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let email = stateProps.email;

	const onSaveProfile = () => {
		dispatchProps.onSaveProfile( { email } );
	};

	const onPasswordReset = () => {
		dispatchProps.onPasswordReset( email );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, {
		onSaveProfile,
		onPasswordReset,
	} );
};

const ProfilePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( ProfilePage );

export default ProfilePageContainer;
