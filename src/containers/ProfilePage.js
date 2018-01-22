import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import {
	profileUpdateEmail,
	passwordResetSend,
	disableUser,
	updateProfile,
	resetSaveMessage,
} from "../actions/user";
import { url } from "gravatar";
import { createTokenModalClosed, createTokenModalOpen, fetchComposerTokens } from "../actions/composerTokens";
let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

export const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
		userFirstName: state.user.data.profile.userFirstName,
		userLastName: state.user.data.profile.userLastName,
		composerTokens: Object.values( state.entities.composerTokens.byId ),
		image: url( state.user.data.profile.email, {
			s: "150",
			r: "pg",
			d: avatarPlaceholder,
			protocol: "https",
		} ),
		isSaving: state.user.savingProfile,
		isSaved: state.user.profileSaved,
		isDeleting: state.user.deletingProfile,
		saveEmailError: state.user.saveEmailError,
		isSendingPasswordReset: state.user.sendingPasswordReset,
		hasSendPasswordReset: state.user.sendPasswordReset,
		passwordResetError: state.user.passwordResetError,
		createTokenModalIsOpen: state.ui.composerTokens.createTokenModalOpen,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	dispatch( fetchComposerTokens() );

	return {
		onUpdateEmail: ( email ) => {
			dispatch( profileUpdateEmail( email ) );
		},
		onSaveProfile: ( profile ) => {
			dispatch( updateProfile( profile ) );
		},
		resetSaveMessage: () => {
			dispatch( resetSaveMessage() );
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
		onCreateTokenModalOpen: () => {
			dispatch( createTokenModalOpen() );
		},
		onCreateTokenModalClose: () => {
			dispatch( createTokenModalClosed() );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let email = stateProps.email;

	const onPasswordReset = () => {
		dispatchProps.onPasswordReset( email );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, {
		onPasswordReset,
	} );
};

const ProfilePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( ProfilePage );

export default ProfilePageContainer;
