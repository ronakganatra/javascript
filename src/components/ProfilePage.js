import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import Paper from "./Paper";
import { Button, RedButton } from "./Button";
import UserImage from "../components/UserImage";
import validate from "validate.js";
import a11ySpeak from "a11y-speak";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";
import _noop from "lodash/noop";
import defaults from "../config/defaults.json";
import CollapsibleHeader from "./CollapsibleHeader";
import ErrorDisplay from "../errors/ErrorDisplay";
import { InputField } from "./InputField";

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
		defaultMessage: "Change password",
	},
	passwordResetSend: {
		id: "profile.button.passwordResetSend",
		defaultMessage: "Send password reset email",
	},
	passwordResetSending: {
		id: "profile.button.passwordResetSending",
		defaultMessage: "Sending email...",
	},
	passwordResetSent: {
		id: "profile.passwordResetSent",
		defaultMessage: "An email has been sent, please check your inbox.",
	},
	gravatarLink: {
		id: "profile.gravatarLink",
		defaultMessage: "Gravatar website",
	},
	profilePicture: {
		id: "profile.picture",
		defaultMessage: "Profile picture",
	},
	profilePageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account profile page loaded",
	},
} );

const Page = styled.div`
	padding: 2em;
	background-color: ${ colors.$color_white };
	display: flex;
	justify-content: space-between;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}
`;

const Column = styled.div`
	flex-basis: 48%;
	p:first-child {
		margin-top: 0;
	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: 0.5em;
	font-size: 1.1em;
`;

const Paragraph = styled.p`
	margin-bottom: 0.5em;
	font-size: 1.1em;
`;

const TextInput = styled( InputField )`
	background-color: ${ colors.$color_background_light };
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

const FormError = styled( FormMessage )`
 	padding: 0.5em;
	background-color: ${ colors.$color_yellow };
	margin-top: 0.5em;
	color: ${ colors.$color_black };
`;

const PasswordReset = styled.section`
	margin: 1em 0;
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
`;

const DeleteButton = styled( RedButton )`
	margin: 1em 0;
