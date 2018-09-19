import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { PageCard } from "./PaperStyles";
import { LargeButton, makeButtonFullWidth } from "./Button";
import { speak } from "@wordpress/a11y";
import styled from "styled-components";
import defaults from "../config/defaults.json";
import CollapsibleHeader from "./CollapsibleHeader";
import ProfileForm from "./account/profile/ProfileForm.js";
import ComposerTokens from "./account/profile/ComposerTokens";
import MyYoastModal from "./MyYoastModal";
import CreateToken from "./account/profile/CreateToken";
import ManageToken from "./account/profile/ManageToken";
import SubscribeNewsletter from "./account/profile/SubscribeNewsletter";
import DeleteAccount from "./account/profile/dangerzone/DeleteAccount";
import DownloadAccount from "./account/profile/dangerzone/DownloadAccount";
import PasswordResetForm from "./account/profile/PasswordResetForm";

const messages = defineMessages( {
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	duplicateEmail: {
		id: "profile.error.duplicateEmail",
		defaultMessage: "The email address could not be changed, it is probably already in use.",
	},
	labelEmail: {
		id: "profile.label.email",
		defaultMessage: "Email",
	},
	labelDelete: {
		id: "profile.label.delete",
		defaultMessage: "Delete account",
	},
	developerTokens: {
		id: "profile.label.developerTokens",
		defaultMessage: "Developer Tokens",
	},
	dangerZone: {
		id: "profile.label.dangerZone",
		defaultMessage: "Danger zone",
	},
	saving: {
		id: "profile.saving",
		defaultMessage: "Saving...",
	},
	saved: {
		id: "profile.saved",
		defaultMessage: "Email address saved",
	},
	saveEmail: {
		id: "profile.saveEmail",
		defaultMessage: "Save email address",
	},
	deletingAccount: {
		id: "profile.deleting",
		defaultMessage: "Deleting your account...",
	},
	deleteAccount: {
		id: "profile.delete",
		defaultMessage: "Delete your account",
	},
	passwordChange: {
		id: "profile.passwordChange",
		defaultMessage: "Password",
	},
	personalInfo: {
		id: "personal.info",
		defaultMessage: "Personal info",
	},
	profilePageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account profile page loaded",
	},
	newsLetter: {
		id: "newsLetter",
		defaultMessage: "Newsletter",
	},
} );

const OuterContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		flex-direction: column;
	}
`;

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	width: 50%;
	
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		width: 100%;
	}
`;

const Column = styled.div`
	p:first-child {
		margin-top: 16px;
	}
`;

const Paragraph = styled.p`
	margin-bottom: 0.5em;
	font-size: 1.4em;
`;

const ComposerIntroductionArea = styled.div`
	padding: 16px 32px 24px 32px;
`;

const FormMessage = styled.p`
	padding: 0.5em 0 0 ${ props => props.inline ? "1em" : "0" };
	margin: 0;
	${ props => props.inline ? "display: inline-block;" : "display: block;" }
`;

FormMessage.propTypes = {
	inline: PropTypes.bool,
};

FormMessage.defaultProps = {
	inline: false,
};

