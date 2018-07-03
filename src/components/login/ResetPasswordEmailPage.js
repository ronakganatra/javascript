import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";

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
	height: 300px;
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
			email: "",
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind( this );

		this.onUpdate = this.onUpdate.bind( this, "email" );

		this.validate = this.validate.bind( this );

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
	 * @returns {void}
	 */
	onUpdate( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	/**
	 * Validates the email fields
	 * and returns an array of errors if there are any errors,
	 * and an empty array if none are present.
	 *
	 * @returns {string[]} the array of error messages.
	 */
	validate() {
		if ( this.state.email.length === 0 ) {
			return [];
		}

		let errors = validate( {
			email: this.state.email,
		}, this.constraints );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}
		return errors;
	}

	/**
	 * Provides the email address to send a pass word reset link to.
	 * @returns {void}
	 */
	handleSubmit() {
		// Code to connect the UI with the send reset password email backend should go here.
	}

	render() {
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } />
					</Header>
					<Title>
						<FormattedMessage {...messages.passwordResetTitle }/>
					</Title>
					<FormattedMessage { ...messages.emailAddressMessage } />
					<FormGroup onSubmit={ this.handleSubmit }>

						<LabelBlock>
							<Label htmlFor="email">
								<FormattedMessage { ...messages.labelEmail } />
							</Label>
							<TextInput
								id="email"
								name="email"
								type="email"
								errors={ this.state.errors.email }
								onChange={ this.onUpdate }
								constraint={ emailConstraints( this.props.intl ) }
							/>
						</LabelBlock>

						<EmailButtonArea>
							<SaveButton type="submit">
								<FormattedMessage { ...messages.sendButton } />
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
};

ResetPasswordEmailPage.defaultProps = {
	email: "[undefined]",
};

export default injectIntl( ResetPasswordEmailPage );
