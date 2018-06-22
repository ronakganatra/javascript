import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";
import sampleHeader from "../../images/sample_course_card_header.png";

// Custom components
import CourseCardContainer from "./CourseCardContainer";
import { ButtonLink, LinkButton, LargeSecondaryButtonLink } from "../Button";
import Link from "../Link";
import ProgressBar from "../ProgressBar";

const ActionBlock = styled.div`
	padding: 24px;
	text-align: center;
`;

const AvailableEnrollment = styled.p`
	font-weight: bold;
	margin: 0;
	margin-top: 24px;
`;

const Button = styled( ButtonLink )`
	margin-top: ${ props => props.margin };
	background-color: ${ props => props.color };
	width: 100%;
`;

const SecondaryButton = styled( LargeSecondaryButtonLink )`
	margin-top: 24px;
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
		defaultMessage: "View your certificate",
	},
	assignToSomeoneElse: {
		id: "coursecard.assignToSomeoneElse",
		defaultMessage: "Assign to someone else",
	},
	assignCourses: {
		id: "coursecard.assign",
		defaultMessage: "Assign courses",
	},
	amountAssigned: {
		id: "coursecard.amountAssigned",
		defaultMessage: "{assigned} / {total} assigned.",
	},
	viewCourse: {
		id: "coursecard.viewCourse",
		defaultMessage: "View",
	},
	getMore: {
		id: "courseCard.getMore",
		defaultMessage: "Get more",
	},
} );

class CourseCard extends React.Component {

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
	 * Returns a link, disguised as a colored button.
	 *
	 * @param {string} url the url to which to link
	 * @param {string} color the color of the button
	 * @param {object} message the message to display on the button
	 * @param {string} marginTop the top margin to add
	 * @returns {React.Component} the button
	 */
	getButton( url, color, message, marginTop ) {
		return <Button to={ url }
					   linkTarget="_blank"
					   color={ color }
					   margin={ marginTop }>
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
		let marginTop = "24px";

		if ( this.props.progress === 0 ) {
			// 0 progress, show a link to assign another user and a button to start the course.
			progressBar =
				<LinkButton testId="assign-to-someone-else" onClick={ this.props.onAssignModalOpen }>
					<FormattedMessage { ...messages.assignToSomeoneElse } />
				</LinkButton>;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.startButton, marginTop );
		} else if ( this.props.progress < 100 ) {
			// Some progress, show a progress bar and a button to continue the course.
			progressBar = <ProgressBar progress={ this.props.progress } />;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.continueButton, marginTop );
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
		let noAvailableEnrollments = this.props.totalEnrollments === this.props.usedEnrollments;
		let linkButton;

		if ( noAvailableEnrollments ) {
			// "View | Get more"
			linkButton = <Fragment>
				<Link to="/courses/enrollments">
					<FormattedMessage { ...messages.viewCourse } />
				</Link>
				{ " | " }
				<Link to={ this.props.shopUrl }>
					<FormattedMessage { ...messages.getMore } />
				</Link>
			</Fragment>;
		} else {
			// "Assign courses"
			linkButton = <LinkButton testId="assign-courses" onClick={ this.props.onAssignModalOpen }>
				<FormattedMessage { ...messages.assignCourses } />
			</LinkButton>;
		}

		return <AvailableEnrollment>
			<FormattedMessage
				id={ messages.amountAssigned.id }
				defaultMessage={ messages.amountAssigned.defaultMessage }
				values={ { assigned: this.props.usedEnrollments, total: this.props.totalEnrollments } }
			/>
			{ " " }
			{ linkButton }
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
					: this.getButton( this.props.shopUrl, colors.$color_pink_dark, messages.buyButton, "" ) }
				{ this.props.totalEnrollments > 1 ? this.getAssignCoursesRow() : null }
			</ActionBlock>
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
	usedEnrollments: PropTypes.number,
	availableEnrollment: PropTypes.any,
	isEnrolled: PropTypes.bool,

	courseUrl: PropTypes.string,
	certificateUrl: PropTypes.string,

	shopUrl: PropTypes.string,

	onAssignModalOpen: PropTypes.func.isRequired,

	isOnSale: PropTypes.bool,
	saleLabel: PropTypes.string,

	hasTrial: PropTypes.bool,
};

CourseCard.defaultProps = {
	image: sampleHeader,
};
