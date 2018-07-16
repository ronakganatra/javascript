import PropTypes from "prop-types";
import React from "react";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";
import { injectIntl, defineMessages, FormattedMessage, intlShape } from "react-intl";

import { passwordRepeatConstraint, passwordConstraints, emailConstraints } from "./CommonConstraints";

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
	duplicateEmail: {
		id: "signup.error.duplicateEmail",
		defaultMessage: "The email address could not be added, it is probably already in use.",
	},
} );

/**
 * Sign up page where the user can sign up to MyYoast.
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
			passwordRepeat: passwordRepeatConstraint( this.props.intl ),
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

	/**
	 * Validates the email, password and password repeat fields
	 * and returns an array of errors if there are any,
	 * and an empty array if none are present.
	 *
	 * @returns {string[]} the array of error messages.
	 */
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

	/**
	 * Creates a new MyYoast account using the
	 * email address and password as entered in this component.
	 *
	 * @param { object } event The button click event.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		// Reset password query to get the key and user_login which are needed for the API.
		let data = {
			userEmail: this.state.email,
			password: this.state.password,
			repeatPassword: this.state.passwordRepeat,
		};
		console.log( "data in compoennt:", data );
		this.props.attemptSignup( data );
		// Code to connect UI with sign up back end code should go here.
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
						constraint={ emailConstraints( this.props.intl ) }
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
						constraint={ passwordConstraints( this.props.intl ) }
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
	location: PropTypes.object,
	attemptSignup: PropTypes.func.isRequired,
};

Signup.defaultProps = {
	signupError: null,
	email: "",
};

export default injectIntl( Signup );
