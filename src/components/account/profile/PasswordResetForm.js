import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import { InputField } from "../../InputField";
import { StyledLabel } from "../../Labels";
import _every from "lodash/every";
import getFormButtons, { announceActions } from "./FormButtons";

const messages = defineMessages( {
	confirmPassword: {
		id: "confirm.password",
		defaultMessage: "Confirm new password",
	},
	currentPassword: {
		id: "current.password",
		defaultMessage: "Current password",
	},
	newPassword: {
		id: "new.password",
		defaultMessage: "New password",
	},
	saving: {
		id: "profile.saving",
		defaultMessage: "Saving...",
	},
	saved: {
		id: "profile.saved",
		defaultMessage: "Profile saved",
	},
} );

const FormGroup = styled.form`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
`;

const TextInput = styled( InputField )`
	background-color: ${ colors.$color_background_light };
`;


/**
 * Returns the rendered PasswordResetForm component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ProfileForm component.
 */
class PasswordResetForm extends React.Component {
	/**
	 * Constructs the ProfileForm class.
	 *
	 * Sets (input) validation constraints, including password.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			currentPassword: this.props.passWord,
			newPassword: "",
			confirmPassword: "",
		};

		this.isSaved = this.isSaved.bind( this );
		this.isSaving = this.isSaving.bind( this );
		this.onCurrentPassword = this.onCurrentPassword.bind( this );
		this.onNewPassword = this.onNewPassword.bind( this );
		this.onConfirmPassword = this.onConfirmPassword.bind( this );
		this.discardChanges = this.discardChanges.bind( this );
	}

	/**
	 * Whether we are currently saving.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaving() {
		return this.props.isSaving;
	}

	/**
	 * Whether we have saved.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */

	isSaved() {
		return this.props.isSaved && _every( [ "current password" ], key => this.props[ key ] === this.state[ key ] );
	}
	/**
	 * Returns the save email elements for the profile page.
	 *
	 * @returns {ReactElement} The elements for the save email.
	 */

	onCurrentPassword( event ) {
		this.setState( { currentPassword: event.target.value } );
	}
	onNewPassword( event ) {
		this.setState( { newPassword: event.target.value } );
	}
	onConfirmPassword( event ) {
		this.setState( { confirmPassword: event.target.value } );
	}

	/**
	 * Discards the changes of personal info and resets it to initial state.
	 *
	 * @returns {void}
	 */
	discardChanges() {
		this.setState( {
			currentPassword: this.props.passWord,
			newPassword: "",
			confirmPassword: "",
		} );
	}

	componentDidUpdate() {
		announceActions();
	}

	componentWillUnmount() {
		this.props.resetSaveMessage();
	}

	handleSubmit( event, ownProps ) {
		event.preventDefault();
		/*
		 * While saving: prevent multiple submissions but don't disable the
		 * button for better accessibility (avoid keyboard focus loss).
		 */
		if ( this.isSaving() ) {
			return;
		}
		let password = {
			/* eslint-disable camelcase */
			password: this.state.password,
		};

		this.props.onSavePassword( password );
	}
	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let passwordResetError = "";
		let passwordResetMessage = "";

		let passwordSaveMessage = "";
		if ( passwordResetError !== "" ) {
			passwordSaveMessage = passwordResetMessage;
		}
		return (
				<FormGroup onSubmit={ this.handleSubmit }>
					<StyledLabel htmlFor="current-password">
						<FormattedMessage
							id={messages.currentPassword.id}
							defaultMessage={messages.currentPassword.defaultMessage}
						/>
					</StyledLabel>
					<TextInput
						width="100%"
						margin-right="5px"
						id="current-password"
						name="current password"
						type="text"
						value={ this.state.currentPassword }
						onChange={ this.onCurrentPassword }
					/>
					<StyledLabel htmlFor="new-password">
						<FormattedMessage
							id={messages.newPassword.id}
							defaultMessage={messages.newPassword.defaultMessage}
						/>
					</StyledLabel>
					<TextInput
						width="100%"
						margin-right="5px"
						id="new-password"
						name="new password"
						type="text"
						value={ this.state.newPassword }
						onChange={ this.onNewPassword }
					/>
					<StyledLabel htmlFor="confirm-password">
						<FormattedMessage
							id={messages.confirmPassword.id}
							defaultMessage={messages.confirmPassword.defaultMessage}
						/>
					</StyledLabel>
					<TextInput
						width="100%"
						margin-right="5px"
						id="confirm-password"
						name="confirm password"
						type="text"
						value={ this.state.confirmPassword }
						onChange={ this.onConfirmPassword }
					/>
					{ getFormButtons( passwordSaveMessage, this.discardChanges ) }
				</FormGroup>
		);
	}
}

PasswordResetForm.propTypes = {
	intl: intlShape.isRequired,
	onSavePassword: PropTypes.func,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	passWord:PropTypes.string,
	resetSaveMessage: PropTypes.func,
};

PasswordResetForm.defaultProps = {
	passWord: "",
	isSaving: false,
	isSaved: false,
};

export default injectIntl( PasswordResetForm );
