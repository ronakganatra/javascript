import PropTypes from "prop-types";
import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import { addPlaceholderStyles } from "../styles/inputs";
import colors from "yoast-components/style-guide/colors.json";
import { ModalHeading } from "./Headings";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "./Button.js";
import defaults from "../config/defaults.json";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";
import ErrorDisplay from "../errors/ErrorDisplay";
import { StyledLabel } from "./Labels";

const messages = defineMessages( {
	inviteEmail: {
		id: "invite.modal.email.invalid",
		defaultMessage: "Please enter a valid email address.",
	},
	confirmationEmailNotEqual: {
		id: "invite.modal.confirmation.unequal",
		defaultMessage: "Email addresses do not match. Please ensure you have entered the correct email address.",
	},
	studentMail: {
		id: "invite.modal.student.email",
		defaultMessage: "Student email",
	},
	studentMailConfirm: {
		id: "invite.modal.student.email-confirm",
		defaultMessage: "Confirm student email",
	},
} );

const CourseInviteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-size: 1em;
`;

const StudentEmailInput = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
	margin-bottom: 8px;
` );

const Buttons = styled.div`
	flex: 1 0 200px;
	text-align: right;
	margin: 32px 0 16px;

	a,
	button {
		margin-left: 12px;
	}

	@media screen and (max-width: ${ defaults.css.breakpoint.mobile }px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		a,
		button {
			margin-left: 0;
			margin-bottom: 8px;
		}
	}
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );


class CourseInvite extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = { warnings: [] };

		this.validateFields = this.validateFields.bind( this );

		// Validation constraints.
		this.constraints = {
			email: this.emailConstraints.bind( this ),
			confirmationEmail: { equality: { attribute: "email", message: this.props.intl.formatMessage( messages.confirmationEmailNotEqual ) } },
		};
	}

	/**
	 * Handles the submit event.
	 *
	 * @param {object} event The submit event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		const warnings = this.validateFields();
		this.setState( { warnings } );

		if ( warnings.length === 0 ) {
			this.props.onInviteClick();
		}
	}

	/**
	 * Extract the string in the email input field when changed.
	 *
	 * @param {Object} event The input field change event.
	 *
	 * @returns {void}
	 */
	onEmailInputChange( event ) {
		const value = event.target.value;
		this.props.onStudentEmailChange( value );
	}

	/**
	 * Extract the string in the email confirmation input field when changed.
	 *
	 * @param {Object} event The input field change event.
	 *
	 * @returns {void}
	 */
	onEmailConfirmationInputChange( event ) {
		const value = event.target.value;
		this.props.onStudentEmailConfirmationChange( value );
	}

	/**
	 * Runs the fields through the validator and returns the warnings.
	 *
	 * @returns {Array} All validation warnings.
	 */
	validateFields() {
		let warnings = validate( {
			email: this.props.inviteStudentEmail,
			confirmationEmail: this.props.inviteStudentEmailConfirmation,
		}, this.constraints, { format: "detailed" } );

		if ( _isUndefined( warnings ) ) {
			warnings = [];
		}

		return warnings;
	}

	/**
	 * Creates the email constraints for validation.
	 *
	 * @param {string} value Current email value.
	 * @returns {Object} The constraint.
	 */
	emailConstraints( value ) {
		let output = {
			email: {
				message: this.props.intl.formatMessage( messages.inviteEmail, {
					field: "Email",
				} ),
			},
		};

		if ( ! value || value.length === 0 ) {
			output = {
				presence: {
					message: this.props.intl.formatMessage( messages.inviteEmail, {
						field: "Email",
					} ),
					allowEmpty: false,
				},
			};
		}

		return output;
	}

	/**
	 * Displays the warnings for the provided field.
	 *
	 * @param {Array} warnings The warnings that could be displayed.
	 * @param {string} field Field to display warnings for.
	 * @returns {ReactElement[]} List of JSXElements if warnings are found. Otherwise null.
	 */
	displayWarnings( warnings, field ) {
		// Find warnings for the specified field.
		const fieldWarnings = warnings.filter( warning => {
			return warning.attribute === field;
		} );

		// Return nothing if we don't have any warnings.
		if ( fieldWarnings.length === 0 ) {
			return null;
		}

		// Display all remaining warnings.
		return fieldWarnings.map( ( warning, index ) => {
			return <ErrorDisplay key={ index } error={ warning } type="warning" />;
		} );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<CourseInviteModal>
				<ModalHeading>
					<FormattedMessage id="courses.invite.header" defaultMessage="Invite student" />
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate={ true }>
					<StyledLabel htmlFor="course-invite-email-input">
						<FormattedMessage
							id="course.invite.email.input"
							defaultMessage="Please enter the email address of the student you would like to invite to this course:"
						/>
					</StyledLabel>
					<StudentEmailInput
						type="email"
						id="course-invite-email-input"
						placeholder={ this.props.intl.formatMessage( messages.studentMail ) }
						onChange={ this.onEmailInputChange.bind( this ) }
					/>
					{ this.displayWarnings( this.state.warnings, "email" ) }

					<StyledLabel htmlFor="course-invite-email-confirmation" id="confirmation-label">
						<FormattedMessage
							id="course.invite.email.confirmation"
							defaultMessage="Please confirm the email address by typing it again:"
						/>
					</StyledLabel>

					<StudentEmailInput
						type="email"
						id="course-invite-email-confirmation"
						placeholder={ this.props.intl.formatMessage( messages.studentMailConfirm ) }
						onChange={ this.onEmailConfirmationInputChange.bind( this ) }
					/>
					{ this.displayWarnings( this.state.warnings, "confirmationEmail" ) }
					<ErrorDisplay error={ this.props.courseInviteError } />
					<Buttons>
						<WideSecondaryButton onClick={ this.props.onCancelClick }>
							<FormattedMessage id="academy.invite.cancel" defaultMessage="Cancel" />
						</WideSecondaryButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ ! this.props.requestingCourseInvite }
						>
							{ this.props.requestingCourseInvite
								? <FormattedMessage id="academy.invite.inviting" defaultMessage="Inviting student..." />
								: <FormattedMessage id="academy.invite.invite" defaultMessage="Invite student" />
							}
						</WideLargeButton>
					</Buttons>
				</form>
			</CourseInviteModal>
		);
	}
}

CourseInvite.propTypes = {
	intl: intlShape.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	onInviteClick: PropTypes.func.isRequired,
	courseInviteError: PropTypes.object,
	requestingCourseInvite: PropTypes.bool,
	inviteStudentEmail: PropTypes.string,
	inviteStudentEmailConfirmation: PropTypes.string,
	onStudentEmailChange: PropTypes.func,
	onStudentEmailConfirmationChange: PropTypes.func,
};

export default injectIntl( CourseInvite );
