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
import check from "../../icons/checkGreen.svg";

const StyledLabel = styled.label`
	font-weight: bold;
`;

const StyledLink = styled( Link )`
	font-weight: bold;
`;

const CompletedIcon = styled.img`
	height: 12px;
	padding-right: 2px;
`;

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
	color: ${ props => props.textColor || colors.$color_white };
	width: 100%;
`;

const SecondaryButton = styled( LargeSecondaryButtonLink )`
	margin-top: 24px;
	width: 100%;
`;

const messages = defineMessages( {
	startFreeTrial: {
		id: "start.free.trial",
		defaultMessage: "Start free trial",
	},
	freeTrialCompleted: {
		id: "free.trial.completed",
		defaultMessage: "{icon} Free trial completed",
	},
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
	 * Sets the CourseCard object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.getButtonAndProgressBar = this.getButtonAndProgressBar.bind( this );
		this.getProgressBlock = this.getProgressBlock.bind( this );
		this.getProgressLink = this.getProgressLink.bind( this );
	}
	/**
	 * Returns a link, disguised as a colored button.
	 *
	 * @param {string} url the url to which to link
	 * @param {string} color the color of the button
	 * @param {object} message the message to display on the button
	 * @param {string?} marginTop the top margin to add
	 * @param {string?} textColor the color of the text
	 * @returns {React.Component} the button
	 */
	getButton( url, color, message, marginTop, textColor ) {
		return <Button to={ url }
					   linkTarget="_blank"
					   color={ color }
					   textColor={ textColor }
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
	 * Gets the button and status corresponding to the course trial or progress status.
	 *
	 * @param {string} type The type of course status and button to be shown.
	 *
	 * @returns {React.Component} the component
	 */
	getButtonAndProgressBar( type ) {
		let marginTop = "24px";
		let button;
		switch ( type ) {
			case "trial":
				button = this.getBuyButton( marginTop );
				break;
			case "continue":
				button = this.getButton( this.props.courseUrl, colors.$color_green, messages.continueButton, marginTop );
				break;
			case "completed":
				button = this.getCertificateButton();
				break;
			default:
				button = this.getButton(
					this.props.courseUrl,
					colors.$color_green,
					messages.startButton,
					marginTop );
				break;
		}

		let progressBar;
		// Only when a course is started the progress bar is shown.
		if ( type === "continue" || type === "completed" ) {
			progressBar = <ProgressBar progress={ this.props.progress } />;
		}
		// Return should be updated to trialCompleted
		return <Fragment>
			{ progressBar }
			{ button }
		</Fragment>;
	}
	/**
	 * Gets the progress link or message or assign to someone else options.
	 *
	 * @returns {React.Component} the component The component related to (the instance of) trials.
	 */
	getProgressLink() {
		// Returns the trial line (completed or start)
		if ( this.props.hasTrial ) {
			if ( this.props.trialCompleted ) {
				return <StyledLabel>
					<FormattedMessage
						id={messages.freeTrialCompleted.id}
						defaultMessage={messages.freeTrialCompleted.defaultMessage}
						values={{ icon: <CompletedIcon src={check}/> }}
					/>
				</StyledLabel>;
			}
			return <StyledLink to={this.props.courseUrl}>
					<FormattedMessage {...messages.startFreeTrial } />
				</StyledLink>;
		}

		// Returns a LinkButton which can be used to assign someone else
		if ( ! this.props.hasTrial ) {
			return <LinkButton testId="assign-to-someone-else"
			                   onClick={ () => this.props.onAssignModalOpen( this.props.availableEnrollment ) }>
				<FormattedMessage { ...messages.assignToSomeoneElse } />
			</LinkButton>;
		}
	}
	/**
	 * Returns a component displaying the current progress
	 * (or a link to assign someone else to the course if the course hasn't been started yet)
	 * and a button to either go to the course in academy or view the certificate.
	 *
	 * @returns {React.Component} the component
	 */
	getProgressBlock() {
		if ( this.props.hasTrial ) {
			return this.getButtonAndProgressBar( "trial" );
		}
		if ( this.props.progress === 0 ) {
			// 0 progress, show a link to assign another user and a button to start the course.
			// But only if the course is not free.
			return this.getButtonAndProgressBar( "paidZeroProgress" );
		}
		if ( this.props.progress < 100 ) {
			return this.getButtonAndProgressBar( "continue" );
		}
		return this.getButtonAndProgressBar( "completed" );
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
			linkButton = <LinkButton testId="assign-courses"
									 onClick={ () => this.props.onAssignModalOpen( this.props.availableEnrollment ) }>
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

	/**
	 * Returns an appropriately coloured buy button
	 *
	 *@param {string} marginTop The margin on top of the button.
	 *
	 * @returns {React.Component} the buy button
	 */
	getBuyButton( marginTop ) {
		if ( this.props.isOnSale ) {
			// On sale, so yellow button.
			return this.getButton( this.props.shopUrl, colors.$color_yellow, messages.buyButton, "", colors.$color_black );
		}
		return this.getButton( this.props.shopUrl, colors.$color_pink_dark, messages.buyButton, marginTop );
	}

	/**
	 * Returns the text and colors of a banner, if applicable.
	 * E.g. for a sale or when the course is free.
	 * @returns {object} an object containing the banner properties.
	 */
	getBanner() {
		if ( this.props.isOnSale ) {
			return {
				bannerText: this.props.saleLabel,
				bannerBackgroundColor: colors.$color_yellow,
				bannerTextColor: colors.$color_black,
			};
		} else if ( this.props.isFree ) {
			return {
				bannerText: "Free",
				bannerBackgroundColor: colors.$color_pink_dark,
				bannerTextColor: colors.$color_white,
			};
		}
		return {};
	}

	render() {
		let marginTop;
		let hasAccess = this.props.isEnrolled  || this.props.hasTrial;
		return <CourseCardContainer
			image={ this.props.image }
			title={ this.props.title }
			description={ this.props.description }
			{ ...this.getBanner() }
		>
			<ActionBlock>
				{ hasAccess && this.props.progress === 0 && this.getProgressLink() }
				{ ( hasAccess || this.props.isFree ) ? this.getProgressBlock() : this.getBuyButton( marginTop ) }
				{ this.props.totalEnrollments > 1 && this.getAssignCoursesRow() }
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
	availableEnrollment: PropTypes.object,
	isFree: PropTypes.bool,
	isEnrolled: PropTypes.bool,
	isTrial: PropTypes.bool,
	trialCompleted: PropTypes.bool,

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
