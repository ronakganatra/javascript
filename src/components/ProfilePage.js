import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import Paper from "./Paper";
import { Button } from "./Button";
import UserImage from "../components/UserImage";
import validate from "validate.js";
import a11ySpeak from "a11y-speak";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import _isUndefined from "lodash/isUndefined";

const messages = defineMessages( {
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	labelEmail: {
		id: "profile.label.email",
		defaultMessage: "Email",
	},
	buttonSaving: {
		id: "profile.button.saving",
		defaultMessage: "Saving...",
	},
	buttonSaveChanges: {
		id: "profile.button.saveChanges",
		defaultMessage: "Save email address",
	},
	passwordReset: {
		id: "profile.label.passwordReset",
		defaultMessage: "Change password",
	},
	passwordResetSend: {
		id: "profile.button.passwordResetSend",
		defaultMessage: "Send password reset email",
	},
	passwordResetSending: {
		id: "profile.button.passwordResetSending",
		defaultMessage: "Sending password reset...",
	},
	passwordResetSent: {
		id: "profile.passwordResetSent",
		defaultMessage: "An email has been sent, please check your inbox.",
	},
	gravatarLink: {
		id: "profile.gravatarLink",
		defaultMessage: "Gravatar website",
	},
	labelProfilePicture: {
		id: "profile.label.picture",
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

	@media screen and ( max-width: 800px ) {
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

const TextInput = styled.input`
	background-color: ${ colors.$color_background_light };
	padding: 0.8em;
	line-height: 1.4;
	font-weight: 400;
	width: 100%;
	box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
	border:none;
`;

const FormError = styled.div`
	background-color: ${ colors.$color_yellow };
	padding: 0.5em;
	margin-top: 0.5em;
	color: ${ colors.$color_black };
`;

const PasswordReset = styled.section`
	margin: 1em 0;
`;

const SaveButton = styled( Button )`
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
	 * Sets the SitesPage object.
	 *
	 * Used just to set the searchTimer, no need to pass props.
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
	 * Runs the fields through the validator and returns the errors.
	 *
	 * @returns {Array} All validation errors.
	 */
	validateFields() {
		let errors = validate( {
			email: this.props.email,
		}, this.constraints, { format: "detailed" } );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}

		return errors;
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
	 * Displays the errors for the provided field.
	 *
	 * @param {Array} errors The errors that could be displayed.
	 * @param {string} field Field to display errors for.
	 * @returns {ReactElement[]} List of JSXElements if errors are found otherwise null.
	 */
	displayErrors( errors, field ) {
		// Find errors for the specified field.
		let fieldErrors = errors.filter( error => {
			return error.attribute === field;
		} );

		// Return nothing if we don't have any errors.
		if ( fieldErrors.length === 0 ) {
			return null;
		}

		// Display all remaining errors.
		return fieldErrors.map( ( error ) => {
			return <FormError key={ error.options.message }>{ error.options.message }</FormError>;
		} );
	}

	/**
	 * Creates the text to be displayed on the save button.
	 *
	 * @returns {string} Text to be used on the submit button.
	 */
	submitButtonText() {
		return this.isSaving() ? this.props.intl.formatMessage( messages.buttonSaving ) : this.props.intl.formatMessage( messages.buttonSaveChanges );
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.profilePageLoaded );
		a11ySpeak( message );
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
	 * Returns the password reset elements for the profile page.
	 *
	 * @returns {ReactElement} The element for the password reset.
	 */
	getPasswordReset() {
		let disabled = false;
		let passwordResetError;

		let passwordResetButtonText = this.props.intl.formatMessage( messages.passwordResetSend );

		if ( this.props.isSendingPasswordReset ) {
			passwordResetButtonText = this.props.intl.formatMessage( messages.passwordResetSending );
			disabled = true;
		}

		let passwordResetButton = <Button onClick={ this.props.onPasswordReset } disabled={disabled}>{passwordResetButtonText}</Button>;
		if ( this.props.hasSendPasswordReset ) {
			passwordResetButton = this.props.intl.formatMessage( messages.passwordResetSent );
		}

		if ( this.props.passwordResetError ) {
			passwordResetError = <FormError>{ this.props.passwordResetError }</FormError>;
		}

		return <PasswordReset>
			<Label>{ this.props.intl.formatMessage( messages.passwordReset ) }</Label>

			<p><FormattedMessage
				id="profile.description.passwordReset"
				defaultMessage={ "To change your password follow the instructions in the password reset mail." } />
			</p>
			{ passwordResetButton }
			{ passwordResetError }
		</PasswordReset>;
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let image = this.props.image ? <UserImage src={ this.props.image } size="120px"/> : "";
		let errors = this.validateFields();

		let onUpdateEmail = ( event ) => {
			this.props.onUpdateEmail( event.target.value );
		};

		let handleSubmit = ( event ) => {
			event.preventDefault();

			this.props.onSaveProfile();
		};

		let globalError = null;
		if ( this.props.error !== "" ) {
			let message = this.props.error;
			if ( message === "Bad Request" ) {
				message = <FormattedMessage
					id="profile.error.duplicateEmail"
					defaultMessage={ "The email address could not be changed, it is probably already in use." }
				/>;
			}
			globalError = <FormError>{message}</FormError>;
		}

		return (
			<Paper>
				<Page>
					<Column>
						<form onSubmit={handleSubmit}>
							<Label htmlFor="emailAddress">{ this.props.intl.formatMessage( messages.labelEmail ) }</Label>
							<TextInput
								id="emailAddress"
								autocomplete="on"
								name="email"
								type="text"
								value={ this.props.email }
								onChange={ onUpdateEmail }/>
							{ this.displayErrors( errors, "email" ) }
							{ globalError }

							<SaveButton type="submit" disabled={ this.isSaving() }>{ this.submitButtonText() }</SaveButton>
						</form>

						{ this.getPasswordReset() }
					</Column>

					<Column>
						<Paragraph>{ this.props.intl.formatMessage( messages.labelProfilePicture ) }</Paragraph>
						<p>
							<FormattedMessage
								id="profile.description.picture"
								defaultMessage={ "Your profile picture is supplied by Gravatar. If you don't have" +
												  " an account with them yet, or want to change your existing" +
												  " picture, please visit the { link }." }
								values={ { link: <a target="_blank" href="https://gravatar.com">{ this.props.intl.formatMessage( messages.gravatarLink ) }</a> } }
							/>
						</p>
						{ image }
					</Column>
				</Page>
			</Paper>
		);
	}
}

ProfilePage.propTypes = {
	intl: intlShape.isRequired,
	email: React.PropTypes.string.isRequired,
	image: React.PropTypes.string,
	isSaving: React.PropTypes.bool,
	error: React.PropTypes.string,
	isSendingPasswordReset: React.PropTypes.bool,
	hasSendPasswordReset: React.PropTypes.bool,
	passwordResetError: React.PropTypes.string,
	onUpdateEmail: React.PropTypes.func.isRequired,
	onSaveProfile: React.PropTypes.func.isRequired,
	onPasswordReset: React.PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
	email: "",
	error: "",
	isSaving: false,
	isSendingPasswordReset: false,
	hasSendPasswordReset: false,
	passwordResetError: "",
};

export default injectIntl( ProfilePage );
