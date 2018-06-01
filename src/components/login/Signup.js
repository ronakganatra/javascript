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
	display: flex;
	flex-wrap: wrap;
	width: 384px;
	justify-content: space-between;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const SaveButtonArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
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
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	duplicateEmail: {
		id: "signup.error.duplicateEmail",
		defaultMessage: "The email address could not be added, it is probably already in use.",
	},
	passwordStrength: {
		id: "signup.password",
		defaultMessage: "Your password is not strong enough.",
	},
} );

// To check the strength of the password.
const passwordRegex = new RegExp( "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" );

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
		};

		this.handleSubmit = this.handleSubmit.bind( this );

		this.onUpdateEmail = this.onUpdate.bind( this, "email" );
		this.onUpdatePassword = this.onUpdate.bind( this, "password" );
		this.onUpdatePasswordRepeat = this.onUpdatePasswordRepeat.bind( this );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints(),
			password: this.passwordConstraints(),
			passwordRepeatErrors: [],
		};
	}

	onUpdate( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	/**
	 * Creates the email constraints for validation.
	 *
	 * @returns {Object} The constraint.
	 */
	emailConstraints() {
		return {
			length: {
				minimum: 1,
				message: this.props.intl.formatMessage( messages.validationRequired, {
					field: "Email",
				} ),
			},
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
				minimum: 1,
				message: this.props.intl.formatMessage( messages.validationRequired, {
					field: "Password",
				} ),
			},
			format: {
				pattern: passwordRegex,
				message: this.props.intl.formatMessage( messages.passwordStrength, {
					field: "Password",
				} ),
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
				<FormattedMessage id={ messages.createAccount.id }
								  defaultMessage={ messages.createAccount.defaultMessage } />
			</SaveButton>
		</SaveButtonArea>;
	}

	validatePasswordRepeat() {
		const constraint = { passwordRepeat: { equality: "password" } };

		let errors = validate( { password: this.state.password, passwordRepeat: this.state.passwordRepeat },
			constraint );

		if ( _isUndefined( errors ) ) {
			errors = [];
		} else {
			errors = errors.passwordRepeat;
		}

		return errors;
	}

	onUpdatePasswordRepeat( event ) {
		this.setState( {
			passwordRepeat: event.target.value,
			passwordRepeatErrors: this.validatePasswordRepeat(),
		} );
	}

	handleSubmit() {
	}

	render() {
		return (
			<FormGroup onSubmit={ this.handleSubmit }>
				<LabelBlock>
					<StyledLabel htmlFor="email-address">
						<FormattedMessage { ...messages.labelEmail } />
					</StyledLabel>
					<TextInput
						id="email-address"
						autocomplete="on"
						name="email"
						type="text"
						value={ this.state.email }
						onChange={ this.onUpdateEmail }
						constraint={ this.constraints.email }
					/>
				</LabelBlock>
				<LabelBlock>
					<StyledLabel htmlFor="password">
						<FormattedMessage { ...messages.labelPassword } />
					</StyledLabel>
					<TextInput
						id="password"
						name="password"
						type="password"
						onChange={ this.onUpdatePassword }
						constraint={ this.constraints.password }
					/>
				</LabelBlock>
				<LabelBlock>
					<StyledLabel htmlFor="password-repeat">
						<FormattedMessage { ...messages.labelPasswordRepeat } />
					</StyledLabel>
					<TextInput
						id="password-repeat"
						name="repeat password"
						type="password"
						onChange={ this.onUpdatePasswordRepeat }
						errors={ this.state.passwordRepeatErrors }
					/>
					{ this.getAccountButton() }
				</LabelBlock>
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
