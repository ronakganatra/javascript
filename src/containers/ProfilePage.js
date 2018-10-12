import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import {
	profileUpdateEmail,
	disableUser,
	updateProfile,
	updatePassword,
	resetSaveMessage,
	uploadAvatar,
} from "../actions/user";
import {
	createComposerToken, createTokenModalClosed, createTokenModalOpen, deleteComposerToken,
	fetchComposerTokens, manageTokenModalClosed, manageTokenModalOpen, renameComposerToken,
} from "../actions/composerTokens";
import {
	getNewsletterStatus, subscribeNewsletter, unsubscribeNewsletter,
} from "../actions/newsletter";

import { url } from "gravatar";

const avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

export const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
		userFirstName: state.user.data.profile.userFirstName,
		userLastName: state.user.data.profile.userLastName,
		composerTokens: Object.values( state.entities.composerTokens.byId ),
		image: state.user.data.profile.userAvatarUrl || url( state.user.data.profile.email, {
			s: "150",
			r: "pg",
			d: avatarPlaceholder,
			protocol: "https",
		} ),
		isSaving: state.user.savingProfile,
		isSaved: state.user.profileSaved,
		isDeleting: state.user.deletingProfile,

		saveEmailError: state.user.saveEmailError,

		isSavingPassword: state.user.sendingPasswordReset,
		passwordIsSaved: state.user.sendPasswordReset,
		passwordResetError: state.user.passwordResetError,

		createTokenModalIsOpen: state.ui.composerTokens.createTokenModalIsOpen,
		manageTokenModalIsOpen: state.ui.composerTokens.manageTokenModalIsOpen,
		manageTokenData: state.ui.composerTokens.manageTokenData,
		tokenError: state.ui.composerTokens.tokenError,
		tokenDeleted: state.ui.composerTokens.tokenDeleted,

		newsletterSubscribed: state.ui.newsletter.subscribed,
		newsletterError: state.ui.newsletter.error,
		newsletterLoading: state.ui.newsletter.loading,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	dispatch( fetchComposerTokens() );
	dispatch( getNewsletterStatus() );

	return {
		onUpdateEmail: ( email ) => {
			dispatch( profileUpdateEmail( email ) );
		},
		onSaveProfile: ( profile ) => {
			dispatch( updateProfile( profile ) );
		},
		onSavePassword: ( password ) => {
			dispatch( updatePassword( password ) );
		},
		resetSaveMessage: () => {
			dispatch( resetSaveMessage() );
		},
		onDeleteProfile: () => {
			// eslint-disable-next-line
			if ( window.confirm( "WARNING! This action CANNOT be undone.\n\n" +
				"If you continue, you will lose access to your downloads and will no longer receive updates to" +
				" the premium plugins you've bought from Yoast.\n\nAre you sure you want to delete your Yoast account?" ) ) {
				dispatch( disableUser() );
			}
		},
		onCreateTokenModalOpen: () => {
			dispatch( createTokenModalOpen() );
		},
		onCreateTokenModalClose: () => {
			dispatch( createTokenModalClosed() );
		},
		onCreateTokenClick: ( data ) => {
			dispatch( createComposerToken( data ) );
		},
		onManageTokenClick: ( data ) => {
			dispatch( manageTokenModalOpen( data ) );
		},
		onManageTokenModalClose: () => {
			dispatch( manageTokenModalClosed() );
		},
		onSaveTokenClick: ( data ) => {
			dispatch( renameComposerToken( data ) );
		},
		onDeleteTokenClick: ( data ) => {
			dispatch( deleteComposerToken( data ) );
		},
		onNewsletterSubscribe: () => {
			dispatch( subscribeNewsletter() );
		},
		onNewsletterUnsubscribe: () => {
			dispatch( unsubscribeNewsletter() );
		},
		onUploadAvatar: ( image ) => {
			dispatch( uploadAvatar( image ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	return Object.assign( {}, ownProps, stateProps, dispatchProps, {
	} );
};

const ProfilePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( ProfilePage );

export default ProfilePageContainer;
