import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { injectIntl, intlShape, FormattedMessage, defineMessages } from "react-intl";
import { StyledLabel } from "../../Labels";
import { getChangeButtons, FormGroup, TextInput } from "./FormElements";
import _every from "lodash/every";
import ErrorDisplay from "../../../errors/ErrorDisplay";
import isShallowEqual from "@wordpress/is-shallow-equal";

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
	 * Handles the change event on the current password input field and sets the currentPassword state.
	 *
	 * @param {object} event The input field change event.
	 *
	 * @returns {void}
	 */
	onCurrentPassword( event ) {
		this.setState( { currentPassword: event.target.value } );
	}

	/**
	 * Handles the change event on the new password input field and sets the newPassword state.
	 *
	 * @param {object} event The input field change event.
	 *
	 * @returns {void}
	 */
	onNewPassword( event ) {
		this.setState( { newPassword: event.target.value } );
	}

	/**
	 * Handles the change event on the confirm new password input field and sets the confirmPassword state.
	 *
	 * @param {object} event The input field change event.
	 *
	 * @returns {void}
	 */
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

	/**
	 * Handles the submit event on the form.
	 *
	 * @param {object} event The form submit event.
	 *
	 * @returns {void}
	 */
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

	/**
	 * Tries to reduce rerenderings when props and state don't change.
	 *
	 * Useful when other child components trigger parent componet updates.
	 *
	 * @param {object} nextProps The next props.
	 * @param {object} nextState The next state.
	 *
	 * @returns {void}
	 */
	shouldComponentUpdate( nextProps, nextState ) {
		return ! isShallowEqual( nextProps, this.props ) || ! isShallowEqual( nextState, this.state );
	}

	/**
	 * Resets the profile saved message when the component unmounts.
	 *
	 * @returns {void}
	 */
	componentWillUnmount() {
		this.props.resetSaveMessage();
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
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
	onSavePassword: PropTypes.func.isRequired,
	isSavingPassword: PropTypes.bool,
	passwordIsSaved: PropTypes.bool,
	passwordResetError: PropTypes.object,
	resetSaveMessage: PropTypes.func.isRequired,
};

PasswordResetForm.defaultProps = {
	isSavingPassword: false,
	passwordIsSaved: false,
	passwordResetError: {},
};

export default injectIntl( PasswordResetForm );
