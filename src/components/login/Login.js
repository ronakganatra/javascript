import PropTypes from "prop-types";
import React from "react";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import { injectIntl, defineMessages, FormattedMessage, intlShape } from "react-intl";

// Components.
import { Button } from "../Button";
import { InputField } from "../InputField";
import Checkbox from "../Checkbox";
import { StyledLabel } from "../Labels";

const request = require( "request-promise-native" );

// Styled components.
const TextInput = styled( InputField )`
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

	/**
	 * Event listener, listening to changes of the
	 * 'remember me' checkbox (e.g. whether it is checked or not).
	 * @param {Object} event the input change event.
	 * @returns {void}
	 */
	onRememberCheck( event ) {
		this.setState( {
			rememberMe: event.target.checked,
		} );
	}

	/**
	 * Updates the specified field in the state,
	 * to be used as callback functions in text input fields.
	 *
	 * @param {string} field the field in the state that should be updated.
	 * @param {Object} event the input field change event.
	 * @returns {void}
	 */
	onUpdateField( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	/**
	 * Opens the door to the treasures of MyYoast,
	 * if their credentials are correctly filled in.
	 * @returns {Object} request The Request
	 */
	handleSubmit() {
		console.log( "this.state: ", this.state );
		return request( {
			method: "POST",
			uri: process.env.WP_API_URL + "/yoast/v1",
			json: {
				/* eslint-disable camelcase */
				user_login: this.state.email,
				password: this.state.password,
				errors: this.state.errors,
				remember: this.state.rememberMe,
				/* eslint-enable camelcase */
			},
			headers: { "Yoast-Token": process.env.YOAST_SECRET_SERVER_TOKEN	},
		} );
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
					<a href="">
						<FormattedMessage { ...messages.forgotPassword } />
					</a>
				</ForgotPasswordLink>

				<RememberMe>
					<Checkbox id="remember-me" onCheck={ this.onRememberCheck } checked={ this.state.rememberMe }>
						<Label htmlFor="remember-me">
							<FormattedMessage { ...messages.rememberMe } />
						</Label>
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
