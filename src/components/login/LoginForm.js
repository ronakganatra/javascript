import PropTypes from "prop-types";
import React  from "react";
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
	labelOTP: {
		id: "signup.otp",
		defaultMessage: "Verification code",
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

			{
				props.requireOTP &&
				<LabelBlock>
					<Label htmlFor="otp">
						<FormattedMessage { ...messages.labelOTP } />
					</Label>
					<TextInput
						id="otp"
						name="otp"
						type="text"
						onChange={ props.onUpdateOTP }
					/>
				</LabelBlock>
			}

			<ForgotPasswordLink>
				<a href="/forgot-password">
					<FormattedMessage { ...messages.forgotPassword } />
				</a>
			</ForgotPasswordLink>

			<RememberMe>
				<Checkbox
					id="remember-me"
					labelText={ props.intl.formatMessage( messages.rememberMe ) }
					onCheck={ props.onRememberCheck }
					checked={ props.rememberMe }
				/>
			</RememberMe>

			<SaveButton type="submit" enabledStyle={ ! disabled }>
				<FormattedMessage { ...buttonText } />
			</SaveButton>
		</FormGroup>
	);
};

LoginForm.propTypes = {
	intl: intlShape.isRequired,
	rememberMe: PropTypes.bool,
	email: PropTypes.string,
	password: PropTypes.string,
	errors: PropTypes.object,
	onUpdateEmail: PropTypes.func.isRequired,
	onUpdatePassword: PropTypes.func.isRequired,
	onUpdateOTP: PropTypes.func.isRequired,
	onRememberCheck: PropTypes.func,
	handleSubmit: PropTypes.func,
	loading: PropTypes.bool,
	requireOTP: PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
	rememberMe: false,
	email: "",
	password: "",
	errors: null,
	loading: false,
	requireOTP: false,
};

export default injectIntl( LoginForm );
