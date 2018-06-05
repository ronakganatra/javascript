import PropTypes from "prop-types";
import React from "react";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import { injectIntl, defineMessages, FormattedMessage, intlShape } from "react-intl";

// Components.
import { Button } from "../Button";
import ValidationInputField from "../ValidationInputField";
import Checkbox from "../Checkbox";
import { StyledLabel } from "../Labels";

// Styled components.
const TextInput = styled( ValidationInputField )`
	background-color: ${ colors.$color_background_light };
`;

const FormGroup = styled.form`
	/* To glue SaveButtonArea to bottom of column. */
	position: relative;
	width: 400px;
	height: 400px;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const Label = styled( StyledLabel )`
	margin-top: 5px;
`;

const ForgotPasswordLink = styled.div`
	margin-top: 10px;
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

const RememberMe = styled.div`
	margin-top: 20px;
	width: 100%;
	font-weight: 700;
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
	loginButton: {
		id: "login.login",
		defaultMessage: "Log in",
	},
	rememberMe: {
		id: "login,rememberMe",
		defaultMessage: "Remember me",
	},
	forgotPassword: {
		id: "login.forgotPassword",
		defaultMessage: "Forgot your password?",
	},
} );

/**
 * Login component for logging in to MyYoast.
 */
class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			email: "",
			password: "",
			errors: {},
			rememberMe: this.props.rememberMe,
		};

		this.handleSubmit = this.handleSubmit.bind( this );
		this.onRememberCheck = this.onRememberCheck.bind( this );
		this.onUpdateEmail = this.onUpdateField.bind( this, "email" );
		this.onUpdatePassword = this.onUpdateField.bind( this, "password" );
	}

	onRememberCheck( event ) {
		this.setState( {
			rememberMe: event.target.checked,
		} );
	}

	onUpdateField( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	handleSubmit() {
	}

	render() {
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
						errors={ this.state.errors.password }
						onChange={ this.onUpdatePassword }
					/>
				</LabelBlock>

				<ForgotPasswordLink>
					<a href={ "" }>
						<FormattedMessage { ...messages.forgotPassword } />
					</a>
				</ForgotPasswordLink>

				<RememberMe>
					<Checkbox onCheck={ this.onRememberCheck } checked={ this.state.rememberMe }>
						<FormattedMessage { ...messages.rememberMe } />
					</Checkbox>
				</RememberMe>

				<SaveButtonArea>
					<SaveButton type="submit">
						<FormattedMessage { ...messages.loginButton } />
					</SaveButton>
				</SaveButtonArea>
			</FormGroup>
		);
	}
}

Login.propTypes = {
	intl: intlShape.isRequired,
	rememberMe: PropTypes.bool,
};

Login.defaultProps = {
	rememberMe: false,
};

export default injectIntl( Login );
