import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";

import { doRequest, prepareInternalRequest } from "../../functions/api";

import colors from "yoast-components/style-guide/colors";
import sampleHeader from "../../images/sample_course_card_header.png";

// Custom components
import CourseCardContainer from "./CourseCardContainer";
import { ButtonLink, LinkButton, LargeSecondaryButtonLink } from "../Button";
import MyYoastModal from "../MyYoastModal";
import CourseInvite from "../CourseInvite";
import ProgressBar from "../ProgressBar";

const ActionBlock = styled.div`
	padding: 20px;
	text-align: center;
`;

const AvailableEnrollment = styled.p`
	font-weight: bold;
	margin: 0;
	margin-top: 20px;
`;

const Button = styled( ButtonLink )`
	margin-top: 20px;
	background-color: ${ props => props.color };
	width: 100%;
`;

const SecondaryButton = styled( LargeSecondaryButtonLink )`
	margin-top: 20px;
	width: 100%;
`;

const messages = defineMessages( {
	buyButton: {
		id: "coursecard.buyButton",
		defaultMessage: "Get the full course",
	},
	startButton: {
		id: "coursecard.startButton",
		defaultMessage: "Start this course",
	},
	continueButton: {
		id: "coursecard.continueButton",
		defaultMessage: "Continue this course",
	},
	viewCertificateButton: {
		id: "coursecard.viewCertificate",
		defaultMessage: "View certificate",
	},
	assignToSomeoneElse: {
		id: "coursecard.assignToSomeoneElse",
		defaultMessage: "Assign to someone else",
	},
	assignCourses: {
		id: "coursecard.assign",
		defaultMessage: "Assign courses",
	},
	nrAssigned: {
		id: "coursecard.nrAssigned",
		defaultMessage: "{assigned} / {total} assigned.",
	},
} );

