import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";
import sampleHeader from "../../images/sample_course_card_header.png";

// Custom components
import CourseCardHeader from "./CourseCardContainer";
import { Button, LinkButton } from "../Button";

const ActionBlock = styled.div`
	padding: 20px;
	text-align: center;
`;

const ActionButton = styled( Button )`
	background-color: ${ props => props.color };
	width: 100%;
`;

// Button styled as a link.
const ActionLink = styled( LinkButton )`
	margin-bottom: 20px;
`;

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "coursecard.buybutton",
		defaultMessage: "Get the full course",
	},
} );

class CourseCard extends React.Component {

	getBuyBlock() {
		return <ActionButton color={ colors.$color_pink_dark }>
			<FormattedMessage { ...messages.coursesPageLoaded } />
		</ActionButton>;
	}

	getProgressBlock() {
		if ( this.props.progress === 0 ) {
			return this.getAssignLink();
		}
		return <p> Progress block </p>;
	}

	getAssignLink() {
		return <Fragment>
			<ActionLink>Assign to someone else</ActionLink>
			<ActionButton color={ colors.$color_green }>Start course</ActionButton>
		</Fragment>;
	}

	render() {
		return <CourseCardHeader
			image={ this.props.image }
			title={ this.props.title }
			description={ this.props.description }
		>
			<ActionBlock>
				{ this.props.isEnrolled ? this.getProgressBlock() : this.getBuyBlock() }
			</ActionBlock>
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

	shopUrl: PropTypes.string,
};

CourseCard.defaultProps = {
	description: "You want to be found by customers but you don’t know where to start?",
	title: "Basic SEO",
	image: sampleHeader,
	isEnrolled: true,
	progress: 0,
};
