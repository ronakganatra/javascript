import PropTypes from "prop-types";
import React from "react";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";
import { injectIntl, defineMessages, FormattedMessage, intlShape } from "react-intl";

// Components.
import { Button } from "../Button";
import ValidationInputField from "../ValidationInputField";
import { StyledLabel } from "../Labels";

// Styled components.
const TextInput = styled( ValidationInputField )`
	background-color: ${ colors.$color_background_light };
`;

const FormGroup = styled.form`
	/* To glue SaveButtonArea to bottom of column. */
	position: relative;
	width: 400px;	
	min-height: 400px;	
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const Label = styled( StyledLabel )`
	margin-top: 5px;
`;

const SaveButtonArea = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
	width: 100%;
`;

// Messages
const messages = defineMessages( {
	labelEmail: {
		id: "signup.email",
		defaultMessage: "Email address",
	},
	labelPassword: {
		id: "signup.password",
		defaultMessage: "Password",
	},
	labelPasswordRepeat: {
		id: "signup.passwordRepeat",
		defaultMessage: "Repeat password",
	},
	createAccount: {
		id: "signup.create",
		defaultMessage: "Create account",
	},
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "^{field} must be a valid e-mail address.",
	},
	validationMinimumLength: {
		id: "validation.minimumLength",
		defaultMessage: "^{field} must have a minimum length of {minLength} characters.",
	},
	duplicateEmail: {
		id: "signup.error.duplicateEmail",
		defaultMessage: "The email address could not be added, it is probably already in use.",
	},
	passwordsDoNotMatch: {
		id: "signup.error.passwordsDoNotMatch",
		defaultMessage: "^Passwords do not match.",
	},
	passwordStrength: {
		id: "signup.password",
		defaultMessage: "^Your password is not strong enough. It should contain...",
	},
} );

// To check the strength of the password.
// const PASSWORD_STRENGTH_REGEX = new RegExp( "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" );
const PASSWORD_MINIMUM_LENGTH = 5;

/**
 * Test page to test the login layout / styling.
 */
class Signup extends React.Component {

	constructor( props ) {
		super( props );

		// Default state.
		this.state = {
			email: this.props.email,
			password: "",
			passwordRepeat: "",
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind( this );

		this.onUpdateEmail = this.onUpdate.bind( this, "email" );
		this.onUpdatePassword = this.onUpdate.bind( this, "password" );
		this.onUpdatePasswordRepeat = this.onUpdate.bind( this, "passwordRepeat" );

		// Validation constraints.
		this.constraints = {
			passwordRepeat: this.passwordRepeatConstraint(),
		};
	}

	onUpdate( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	emailConstraints() {
		return {
			email: {
				message: this.props.intl.formatMessage( messages.validationFormatEmail, {
					field: "Email",
				} ),
			},
		};
	}

	passwordConstraints() {
		return {
			length: {
				minimum: PASSWORD_MINIMUM_LENGTH,
				message: this.props.intl.formatMessage( messages.validationMinimumLength, {
					field: "Password",
					minLength: PASSWORD_MINIMUM_LENGTH,
				} ),
			},
		};
	}

	passwordRepeatConstraint() {
		return {
			equality: {
				attribute: "password",
				message: this.props.intl.formatMessage( messages.passwordsDoNotMatch ),
			},
		};
	}

	/**
	 * Returns the 'Create account' button.
	 *
	 * @returns {ReactElement} The 'Create account' button.
	 */
	getAccountButton() {
		return <SaveButtonArea>
			<SaveButton type="submit">
				<FormattedMessage { ...messages.createAccount } />
			</SaveButton>
		</SaveButtonArea>;
	}

	validate() {
		if ( this.state.passwordRepeat.length === 0 ) {
			return [];
		}

		let errors = validate( {
			email: this.state.email,
			password: this.state.password,
			passwordRepeat: this.state.passwordRepeat,
		}, this.constraints );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}
		return errors;
	}

	handleSubmit() {
	}

	render() {
		let errors = this.validate();
		return (
			<FormGroup onSubmit={ this.handleSubmit }>
				<LabelBlock>
					<Label htmlFor="email-address">
						<FormattedMessage { ...messages.labelEmail } />
					</Label>
					<TextInput
						id="email-address"
						autocomplete="on"
						name="email"
						type="text"
						value={ this.state.email }
						onChange={ this.onUpdateEmail }
						constraint={ this.emailConstraints() }
					/>
				</LabelBlock>
				<LabelBlock>
					<Label htmlFor="password">
						<FormattedMessage { ...messages.labelPassword } />
					</Label>
					<TextInput
						id="password"
						name="password"
						type="password"
						onChange={ this.onUpdatePassword }
						constraint={ this.passwordConstraints() }
					/>
				</LabelBlock>
				<LabelBlock>
					<Label htmlFor="password-repeat">
						<FormattedMessage { ...messages.labelPasswordRepeat } />
					</Label>
					<TextInput
						id="password-repeat"
						name="repeat password"
						type="password"
						onChange={ this.onUpdatePasswordRepeat }
						errors={ errors.passwordRepeat }
					/>
				</LabelBlock>
				{ this.getAccountButton() }
			</FormGroup>
		);
	}
}

Signup.propTypes = {
	intl: intlShape.isRequired,
	signupError: PropTypes.object,
	email: PropTypes.string,
};

Signup.defaultProps = {
	signupError: null,
	email: "",
};

export default injectIntl( Signup );
