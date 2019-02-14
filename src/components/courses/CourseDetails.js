import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";

// Custom components
import { ButtonLink, LargeSecondaryButtonLink } from "../Button";
import Link from "../Link";
import ProgressBar from "../ProgressBar";

import check from "../../icons/checkGreen.svg";
import { getShopUrl } from "../../functions/products";

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
	text-align: center;
`;

const Button = styled( ButtonLink )`
	margin-top: ${ props => props.margin };
	background-color: ${ props => props.color };
	color: ${ props => props.textcolor || colors.$color_white };
	width: 100%;
	text-shadow: none;
`;

const SecondaryButton = styled( LargeSecondaryButtonLink )`
	margin-top: 24px;
	width: 100%;
`;

const Details = styled.div`
	margin-bottom: 24px;
	border-bottom: 1px ${ colors.$color_grey } solid;
	flex-grow: 1;
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
	buyFullButton: {
		id: "coursecard.buyFullButton",
		defaultMessage: "Get the full course",
	},
	getAccessButton: {
		id: "coursecard.getAccessButton",
		defaultMessage: "Get access now",
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
	viewCourse: {
		id: "coursecard.viewCourse",
		defaultMessage: "View",
	},
	getMore: {
		id: "courseCard.getMore",
		defaultMessage: "Get more",
	},
} );

const BUTTON_MARGIN_TOP = "24px";

/**
 * Returns the CourseDetails component.
 *
 * @returns {ReactElement} The CourseDetails component.
 */
class CourseDetails extends React.Component {
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
	 * @param {string?} textcolor the color of the text
	 * @returns {React.Component} the button
	 */
	getButton( url, color, message, marginTop, textcolor ) {
		return <Button
			to={ url }
			linkTarget="_blank"
			color={ color }
			textcolor={ textcolor }
			margin={ marginTop }
		>
			<FormattedMessage { ...message } />
		</Button>;
	}

	/**
	 * A button to view the certificate for the course.
	 *
	 * @returns {React.Component} the button
	 */
	getCertificateButton() {
		if ( ! this.props.certificateUrl ) {
			return null;
		}

		return <SecondaryButton
			to={ this.props.certificateUrl }
			linkTarget="_blank"
		>
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
		let button;
		switch ( type ) {
			case "continue":
				button = this.getButton( this.props.courseUrl, colors.$color_green, messages.continueButton, BUTTON_MARGIN_TOP );
				break;
			case "completed":
				button = this.getCertificateButton();
				break;
			default:
				button = this.getButton(
					this.props.courseUrl,
					colors.$color_green,
					messages.startButton,
					BUTTON_MARGIN_TOP );
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
		// If the course has a trial and we're not enrolled or we're on a trial.
		if ( ( this.props.hasTrial && ! this.props.isEnrolled ) || this.props.isTrial ) {
			// Returns the trial line (completed or start)
			if ( this.props.trialCompleted ) {
				return <StyledLabel>
					<FormattedMessage
						id={ messages.freeTrialCompleted.id }
						defaultMessage={ messages.freeTrialCompleted.defaultMessage }
						values={ { icon: <CompletedIcon src={ check } alt="" /> } }
					/>
				</StyledLabel>;
			}
			return <StyledLink to={ this.props.courseUrl }>
				<FormattedMessage { ...messages.startFreeTrial } />
			</StyledLink>;
		}

		// No trial, no enrollment -> show nothing.
		return null;
	}

	/**
	 * Returns a component displaying the current progress
	 * and a button to either go to the course in academy or view the certificate.
	 *
	 * @returns {React.Component} the component
	 */
	getProgressBlock() {
		if ( ( ! this.props.isTrial && this.props.isEnrolled ) || this.props.isFree ) {
			// Only show a progress bar when the course is free,
			// Or the user in enrolled in the course and is not trialling it out.
			if ( this.props.progress === 0 ) {
				return this.getButtonAndProgressBar();
			}
			if ( this.props.progress < 100 ) {
				return this.getButtonAndProgressBar( "continue" );
			}
			return this.getButtonAndProgressBar( "completed" );
		} else if ( this.props.hasTrial || this.props.isTrial ) {
			// If the user is busy with the trial, or the course has a trial, show a buy button.
			return this.getBuyButton( BUTTON_MARGIN_TOP );
		}
	}

	/**
	 * Returns an appropriately coloured buy button
	 *
	 *@param {string} marginTop The margin on top of the button.
	 *
	 * @returns {React.Component} the buy button
	 */
	getBuyButton( marginTop ) {
		const message = this.props.isSubscription ? messages.getAccessButton : messages.buyFullButton;
		const url     = this.props.isSubscription ? `${getShopUrl()}/subscriptions/` : this.props.shopUrl;

		if ( this.props.isOnSale ) {
			// On sale, so yellow button.
			return this.getButton( url, colors.$color_yellow, message, "", colors.$color_black );
		}
		return this.getButton( url, colors.$color_pink_dark, message, marginTop );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const hasAccess = this.props.isEnrolled || this.props.hasTrial;
		return (
			<Fragment>
				<Details>
					<p>{ this.props.description }</p>
				</Details>
				<ActionBlock>
					{ hasAccess && this.getProgressLink() }
					{ ( hasAccess || this.props.isFree ) ? this.getProgressBlock() : this.getBuyButton( "" ) }
				</ActionBlock>
			</Fragment>
		);
	}
}

export default injectIntl( CourseDetails );

CourseDetails.propTypes = {
	intl: intlShape.isRequired,
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
	isOnSale: PropTypes.bool,
	saleLabel: PropTypes.string,
	hasTrial: PropTypes.bool,
	isSubscription: PropTypes.bool,
};

CourseDetails.defaultProps = {
	description: null,
	progress: null,
	totalEnrollments: null,
	usedEnrollments: null,
	availableEnrollment: null,
	isFree: false,
	isEnrolled: false,
	isTrial: false,
	trialCompleted: false,
	courseUrl: null,
	certificateUrl: null,
	shopUrl: null,
	isOnSale: false,
	saleLabel: null,
	hasTrial: false,
	isSubscription: false,
};
