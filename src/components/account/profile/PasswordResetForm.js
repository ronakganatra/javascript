import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import { StyledLabel } from "../../Labels";
import { announceActions, getChangeButtons, FormGroup, TextInput } from "./FormElements";
import _every from "lodash/every";
import ErrorDisplay from "../../../errors/ErrorDisplay";

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
} );

const FullWidthErrorDisplay = styled( ErrorDisplay )`
	width: 100%;
	margin-top: 1em;
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
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			onDiscard: false,
		};

		this.isSaved = this.isSaved.bind( this );
		this.onCurrentPassword = this.onCurrentPassword.bind( this );
		this.onNewPassword = this.onNewPassword.bind( this );
		this.onConfirmPassword = this.onConfirmPassword.bind( this );
		this.discardChanges = this.discardChanges.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	/**
	 * Sets the state according to the form field input.
	 *
	 * @param {event} event The event of editing a form field.
	 *
	 * @returns {void}
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
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			onDiscard: true,
		} );
	}

	/**
	 * Whether we have saved.
	 *
	 * @returns {boolean} Whether we are currently saving.
	 */
	isSaved() {
		return this.props.passwordIsSaved && ! this.state.onDiscard &&
			_every( [ "newPassword" ], key => this.props[ key ] === this.state[ key ] );
	}

	handleSubmit( event ) {
		event.preventDefault();
		/*
		 * While saving: prevent multiple submissions but don't disable the
		 * button for better accessibility (avoid keyboard focus loss).
		 */

		if ( this.props.isSavingPassword ) {
			return;
		}

		this.props.onSavePassword( {
			/* eslint-disable camelcase */
			password: this.state.newPassword,
			password_confirmation: this.state.confirmPassword,
			old_password: this.state.currentPassword,
			/* eslint-enable camelcase */
		} );

		this.setState( {
			onDiscard: false,
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		} );
	}

	componentDidUpdate() {
		announceActions( this.props.isSavingPassword, this.props.passwordIsSaved, "password", this.props.intl );
	}

	componentWillUnmount() {
		this.props.resetSaveMessage();
	}

	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		return (
			<FormGroup onSubmit={ this.handleSubmit }>
				<StyledLabel htmlFor="current-password">
					<FormattedMessage
						id={ messages.currentPassword.id }
						defaultMessage={ messages.currentPassword.defaultMessage }
					/>
				</StyledLabel>
				<TextInput
					width="100%"
					margin-right="5px"
					id="current-password"
					name="current password"
					type="password"
					value={ this.state.currentPassword }
					onChange={ this.onCurrentPassword }
				/>
				<StyledLabel htmlFor="new-password">
					<FormattedMessage
						id={ messages.newPassword.id }
						defaultMessage={ messages.newPassword.defaultMessage }
					/>
				</StyledLabel>
				<TextInput
					width="100%"
					margin-right="5px"
					id="new-password"
					name="new password"
					type="password"
					value={ this.state.newPassword }
					onChange={ this.onNewPassword }
				/>
				<StyledLabel htmlFor="confirm-password">
					<FormattedMessage
						id={ messages.confirmPassword.id }
						defaultMessage={ messages.confirmPassword.defaultMessage }
					/>
				</StyledLabel>
				<TextInput
					width="100%"
					margin-right="5px"
					id="confirm-password"
					name="confirm password"
					type="password"
					value={ this.state.confirmPassword }
					onChange={ this.onConfirmPassword }
				/>
				<FullWidthErrorDisplay error={ this.props.passwordResetError } />
				{ getChangeButtons( "password", this.props.intl, this.props.isSavingPassword, this.props.passwordIsSaved, this.discardChanges ) }
			</FormGroup>
		);
	}
}

PasswordResetForm.propTypes = {
	intl: intlShape.isRequired,
	onSavePassword: PropTypes.func,
	isSavingPassword: PropTypes.bool,
	passwordIsSaved: PropTypes.bool,
	passwordResetError: PropTypes.object,
	resetSaveMessage: PropTypes.func,
};

PasswordResetForm.defaultProps = {
	isSavingPassword: false,
	passwordIsSaved: false,
};

export default injectIntl( PasswordResetForm );
