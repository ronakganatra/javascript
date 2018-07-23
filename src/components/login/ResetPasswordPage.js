import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";
import queryString from "query-string";

import { passwordConstraints, passwordRepeatConstraint } from "./CommonConstraints";
import colors from "yoast-components/style-guide/colors.json";

// Images
import logo from "../../images/my-yoast-academy-logo.svg";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import { Button } from "../Button";
import ValidationInputField from "../ValidationInputField";
import { StyledLabel } from "../Labels";

const messages = defineMessages( {
	labelPassword: {
		id: "reset.newPassword",
		defaultMessage: "New password",
	},
	labelPasswordRepeat: {
		id: "reset.newPasswordRepeat",
		defaultMessage: "Repeat new password",
	},
	resetMessage: {
		id: "reset.message",
		defaultMessage: "Please enter a new password for the MyYoast account linked to {email}.",
	},
	resetButton: {
		id: "reset.button",
		defaultMessage: "Confirm password change",
	},
} );

// Styled components.
const Header = styled.div`
	text-align: center;
	margin-bottom: 40px;
`;

const Column = styled.div`
	margin: 20px;
`;

const TextInput = styled( ValidationInputField )`
	background-color: ${ colors.$color_background_light };
`;

const Logos = styled.img`
	width: 360px;
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

const SaveButtonArea = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
	width: 100%;
`;

/**
 * Page to change the password of an account.
 */
class ResetPasswordPage extends React.Component {

	constructor( props ) {
		super( props );

		// Default state.
		this.state = {
			password: "",
			passwordRepeat: "",
			errors: {},
		};

		this.handleSubmit = this.handleSubmit.bind( this );

		this.onUpdatePassword = this.onUpdate.bind( this, "password" );
		this.onUpdatePasswordRepeat = this.onUpdate.bind( this, "passwordRepeat" );
		this.validate = this.validate.bind( this );

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
	 * Validates the password and password repeat fields
	 * and returns an array of errors if there are any errors,
	 * and an empty array if none are present.
	 *
	 * @returns {string[]} the array of error messages.
	 */
	validate() {
		if ( this.state.passwordRepeat.length === 0 ) {
			return [];
		}

		let errors = validate( {
			password: this.state.password,
			passwordRepeat: this.state.passwordRepeat,
		}, this.constraints );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}
		return errors;
	}

	/**
	 * Resets the user's password.
	 *
	 * @param { object } event The button click event.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		// Reset password query to get the key and user_login which are needed for the API.
		let queryReset = queryString.parse( this.props.location.Search, { arrayFormat: "bracket" } );
		let data = {
			newPassword: this.state.password,
			repeatPassword: this.state.passwordRepeat,
			userLogin: queryReset.user_login,
			key: queryReset.key || "",
		};

		this.props.attemptResetPassword( data );
	}

	render() {
		let errors = this.validate( this.state.password, this.state.passwordRepeat );
		// I if(this.state.donenoemditalsjeblieftbeter){
		// I	return <Redirect to={"/success"}>;
		// I }
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } />
					</Header>
					<FormattedMessage
						id={ messages.resetMessage.id }
						defaultMessage={ messages.resetMessage.defaultMessage }
						values={ { email: this.props.email } }
					/>
					<FormGroup onSubmit={ this.handleSubmit }>

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

						<SaveButtonArea>
							<SaveButton type="submit" >
								<FormattedMessage { ...messages.resetButton } />
							</SaveButton>
						</SaveButtonArea>
					</FormGroup>
				</Column>
			</LoginColumnLayout>
		);
	}
}

ResetPasswordPage.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.array,
	email: PropTypes.string,
	attemptResetPassword: PropTypes.func.isRequired,
	location: PropTypes.object,
};

ResetPasswordPage.defaultProps = {
	email: "[undefined]",
};

export default injectIntl( ResetPasswordPage );
