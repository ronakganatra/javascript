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
import { getUserEmail, getUserFirstName, getUserLastName, getUserAvatar } from "../selectors/user/data/profile";
import { getComposerTokens } from "../selectors/entities/composerTokens";
import {
	isCreateTokenModalIsOpen, isManageTokenModalIsOpen, getManageTokenData, isTokenDeleted,
	getTokenError,
} from "../selectors/ui/composerTokens";
import { isProfilePageSaving, isProfilePageSaved, isProfilePageDeleting, getSaveEmailError } from "../selectors/user/profilePage";
import { isPasswordResetSending, isPasswordResetSent, getPasswordResetError } from "../selectors/user/passwordReset";
import { getNewsletterError, isNewsletterLoading, isNewsletterSubscribed } from "../selectors/ui/newsletter";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return {
		email: getUserEmail( state ),
		userFirstName: getUserFirstName( state ),
		userLastName: getUserLastName( state ),
		image: getUserAvatar( state ),

		composerTokens: getComposerTokens( state ),

		isSaving: isProfilePageSaving( state ),
		isSaved: isProfilePageSaved( state ),
		isDeleting: isProfilePageDeleting( state ),
		saveEmailError: getSaveEmailError( state ),

		isSavingPassword: isPasswordResetSending( state ),
		passwordIsSaved: isPasswordResetSent( state ),
		passwordResetError: getPasswordResetError( state ),

		createTokenModalIsOpen: isCreateTokenModalIsOpen( state ),
		manageTokenModalIsOpen: isManageTokenModalIsOpen( state ),
		manageTokenData: getManageTokenData( state ),
		tokenError: getTokenError( state ),
		tokenDeleted: isTokenDeleted( state ),

		newsletterSubscribed: isNewsletterSubscribed( state ),
		newsletterError: getNewsletterError( state ),
		newsletterLoading: isNewsletterLoading( state ),
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