const CreateButtonArea = styled.div`
	padding: 16px 32px;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class ProfilePage extends React.Component {
	/**
	 * Sets the ProfilePage object.
	 *
	 * Sets (input) validation constraints, including email.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.handleDelete = this.handleDelete.bind( this );
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.profilePageLoaded );
		speak( message );
	}

	componentDidUpdate() {
		this.announceActions();
	}

	/**
	 * Announce actions to assistive technologies.
	 *
	 * @returns {void}
	 */
	announceActions() {
		let message = "";

		if ( this.isDeleting() ) {
			message = this.props.intl.formatMessage( messages.deletingAccount );
		}

		speak( message, "assertive" );
	}

	/**
	 * Whether we are currently disabling the account.
	 *
	 * @returns {boolean} Whether we are currently disabling the account.
	 */
	isDeleting() {
		return this.props.isDeleting;
	}

	handleDelete( event ) {
		event.preventDefault();

		this.props.onDeleteProfile();
	}

	/**
	 * Will open a modal if its respective "isOpen" boolean is set to true.
	 *
	 * @returns {*} Returns either a CreateTokenModal, a ManageTokenModal, or null, depending on whether one of these modals is open.
	 */
	getModal() {
		if ( this.props.createTokenModalIsOpen || this.props.manageTokenModalIsOpen ) {
			let modalContent = null;
			let modalIsOpen;
			let onClose;
			let modalAriaLabel;

			if ( this.props.createTokenModalIsOpen ) {
				modalIsOpen = this.props.createTokenModalIsOpen;
				onClose = this.props.onCreateTokenModalClose;
				modalAriaLabel = defineMessages(
					{
						id: "modal.arialabel.create",
						defaultMessage: "Create token",
					}
				);

				modalContent =
					<CreateToken
						onClose={this.props.onCreateTokenModalClose}
						onCreateClick={this.props.onCreateTokenClick}
						error={this.props.tokenError}
					/>;
			} else if ( this.props.manageTokenModalIsOpen ) {
				modalIsOpen = this.props.manageTokenModalIsOpen;
				onClose = this.props.onManageTokenModalClose;
				modalAriaLabel = defineMessages( {
					id: "modal.arialabel.manage",
					defaultMessage: "Manage token",
				} );

				modalContent =
					<ManageToken
						onClose={this.props.onManageTokenModalClose}
						onSaveTokenClick={this.props.onSaveTokenClick}
						onDeleteTokenClick={this.props.onDeleteTokenClick}
						manageTokenData={this.props.manageTokenData}
						error={this.props.tokenError}
					/>;
			}
			return (
				<MyYoastModal
					isOpen={modalIsOpen}
					onClose={onClose}
					modalAriaLabel={modalAriaLabel}
				>
					{modalContent}
				</MyYoastModal>
			);
		}
		return null;
	}

	/**
	 *
	 * @returns {boolean} True when there are active composer tokens among the composertokens for this user. False otherwise.
	 */
	hasActiveComposerTokens() {
		let tokens = this.props.composerTokens && this.props.composerTokens.filter( ( composerToken ) => {
			return composerToken.enabled === true;
		} );

		return tokens.length > 0;
	}

	/**
	 * A function that prepares the DevTools element.
	 *
	 * @returns {(JSXElement|null)} Either a JSX element containing the DevTools section of the profile page, or null,
	 * depending on whether the user has access to this feature via the feature toggle.
	 */
	getDevTools() {
		let ComposerIntroduction =
			<ComposerIntroductionArea>
				{
					this.hasActiveComposerTokens()
						? <FormattedMessage
							id="profile.composer-introduction"
							defaultMessage="Here you can find a list of the Composer tokens that you have registered."
						/>
						: <FormattedMessage
							id="profile.composer-introduction"
							defaultMessage="Composer is a tool used by many developers to install and update plugins.
							Through MyYoast you can use Composer to get easy access to your premium plugins. Please see the Downloads page for additional information."
						/>
				}
			</ComposerIntroductionArea>;

		return (
			<div>
				<PageCard>
					<CollapsibleHeader title={this.props.intl.formatMessage( messages.developerTokens )} isOpen={false}>
						{ComposerIntroduction}
						<ComposerTokens {...this.props} hasPaper={false}/>
						<CreateButtonArea>
							<WideLargeButton
								onClick={this.props.onCreateTokenModalOpen}
							>
								<FormattedMessage
									id="profile.tokens.create"
									defaultMessage="Create token"
								/>
							</WideLargeButton>
						</CreateButtonArea>
					</CollapsibleHeader>
				</PageCard>
				{this.getModal()}
			</div>
		);
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		return (
			<OuterContainer>
				<InnerContainer>
					<PageCard>
						<Column>
							<Paragraph>
								<FormattedMessage id={messages.personalInfo.id}
								                  defaultMessage={messages.personalInfo.defaultMessage}/>
							</Paragraph>
							<ProfileForm
								{...this.props}
							/>
						</Column>
					</PageCard>
					<PageCard>
						<Column>
							<Paragraph>
								<FormattedMessage id={messages.newsLetter.id}
								                  defaultMessage={messages.newsLetter.defaultMessage}/>
							</Paragraph>
							<SubscribeNewsletter
								onSubscribe={this.props.onNewsletterSubscribe}
								onUnsubscribe={this.props.onNewsletterUnsubscribe}
								subscribed={this.props.newsletterSubscribed}
								loading={this.props.newsletterLoading}
								error={this.props.newsletterError}
							/>
						</Column>
					</PageCard>
				</InnerContainer>
				<InnerContainer>
					<PageCard>
						<Column>
							<Paragraph>
								<FormattedMessage id={messages.passwordChange.id}
								                  defaultMessage={messages.passwordChange.defaultMessage}/>
							</Paragraph>
							<p>
								<FormattedMessage
									id="profile.description.passwordReset"
									defaultMessage="Your password should be at least 8 characters long, contain both uppercase and lowercase letters and one symbol."
								/>
							</p>
							<PasswordResetForm
								{...this.props}
							/>
						</Column>
					</PageCard>
					<PageCard>
						<CollapsibleHeader title={this.props.intl.formatMessage( messages.dangerZone )} isOpen={false} accountPage={ true }>
							<DownloadAccount/>
							<DeleteAccount
								onDeleteProfile={this.props.onDeleteProfile}
								isDeleting={this.props.isDeleting}
							/>
						</CollapsibleHeader>
					</PageCard>
				</InnerContainer>
				{this.getDevTools()}
			</OuterContainer>

		);
	}
}

ProfilePage.propTypes = {
	// User data
	intl: intlShape.isRequired,
	email: PropTypes.string.isRequired,
	userFirstName: PropTypes.string,
	userLastName: PropTypes.string,
	image: PropTypes.string,

	// Profile actions
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	isDeleting: PropTypes.bool,
	onUpdateEmail: PropTypes.func.isRequired,
	onSaveProfile: PropTypes.func.isRequired,
	onDeleteProfile: PropTypes.func.isRequired,
	saveEmailError: PropTypes.object,
	onUploadAvatar: PropTypes.func.isRequired,

	// Password actions
	onSavePassword: PropTypes.func,
	isSavingPassword: PropTypes.bool,
	passwordIsSaved: PropTypes.bool,
	passWord: PropTypes.string,
	resetSaveMessage: PropTypes.func,
	passwordResetError: PropTypes.object,

	// Composer tokens
	onCreateTokenModalOpen: PropTypes.func.isRequired,
	onCreateTokenModalClose: PropTypes.func.isRequired,
	createTokenModalIsOpen: PropTypes.bool.isRequired,
	onCreateTokenClick: PropTypes.func.isRequired,
	manageTokenModalIsOpen: PropTypes.bool.isRequired,
	onManageTokenClick: PropTypes.func.isRequired,
	onManageTokenModalClose: PropTypes.func.isRequired,
	onSaveTokenClick: PropTypes.func.isRequired,
	onDeleteTokenClick: PropTypes.func.isRequired,
	manageTokenData: PropTypes.object,
	tokenError: PropTypes.object,
	composerTokens: PropTypes.array,

	// Newsletter
	onNewsletterSubscribe: PropTypes.func.isRequired,
	onNewsletterUnsubscribe: PropTypes.func.isRequired,
	newsletterSubscribed: PropTypes.string,
	newsletterLoading: PropTypes.bool,
	newsletterError: PropTypes.string,
};

ProfilePage.defaultProps = {
	email: "",
	userFirstName: "",
	userLastName: "",
	saveEmailError: null,
	isSaving: false,
	isSaved: false,
	isSavingPassword: false,
	passwordIsSaved: false,
	isSendingPasswordReset: false,
	hasSendPasswordReset: false,
	createTokenModalIsOpen: false,
	manageTokenModalIsOpen: false,
	passwordResetError: null,
	manageTokenData: null,
	tokenError: null,
};

export default injectIntl( ProfilePage );
