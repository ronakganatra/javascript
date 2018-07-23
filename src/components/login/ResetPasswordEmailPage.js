import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";

import { emailConstraints } from "./CommonConstraints";
import colors from "yoast-components/style-guide/colors.json";

// Images
import logo from "../../images/my-yoast-academy-logo.svg";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import { Button, ButtonLink } from "../Button";
import ValidationInputField from "../ValidationInputField";
import { StyledLabel } from "../Labels";
import { ButtonArea } from "../account/profile/FormElements";
import isEmpty from "lodash/isEmpty";
import { Redirect } from "react-router";
import ErrorDisplay from "../../errors/ErrorDisplay";

const messages = defineMessages( {
	passwordResetTitle: {
		id: "reset.password",
		defaultMessage: "Password reset",
	},
	labelEmail: {
		id: "email.address",
		defaultMessage: "Email address",
	},
	emailAddressMessage: {
		id: "email.address.message",
		defaultMessage: "Please enter your email address. You will receive a link to create a new password via email.",
	},
	sendButton: {
		id: "reset.button",
		defaultMessage: "Send password reset email",
	},
	loadingButton: {
		id: "reset.button.loading",
		defaultMessage: "...sending password reset email",
	},
	backButton: {
		id: "back.button",
		defaultMessage: "Back to login form",
	},
} );

// Styled components.
const Header = styled.div`
	text-align: center;
	margin-bottom: 40px;
`;

const Logos = styled.img`
	width: 360px;
`;

const Column = styled.div`
	margin: 20px;
`;

const Title = styled.h1`
	margin-bottom: 0.5em;
`;

const TextInput = styled( ValidationInputField )`
	background-color: ${ colors.$color_background_light };
`;

const FormGroup = styled.form`
	/* To glue SaveButtonArea to bottom of column. */
	position: relative;
	width: 100%;
	min-height: 300px;
	margin-top: 40px;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const Label = styled( StyledLabel )`
	margin-top: 5px;
`;

const EmailButtonArea = styled( ButtonArea )`
	margin-top: 3em;
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
	width: 100%;
	background-color: ${ props => props.enabledStyle ? colors.$color_green_medium_light : colors.$color_grey_disabled };
`;

const BackButton = styled( ButtonLink )`
	margin: 1em 0;
	width: 100%;
	color: ${ colors.$color_black };
	background-color: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_black };
	text-shadow: none;

	&:hover,
	&:focus {
		background-color: ${ colors.$color_green_medium_light };
		color: ${ colors.$color_white };
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		border: 0;
	}
`;

/**
 * Page to send a email to reset the password of an account.
 */
class ResetPasswordEmailPage extends React.Component {

	constructor( props ) {
		super( props );

		// Default state.
		this.state = {
			email: this.props.email,
			errors: [],
		};

		this.handleSubmit = this.handleSubmit.bind( this );

		this.onUpdateEmail = this.onUpdateEmail.bind( this, "email" );

		// Validation constraints.
		this.constraints = {
			email: emailConstraints( this.props.intl ),
		};
	}

	/**
	 * Updates the specified field in the state,
	 * to be used as callback functions in text input fields.
	 *
	 * @param {string} field the field in the state that should be updated.
	 * @param {Object} event the input field change event.
	 * @param {array} errors The email related errors.
	 * @returns {void}
	 */
	onUpdateEmail( field, event, errors = [] ) {
		let obj = {};
		obj[ field ] = event.target.value;
		obj.errors = errors;
		this.setState( obj );
	}

	/**
	 * Provides the email address to send a pass word reset link to.
	 *
	 * @param { object } event The button click event.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if( isEmpty( this.state.email ) ) {
			return;
		}
		let email = this.state.email;
		let data = { email };
		this.props.attemptResetPasswordEmail( data );
	}

	render() {
		if( this.props.passwordRequestSent ) {
			return ( <Redirect to={ "/forgot-password/check-your-email" } /> );
		}

		let buttonText = messages.sendButton;

		if( this.props.loading ) {
			buttonText = messages.loadingButton;
		}
		console.log( this.state.email.length > 0, this.state.errors.length === 0, this.props.loading === false );
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } alt="MyYoast - Yoast Academy" />
					</Header>
					<Title>
						<FormattedMessage { ...messages.passwordResetTitle }/>
					</Title>
					<FormattedMessage { ...messages.emailAddressMessage } />
					<FormGroup onSubmit={ this.handleSubmit }>
						<ErrorDisplay error={ this.props.error } />
						<LabelBlock>
							<Label htmlFor="email">
								<FormattedMessage { ...messages.labelEmail } />
							</Label>
							<TextInput
								id="email"
								name="email"
								type="email"
								errors={ [] }
								onChange={ this.onUpdateEmail }
								constraint={ emailConstraints( this.props.intl ) }
							/>
						</LabelBlock>

						<EmailButtonArea>
							<SaveButton type="submit" enabledStyle={ this.state.email.length > 0 && this.state.errors.length === 0 && this.props.loading === false }>
								<FormattedMessage { ...buttonText } />
							</SaveButton>
							<BackButton enabledStyle={ true } to="../login">
								<FormattedMessage { ...messages.backButton } />
							</BackButton>
						</EmailButtonArea>
					</FormGroup>
				</Column>
			</LoginColumnLayout>
		);
	}
}

ResetPasswordEmailPage.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.array,
	email: PropTypes.string,
	passwordRequestSent: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object,
	attemptResetPasswordEmail: PropTypes.func,
};

ResetPasswordEmailPage.defaultProps = {
	email: "",
	passwordRequestSent: false,
	loading: false,
	error: null,
};

export default injectIntl( ResetPasswordEmailPage );
