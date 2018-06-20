import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";
import sampleHeader from "../../images/sample_course_card_header.png";

// Custom components
import CourseCardHeader from "./CourseCardContainer";
import { ButtonLink, LinkButton, LargeSecondaryButtonLink } from "../Button";
import MyYoastModal from "../MyYoastModal";
import CourseInvite from "../CourseInvite";

const ActionBlock = styled.div`
	padding: 20px;
	text-align: center;
`;

// Button styled as a link.
const ActionLink = styled( LinkButton )`
	margin-bottom: 20px;
`;

const AvailableEnrollment = styled.p`
	font-weight: bold;
	margin: 0;
	margin-top: 20px;
`;

const Button = styled( ButtonLink )`
	background-color: ${ props => props.color };
	width: 100%;
`;

const SecondaryButton = styled( LargeSecondaryButtonLink )`
	width: 100%;
`;

const messages = defineMessages( {
	buyButton: {
		id: "coursecard.buybutton",
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
	}

	getModal() {
		let open = this.state.modalOpen;

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

					onCancelClick={ () => this.setField( "modalOpen", false ) }
					onInviteClick={ this.sendInvite }
				/>
			</MyYoastModal>
		);
	}

	setField( field, value ) {
		this.setState( {
			[ field ]: value,
		} );
	}

	sendInvite() {
		console.log( this.state.email, this.state.confirmationEmail );
		this.setField( "modalOpen", false );
	}

	getButton( url, color, message ) {
		return <Button to={ url }
					   linkTarget="_blank"
					   color={ color }>
			<FormattedMessage { ...message } />
		</Button>;
	}

	getCertificateButton() {
		return <SecondaryButton to={ this.props.certificateUrl }
								linkTarget="_blank">
			<FormattedMessage { ...messages.viewCertificateButton } />
		</SecondaryButton>;
	}

	getProgressBlock() {
		let progressBar;
		let button;

		if ( this.props.progress === 0 ) {
			progressBar =
				<ActionLink onClick={ () => this.setField( "modalOpen", true ) }>
					<FormattedMessage { ...messages.assignToSomeoneElse } />
				</ActionLink>;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.startButton );
		} else if ( this.props.progress < 100 ) {
			progressBar = <p> { this.props.progress }% </p>;
			button = this.getButton( this.props.courseUrl, colors.$color_green, messages.continueButton );
		} else {
			progressBar = <p> { this.props.progress }% </p>;
			button = this.getCertificateButton();
		}

		return <Fragment>
			{ progressBar }
			{ button }
		</Fragment>;
	}

	getAssignCoursesRow() {
		return <AvailableEnrollment>
			<FormattedMessage
				id={ messages.nrAssigned.id }
				defaultMessage={ messages.nrAssigned.defaultMessage }
				values={ { assigned: this.props.enrollments, total: this.props.totalEnrollments } }
			/>
			<LinkButton onClick={ () => this.setField( "modalOpen", true ) }>
				<FormattedMessage { ...messages.assignCourses } />
			</LinkButton>
		</AvailableEnrollment>;
	}

	render() {
		let buyButton = this.getButton( this.props.shopUrl, colors.$color_pink_dark, messages.buyButton );

		return <CourseCardHeader
			image={ this.props.image }
			title={ this.props.title }
			description={ this.props.description }
		>
			<ActionBlock>
				{ this.props.isEnrolled ? this.getProgressBlock() : buyButton }
				{ this.props.availableEnrollment ? this.getAssignCoursesRow() : null }
			</ActionBlock>
			{ this.getModal() }
		</CourseCardHeader>;
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
};

CourseCard.defaultProps = {
	description: "You want to be found by customers but you don’t know where to start?",
	title: "Basic SEO",

	image: sampleHeader,
	isEnrolled: true,
	progress: 0,

	courseUrl: "",
	certificateUrl: "",
	shopUrl: "",

	availableEnrollment: "something",
	totalEnrollments: 4,
	enrollments: 2,
};
