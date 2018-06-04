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
	width: 384px;
	height: 480px;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const ForgotPasswordLink = styled.a`
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

const RememberMe = styled.div`
	margin-top: 10px;
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
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind( this );
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
						errors={ this.state.errors.password }
					/>
				</LabelBlock>

				<ForgotPasswordLink href={ "" }>
					<FormattedMessage { ...messages.forgotPassword } />
				</ForgotPasswordLink>

				<RememberMe>
					<Checkbox> <FormattedMessage { ...messages.rememberMe } /> </Checkbox>
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
	email: PropTypes.string,
};

Login.defaultProps = {
	email: "",
};

export default injectIntl( Login );
