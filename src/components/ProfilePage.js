import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import Paper from "./Paper";
import { Button } from "./Button";
import UserImage from "../components/UserImage";

import validate from "validate.js";

import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";

const messages = defineMessages( {
	validationPasswordLength: {
		id: "validation.password.length",
		defaultMessage: "{field} must be at least {length} characters long.",
	},
	validationPasswordMatch: {
		id: "validation.password.match",
		defaultMessage: "{field} must match {reference}.",
	},
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
	labelCurrentPassword: {
		id: "profile.label.password.current",
		defaultMessage: "Current password",
	},
	labelNewPassword: {
		id: "profile.label.password.new",
		defaultMessage: "New password",
	},
	labelNewPasswordConfirm: {
		id: "profile.label.password.confirm",
		defaultMessage: "Confirm new password",
	},
	buttonSaving: {
		id: "profile.button.saving",
		defaultMessage: "Saving...",
	},
	buttonSaveChanges: {
		id: "profile.button.saveChanges",
		defaultMessage: "Save changes",
	},
	labelProfilePicture: {
		id: "profile.label.picture",
		defaultMessage: "Profile picture",
	},
	descriptionProfilePicture: {
		id: "profile.description.picture",
		defaultMessage: "This is your profile picture.",
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
	margin: 7px 0;
`;

const SaveContainer = styled.div`
	margin: 2em 0 0;
	text-align: right;
`;

const FieldGroup = styled.div`
	margin-top: 4em;
`;

const FormError = styled.div`
	background-color: ${ colors.$color_yellow };
	padding: 0.5em;
	margin-top: 0.5em;
	color: ${ colors.$color_black };
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

		// Set default state; password fields are left blank intentionally.
		this.state = {
			email: this.props.email,
			oldPassword: "",
			newPassword: "",
			newPasswordCheck: "",
		};

		this.validateWrapper = this.validateWrapper.bind( this );
		this.validateFields = this.validateFields.bind( this );

		// Wrap all onChange handlers to validate input after changes.
		this.handleEmailChange = this.validateWrapper( this.handleEmailChange );
		this.handleOldPasswordChange = this.validateWrapper( this.handleOldPasswordChange );
		this.handleNewPasswordChange = this.validateWrapper( this.handleNewPasswordChange );
		this.handleNewPasswordCheckChange = this.validateWrapper( this.handleNewPasswordCheckChange );

		this.handleSubmit = this.handleSubmit.bind( this );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints.bind( this ),
			newPassword: this.passwordConstraints.bind( this ),
			newPasswordCheck: this.passwordCheckConstraints.bind( this ),
		};
	}

	/**
	 * Wraps the field validation call around change even handler.
	 *
	 * @param {callback} action Function to trigger on change event.
	 * @returns {function(this:ProfilePage)} Wrapped function to be attached to an event.
	 */
	validateWrapper( action ) {
		let wrapper = function( event ) {
			action.call( this, event, this.validateFields );
		};

		return wrapper.bind( this );
	}

	/**
	 * Runs the fields through the validator and places the errors in the state.
	 *
	 * @returns {void}
	 */
	validateFields() {
		this.setState( {
			errors: validate( this.state, this.constraints, { format: "detailed" } ),
		} );
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
	 * Creates the confirm new password field constraints for validation.
	 *
	 * @param {string} value Current value of the field.
	 * @param {Object} attributes Constraint attributes.
	 * @returns {Object} The constraint.
	 */
	passwordCheckConstraints( value, attributes ) {
		if ( ! attributes.newPassword || attributes.newPassword.length === 0 ) {
			return null;
		}

		return {
			presence: false,
			equality: {
				message: this.props.intl.formatMessage( messages.validationPasswordMatch, {
					field: "Confirm new password",
					reference: "New password",
				} ),
				attribute: "newPassword",
			},
		};
	}

	/**
	 * Creates the new password field constraints for validation.
	 *
	 * @param {string} value Current value of the field.
	 * @param {Object} attributes Constraint attributes.
	 * @returns {Object} The constraint.
	 */
	passwordConstraints( value, attributes ) {
		if ( ! value && (
				! attributes.oldPassword || attributes.oldPassword.length === 0
			) ) {
			return null;
		}

		return {
			length: {
				minimum: 6,
				message: this.props.intl.formatMessage( messages.validationPasswordLength, {
					field: "New password",
					length: 6,
				} ),
			},
		};
	}

	/**
	 * Handles the form submittion
	 *
	 * @param {Object} event Event that triggered the submit.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		// Submitting state.. show loader.
		this.setState( {
			saving: true,
		} );
		// Dispatch event to update to the server.

		event.preventDefault();
	}

	/**
	 * Handles the saved dispatch.
	 * @returns {void}
	 */
	saveComplete() {
		this.setState( {
			saving: false,
			saved: true,
		} );
	}

	/**
	 * Handles a save fail dispatch.
	 *
	 * @param {Object} errors Errors by field key.
	 * @returns {void}
	 */
	saveFailed( errors ) {
		this.setState( {
			saving: false,
			saved: false,
			errors: errors,
		} );
	}

	/**
	 * Handles the email field value change.
	 *
	 * @param {Object} event The event that triggered the change.
	 * @param {callback} callback Callback to be used after the state has been changed.
	 *
	 * @returns {void}
	 */
	handleEmailChange( event, callback ) {
		this.setState( { email: event.target.value }, callback );

		// Debounce unique-address check.
		// E.a. onBlur -> cancel debounce and do it.
	}

	/**
	 * Handles the old password field value change.
	 *
	 * @param {Object} event The event that triggered the change.
	 * @param {callback} callback Callback to be used after the state has been changed.
	 *
	 * @returns {void}
	 */
	handleOldPasswordChange( event, callback ) {
		this.setState( { oldPassword: event.target.value }, callback );
	}

	/**
	 * Handles the new password field value change.
	 *
	 * @param {Object} event The event that triggered the change.
	 * @param {callback} callback Callback to be used after the state has been changed.
	 *
	 * @returns {void}
	 */
	handleNewPasswordChange( event, callback ) {
		this.setState( { newPassword: event.target.value }, callback );
	}

	/**
	 * Handles the confirm new password field value change.
	 *
	 * @param {Object} event The event that triggered the change.
	 * @param {callback} callback Callback to be used after the state has been changed.
	 *
	 * @returns {void}
	 */
	handleNewPasswordCheckChange( event, callback ) {
		this.setState( { newPasswordCheck: event.target.value }, callback );
	}

	/**
	 * Displays the errors for the provided field.
	 *
	 * @param {string} field Field to display errors for.
	 * @returns {JSXElement} List of JSXElements if errors are found otherwise null.
	 */
	displayErrors( field ) {
		if ( ! this.state.errors ) {
			return null;
		}

		// Find errors for the specified field.
		let errors = this.state.errors.filter( error => {
			return error.attribute === field;
		} );

		// Return nothing if we don't have any errors.
		if ( errors.length === 0 ) {
			return null;
		}

		// Display all remaining errors.
		return errors.map( ( error ) => {
			return <FormError>{ error.options.message }</FormError>;
		} );
	}

	/**
	 * Creates the text to be displayed on the save button.
	 *
	 * @returns {string} Text to be used on the submit button.
	 */
	submitButtonText() {
		return this.state.saving ? this.props.intl.formatMessage( messages.buttonSaving ) : this.props.intl.formatMessage( messages.buttonSaveChanges );
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let image = this.props.image ? <UserImage src={ this.props.image } size="120px"/> : "";

		return (
			<Paper>
				<Page>
					<Column>
						<form onSubmit={this.handleSubmit}>
							<Label htmlFor="emailAddress">{ this.props.intl.formatMessage( messages.labelEmail ) }</Label>
							<TextInput
								id="emailAddress"
								autocomplete="on"
								name="email"
								type="text"
								value={this.state.email}
								onChange={this.handleEmailChange}/>
							{ this.displayErrors( "email" ) }

							<FieldGroup>
								<Label htmlFor="oldPassword">{ this.props.intl.formatMessage( messages.labelCurrentPassword ) }</Label>
								<TextInput
									id="oldPassword"
									type="password"
									value={this.state.oldPassword}
									onChange={this.handleOldPasswordChange}/>
								{ this.displayErrors( "oldPassword" ) }

								<Label htmlFor="newPassword">{ this.props.intl.formatMessage( messages.labelNewPassword ) }</Label>
								<TextInput
									id="newPassword"
									autocomplete="off"
									type="password"
									value={this.state.newPassword}
									onChange={this.handleNewPasswordChange}/>
								{ this.displayErrors( "newPassword" ) }

								<Label htmlFor="newPasswordCheck">{ this.props.intl.formatMessage( messages.labelNewPasswordConfirm ) }</Label>
								<TextInput
									id="newPasswordCheck"
									autocomplete="off"
									type="password"
									value={this.state.newPasswordCheck}
									onChange={this.handleNewPasswordCheckChange}/>
								{ this.displayErrors( "newPasswordCheck" ) }
							</FieldGroup>

							<SaveContainer>
								<Button type="submit" onClick={this.handleSubmit}
												disabled={ this.state.saving }>{ this.submitButtonText() }</Button>
								{ this.state.saved ? "Saved" : "" }

							</SaveContainer>
						</form>
					</Column>

					<Column>
						<Paragraph>{ this.props.intl.formatMessage( messages.labelProfilePicture ) }</Paragraph>
						<p>{ this.props.intl.formatMessage( messages.descriptionProfilePicture ) }</p>
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
};

ProfilePage.defaultProps = {};

export default injectIntl( ProfilePage );