class CourseCard extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			modalOpen: false,
			email: "",
			confirmationEmail: "",
		};

		this.sendInvite = this.sendInvite.bind( this );
		this.closeModal = this.closeModal.bind( this );
		this.openModal = this.openModal.bind( this );
	}

	/**
	 * Returns the invite student modal component.
	 *
	 * @param {boolean} open if the modal should be open or not.
	 * @returns {React.Component} the modal
	 */
	getInviteModal( open ) {
		const modalAriaLabel = defineMessages( {
			id: "modal.arialabel.invite",
			defaultMessage: "Send course invite",
		} );

		return (
			<MyYoastModal
				isOpen={ open }
				onClose={ () => "" }
				modalAriaLabel={ modalAriaLabel }
			>
				<CourseInvite
					inviteStudentEmail={ this.state.email }
					inviteStudentEmailConfirmation={ this.state.confirmationEmail }

					onStudentEmailChange={ value => this.setField( "email", value ) }
					onStudentEmailConfirmationChange={ value => this.setField( "confirmationEmail", value ) }

					onCancelClick={ this.closeModal }
					onInviteClick={ this.sendInvite }

					courseInviteError={ this.state.courseInviteError }
				/>
			</MyYoastModal>
		);
	}

	/**
	 * Opens the invite student modal.
	 *
	 * @returns {void}
	 */
	openModal() {
		this.setField( "modalOpen", true );
	}

	/**
	 * Closes the invite student modal.
	 *
	 * @returns {void}
	 */
	closeModal() {
		this.setState( {
			modalOpen: false,
			courseInviteError: null,
		} );
	}

	/**
	 * Sets the given field in the state to the given value.
	 *
	 * @param {string} field the field to overwrite
	 * @param {*} value the value to store
	 * @returns {void}
	 */
	setField( field, value ) {
		this.setState( {
			[ field ]: value,
		} );
	}

	/**
	 * Sends an invite to join the course to the email address as
	 * written in the state.
	 *
	 * @returns {Promise} the promise made after sending the invite through the server
	 */
	sendInvite() {
		let request = prepareInternalRequest(
			`CourseEnrollments/${this.props.availableEnrollment}/invite/`,
			"POST",
			{ email: this.state.email } );

		return doRequest( request )
			.then( () => {
				this.props.loadCourses();
				this.closeModal();
			} )
			.catch( error => {
				this.setField( "courseInviteError", error );
			} );
	}

	/**
	 * Returns a link, disguised as a colored button.
	 *
	 * @param {string} url the url to which to link
	 * @param {string} color the color of the button
	 * @param {object} message the message to display on the button
	 * @returns {React.Component} the button
	 */
	getButton( url, color, message ) {
		return <Button to={ url }
					   linkTarget="_blank"
					   color={ color }>
			<FormattedMessage { ...message } />
		</Button>;
	}

	/**
	 * A button to view the certificate for the course.
	 *
	 * @returns {React.Component} the button
	 */
	getCertificateButton() {
		return <SecondaryButton to={ this.props.certificateUrl }
								linkTarget="_blank">
			<FormattedMessage { ...messages.viewCertificateButton } />
		</SecondaryButton>;
	}

	/**
	 * Returns a component displaying the current progress
	 * (or a link to assign someone else to the course if the course hasn't been started yet)
	 * and a button to either go to the course in academy or view the certificate.
	 *
	 * @returns {React.Component} the component
	 */
	getProgressBlock() {
		let progressBar;
		let button;

		if ( this.props.progress === 0 ) {
			// 0 progress, show a link to assign another user and a button to start the course.
			progressBar =
				<LinkButton onClick={ this.openModal }>
					<FormattedMessage { ...messages.assignToSomeoneElse } />
				</LinkButton>;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.startButton );
		} else if ( this.props.progress < 100 ) {
			// Some progress, show a progress bar and a button to continue the course.
			progressBar = <ProgressBar progress={ this.props.progress } />;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.continueButton );
		} else {
			// Course finished, show a progress bar and a button to the certificate.
			progressBar = <ProgressBar progress={ this.props.progress } />;
			button = this.getCertificateButton();
		}

		return <Fragment>
			{ progressBar }
			{ button }
		</Fragment>;
	}

	/**
	 * Returns a component displaying the number of courses assigned
	 * and a link for opening the modal to assign the course to new users.
	 *
	 * @returns {React.Component} The component.
	 */
	getAssignCoursesRow() {
		return <AvailableEnrollment>
			<FormattedMessage
				id={ messages.nrAssigned.id }
				defaultMessage={ messages.nrAssigned.defaultMessage }
				values={ { assigned: this.props.enrollments, total: this.props.totalEnrollments } }
			/>
			<LinkButton onClick={ this.openModal }>
				<FormattedMessage { ...messages.assignCourses } />
			</LinkButton>
		</AvailableEnrollment>;
	}

	render() {
		return <CourseCardContainer
			image={ this.props.image }
			title={ this.props.title }
			description={ this.props.description }
		>
			<ActionBlock>
				{ this.props.isEnrolled ? this.getProgressBlock()
					: this.getButton( this.props.shopUrl, colors.$color_pink_dark, messages.buyButton ) }
				{ this.props.availableEnrollment ? this.getAssignCoursesRow() : null }
			</ActionBlock>
			{ this.getInviteModal( this.state.modalOpen ) }
		</CourseCardContainer>;
	}
}

export default injectIntl( CourseCard );

CourseCard.propTypes = {
	intl: intlShape.isRequired,

	title: PropTypes.string,
	image: PropTypes.string,
	description: PropTypes.string,

	progress: PropTypes.number,

	totalEnrollments: PropTypes.number,
	enrollments: PropTypes.number,
	availableEnrollment: PropTypes.any,
	isEnrolled: PropTypes.bool,

	courseUrl: PropTypes.string,
	certificateUrl: PropTypes.string,

	shopUrl: PropTypes.string,

	loadCourses: PropTypes.func.isRequired,
};

CourseCard.defaultProps = {
	description: "You want to be found by customers but you don’t know where to start? Follow this course!",
	title: "Basic SEO",

	image: sampleHeader,
	isEnrolled: true,
	progress: 50,

	courseUrl: "",
	certificateUrl: "",
	shopUrl: "",

	availableEnrollment: "a",
	totalEnrollments: 4,
	enrollments: 2,
};
