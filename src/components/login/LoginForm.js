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
import ErrorDisplay from "../../../src/errors/ErrorDisplay";

// Styled components.
const TextInput = styled( InputField )`
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

const ForgotPasswordLink = styled.div`
	margin-top: 10px;
`;

const SaveButtonArea = styled.div`
	
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
	width: 100%;

	 ${( { disableds } ) => disableds && `
	    background: ${colors.$color_grey_disabled };
	  `}
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
		id: "login.rememberMe",
		defaultMessage: "Remember me",
	},
	forgotPassword: {
		id: "login.forgotPassword",
		defaultMessage: "Forgot your password?",
	},
	loading: {
		id: "login.loading",
		defaultMessage: "Logging in...",
	},
} );

/**
 * Login component for logging in to MyYoast.
 *
 * @param {Object} props the props.
 *
 * @returns {ReactElement} The login form element.
 */
const LoginForm = ( props ) => {
	let disabled = props.loading;
	let buttonText = props.loading ? messages.loading : messages.loginButton;
	return (
		<FormGroup onSubmit={ props.handleSubmit }>
			<ErrorDisplay error={ props.errors }/>
			<LabelBlock>
				<Label htmlFor="email-address">
					<FormattedMessage { ...messages.labelEmail } />
				</Label>
				<TextInput
					id="email-address"
					autocomplete="on"
					name="email"
					type="text"
					value={ props.email }
					onChange={ props.onUpdateEmail }
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
					onChange={ props.onUpdatePassword }
				/>
			</LabelBlock>

			<ForgotPasswordLink>
				<a href="/forgot-password">
					<FormattedMessage { ...messages.forgotPassword } />
				</a>
			</ForgotPasswordLink>

			<RememberMe>
				<Checkbox id="remember-me" onCheck={ props.onRememberCheck } checked={ props.rememberMe }>
					<FormattedMessage { ...messages.rememberMe } />
				</Checkbox>
			</RememberMe>

			<SaveButtonArea>
				<SaveButton type="submit" enabledStyle={ ! disabled }>
					<FormattedMessage { ...buttonText } />
				</SaveButton>
			</SaveButtonArea>
		</FormGroup>
	);
};

LoginForm.propTypes = {
	intl: intlShape.isRequired,
	rememberMe: PropTypes.bool,
	email: PropTypes.string,
	password: PropTypes.string,
	errors: PropTypes.object,
	onUpdateEmail: PropTypes.func,
	onUpdatePassword: PropTypes.func,
	onRememberCheck: PropTypes.func,
	handleSubmit: PropTypes.func,
	loading: PropTypes.bool,
};

LoginForm.defaultProps = {
	rememberMe: false,
	email: "",
	password: "",
	errors: null,
	loading: false,
};

export default injectIntl( LoginForm );
