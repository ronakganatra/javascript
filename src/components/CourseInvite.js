import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import styled from "styled-components";
import { addPlaceholderStyles } from "../styles/inputs";
import colors from "yoast-components/style-guide/colors.json";
import { ModalHeading } from "./Headings";
import { LargeButton, makeButtonFullWidth, LargeSecondaryButton } from "./Button.js";
import defaults from "../config/defaults.json";

// import ErrorDisplay from "../errors/ErrorDisplay";

// import validate from "validate.js";

// import { speak } from "@wordpress/a11y";
// import _debounce from "lodash/debounce";
// import ErrorDisplay from "../errors/ErrorDisplay";

// const messages = defineMessages( {
// 	validationFormatEmail: {
// 		id: "validation.format.email",
// 		defaultMessage: "Please enter a valid email address.",
// 	},
// } );

const CourseInviteModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-weight: 300;
	font-size: 1em;

	label {
		display: inline-block;
		font-weight: 300;
		font-size: 1em;
		margin: 16px 0 8px;
	}
`;

const StudentEmailInput = addPlaceholderStyles( styled.input`
	width: 100%;
	height: 48px;
	box-shadow: inset 0 2px 8px 0px rgba(0,0,0,0.3);
	background: ${ colors.$color_grey };
	padding: 0 0 0 10px;
	font-size: 1em;
	border: 0;
` );

const Buttons = styled.div`
	flex: 1 0 200px;
	padding: 8px 0;
	text-align: right;

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

/*
const ValidationText = styled.div`
	font-size: 1em;
	color: ${ colors.$color_red};
	margin: 1em 0;
	min-height: 1.8em;
`;
*/

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
		this.props.onInviteClick();
		if ( this.props.emailsAreEqual === true ) {
			console.log( "AWW YISSS" );
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
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<CourseInviteModal>
				<ModalHeading>
					<FormattedMessage id="courses.invite.header" defaultMessage="Invite student"/>
				</ModalHeading>

				<form onSubmit={ this.handleSubmit.bind( this ) } noValidate>
					<label htmlFor="course-invite-email-input">
						<FormattedMessage
							id="course.invite.email.input"
							defaultMessage="Please enter the email address of the student you would like to invite to this course:"
						/>
					</label>

					<StudentEmailInput
						type="email"
						id="course-invite-email-input"
						placeholder={ "Student email" }
						onChange={ this.onEmailInputChange.bind( this ) }
					/>

					<label htmlFor="course-invite-email-confirmation">
						<FormattedMessage
							id="course.invite.email.confirmation"
							defaultMessage="Please confirm the email address by typing it again:"
						/>
					</label>

					<StudentEmailInput
						type="email"
						id="course-invite-email-confirmation"
						placeholder={ "Student email" }
						onChange={ this.onEmailConfirmationInputChange.bind( this ) }
					/>

					<Buttons>
						<WideSecondaryButton onClick={ this.props.onCancelClick } >
							<FormattedMessage id="academy.invite.cancel" defaultMessage="cancel"/>
						</WideSecondaryButton>
						<WideLargeButton
							type="submit"
							enabledStyle={ true }
							aria-label="invite student"
						>
							<FormattedMessage id="academy.invite.invite" defaultMessage="invite student"/>
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
	error: PropTypes.object,
	onStudentEmailChange: PropTypes.func,
	onStudentEmailConfirmationChange: PropTypes.func,
	emailsAreEqual: PropTypes.bool,
};

export default injectIntl( CourseInvite );