`;

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

		this.validateFields = this.validateFields.bind( this );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints.bind( this ),
		};
	}

	/**
	 * Runs the fields through the validator and returns the warnings.
	 *
	 * @returns {Array} All validation warnings.
	 */
	validateFields() {
		let warnings = validate( {
			email: this.props.email,
		}, this.constraints, { format: "detailed" } );

		if ( _isUndefined( warnings ) ) {
			warnings = [];
		}

		return warnings;
	}

	/**
	 * Creates the email constraints for validation.
	 *
	 * @param {string} value Current email value.
	 * @returns {Object} The constraint.
	 */
	emailConstraints( value ) {
		let output = {
			email: {
				message: this.props.intl.formatMessage( messages.validationFormatEmail, {
					field: "Email",
				} ),
			},
		};

		if ( ! value || value.length === 0 ) {
			output = {
				presence: {
					message: this.props.intl.formatMessage( messages.validationRequired, {
						field: "Email",
					} ),
				},
			};
		}

		return output;
	}

	/**
	 * Displays the warnings for the provided field.
	 *
	 * @param {Array} warnings The warnings that could be displayed.
	 * @param {string} field Field to display warnings for.
	 * @returns {ReactElement[]} List of JSXElements if warnings are found. Otherwise null.
	 */
	displayWarnings( warnings, field ) {
		// Find warnings for the specified field.
		let fieldWarnings = warnings.filter( warning => {
			return warning.attribute === field;
		} );

		// Return nothing if we don't have any warnings.
		if ( fieldWarnings.length === 0 ) {
			return null;
		}

		// Display all remaining warnings.
		return fieldWarnings.map( ( warning ) => {
			return <ErrorDisplay error={ warning } type="warning"/>;
		} );
	}

	/**
	 * Creates the text to be displayed on the save button.
	 *
	 * @returns {string} Text to be used on the submit button.
	 */
	deleteButtonText() {
		return this.isDeleting()
			? <FormattedMessage id={ messages.deletingAccount.id } defaultMessage={ messages.deletingAccount.defaultMessage}/>
			: <FormattedMessage id={ messages.deleteAccount.id } defaultMessage={ messages.deleteAccount.defaultMessage }/>;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.profilePageLoaded );
		a11ySpeak( message );
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

		if ( this.isSaving() ) {
			message = this.props.intl.formatMessage( messages.saving );
		}

		if ( this.isSaved() ) {
			message = this.props.intl.formatMessage( messages.saved );
		}

		if ( this.isDeleting() ) {
			message = this.props.intl.formatMessage( messages.deletingAccount );
		}

		if ( this.props.isSendingPasswordReset ) {
			message = this.props.intl.formatMessage( messages.passwordResetSending );
		}

		if ( this.props.hasSendPasswordReset ) {
			message = this.props.intl.formatMessage( messages.passwordResetSent );
		}

		a11ySpeak( message, "assertive" );
	}

	/**
	 * Whether we are currently saving.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaving() {
		return this.props.isSaving;
	}

	/**
	 * Whether the profile was updated successfully.
	 *
	 * @returns {boolean} Whether the profile was saved.
	 */
	isSaved() {
		return this.props.isSaved;
	}

	/**
	 * Whether we are currently disabling the account.
	 *
	 * @returns {boolean} Whether we are currently disabling the account.
	 */
	isDeleting() {
		return this.props.isDeleting;
	}

	/**
	 * Returns the save email elements for the profile page.
	 *
	 * @returns {ReactElement} The elements for the save email.
	 */
	getSaveButton() {
		let emailSavingMessage;

		if ( this.isSaving() ) {
			let message = this.props.intl.formatMessage( messages.saving );

			emailSavingMessage = <FormMessage inline={ true }>{ message }</FormMessage>;
			a11ySpeak( message, "assertive" );
		}

		return <div>
			<SaveButton type="submit">
				<FormattedMessage id={ messages.saveEmail.id } defaultMessage={ messages.saveEmail.defaultMessage } />
			</SaveButton>
			{ emailSavingMessage }
		</div>;
	}

	/**
	 * Returns the password reset elements for the profile page.
	 *
	 * @returns {ReactElement} The elements for the password reset.
	 */
	getPasswordReset() {
		let onClickAction = this.props.onPasswordReset;
		let passwordResetError;
		let passwordResetMessage;

		if ( this.props.isSendingPasswordReset ) {
			let message = this.props.intl.formatMessage( messages.passwordResetSending );

			/*
			 * While sending the email: prevent calling the password reset
			 * function multiple times but don't disable the button for better
			 * accessibility (avoid keyboard focus loss).
			 */
			onClickAction = _noop;

			passwordResetMessage = <FormMessage inline={ true }>{ message }</FormMessage>;
			a11ySpeak( message, "assertive" );
		}

		if ( this.props.hasSendPasswordReset ) {
			let message = this.props.intl.formatMessage( messages.passwordResetSent );

			passwordResetMessage = <FormMessage>{ message }</FormMessage>;
			a11ySpeak( message, "assertive" );
		}

		if ( this.props.passwordResetError ) {
			passwordResetError = <FormError role="alert">{ this.props.passwordResetError }</FormError>;
		}

		return <PasswordReset>
			<Paragraph>
				<FormattedMessage id={ messages.passwordChange.id } defaultMessage={ messages.passwordChange.defaultMessage }/>
			</Paragraph>

			<p><FormattedMessage
				id="profile.description.passwordReset"
				defaultMessage="To change your password follow the instructions in the password reset email."
			/></p>
			<Button onClick={ onClickAction }><FormattedMessage id={ messages.passwordResetSend.id } defaultMessage={ messages.passwordResetSend.defaultMessage }/></Button>
			{ passwordResetError }
			{ passwordResetMessage }
		</PasswordReset>;
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let image = this.props.image ? <UserImage src={ this.props.image } size="120px"/> : "";
		let warnings = this.validateFields();

		let onUpdateEmail = ( event ) => {
			this.props.onUpdateEmail( event.target.value );
		};

		let handleSubmit = ( event ) => {
			event.preventDefault();

			/*
			 * While saving: prevent multiple submissions but don't disable the
			 * button for better accessibility (avoid keyboard focus loss).
			 */
			if ( this.isSaving() ) {
				return;
			}

			this.props.onSaveProfile();
		};

		let handleDelete = ( event ) => {
			event.preventDefault();

			this.props.onDeleteProfile();
		};

		return (
			<div>
				<Paper>
					<Page>
						<Column>
							<form onSubmit={ handleSubmit }>
								<Label htmlFor="email-address"><FormattedMessage id={ messages.labelEmail.id } defaultMessage={ messages.labelEmail.defaultMessage }/></Label>
								<TextInput
									id="email-address"
									autocomplete="on"
									name="email"
									type="text"
									value={ this.props.email }
									onChange={ onUpdateEmail }/>
								{ this.displayWarnings( warnings, "email" ) }
								<ErrorDisplay error={ this.props.saveEmailError } />
								{ this.getSaveButton() }
							</form>

							{ this.getPasswordReset() }
						</Column>

						<Column>
							<Paragraph>
								<FormattedMessage id={ messages.profilePicture.id } defaultMessage={ messages.profilePicture.defaultMessage }/>
							</Paragraph>
							<p>
								<FormattedMessage
									id="profile.description.picture"
									defaultMessage={ "Your profile picture is supplied by Gravatar. If you don't have" +
									" an account with them yet, or want to change your existing" +
									" picture, please visit the { link }." }
									values={ { link: <a target="_blank" rel="noopener noreferrer" href="https://gravatar.com">{ this.props.intl.formatMessage( messages.gravatarLink ) }</a> } }
								/>
							</p>
							{ image }
						</Column>
					</Page>
				</Paper>
				<Paper>
					<CollapsibleHeader title={ this.props.intl.formatMessage( messages.dangerZone ) } isOpen={ false }>
						<Page>
							<form onSubmit={ handleDelete }>
								<Paragraph>
									<FormattedMessage id={ messages.labelDelete.id } defaultMessage={ messages.labelDelete.defaultMessage }/>
								</Paragraph>
								<p>
									<FormattedMessage
										id="profile.delete.message"
										defaultMessage={ "Warning! If you delete your account you lose access to" +
										" your downloads and you will no longer receive updates for any Premium" +
										" plugins you've bought from us." } />
								</p>
								<DeleteButton type="submit" disabled={ this.isDeleting() }>{ this.deleteButtonText() }</DeleteButton>
							</form>
						</Page>
					</CollapsibleHeader>
				</Paper>
			</div>
		);
	}
}

ProfilePage.propTypes = {
	intl: intlShape.isRequired,
	email: PropTypes.string.isRequired,
	image: PropTypes.string,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	isDeleting: PropTypes.bool,
	error: PropTypes.string,
	isSendingPasswordReset: PropTypes.bool,
	hasSendPasswordReset: PropTypes.bool,
	passwordResetError: PropTypes.string,
	onUpdateEmail: PropTypes.func.isRequired,
	onSaveProfile: PropTypes.func.isRequired,
	onDeleteProfile: PropTypes.func.isRequired,
	onPasswordReset: PropTypes.func.isRequired,
	saveEmailError: PropTypes.string,
};

ProfilePage.defaultProps = {
	email: "",
	saveEmailError: "",
	isSaving: false,
	isSaved: false,
	isSendingPasswordReset: false,
	hasSendPasswordReset: false,
	passwordResetError: "",
};

export default injectIntl( ProfilePage );
