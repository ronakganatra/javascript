import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ListTable, Row, ColumnIcon } from "./Tables";
import Paper from "./Paper";
import _groupBy from "lodash/groupBy";
import { getUserId } from "../functions/auth";
import { ColumnFixedWidth, ColumnPrimary } from "./Tables";
import { LargeButtonLink, makeButtonFullWidth, ChevronButtonLink } from "./Button";
import MediaQuery from "react-responsive";
import defaults from "../config/defaults.json";

let ResponsiveLargeButtonLink = makeButtonFullWidth( LargeButtonLink );

const CourseIcon = styled.img`
	height: inherit;
`;

let ColumnProgress = styled( ColumnFixedWidth )`
	flex-basis: 140px;
`;

let ColumnStatus = styled( ColumnFixedWidth )`
	flex-basis: 140px;
`;

// let ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );
// let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );

const messages = defineMessages( {
	course: {
		id: "progress.overview.courseName",
		defaultMessage: "Course",
	},
	progress: {
		id: "progress.overview.progress",
		defaultMessage: "Progress",
	},
	status: {
		id: "progress.overview.status",
		defaultMessage: "Status",
	},
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	manageTitle: {
		id: "siteSubscriptions.overview.title",
		defaultMessage: "Subscriptions",
	},
} );

/**
 * A function that returns the Courses Progress Tab component.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
class CoursesProgress extends React.Component {
	/**
	 * Sets the CoursesProgress object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.loadCourses();
		this.props.loadCoursesEnrollments();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		/**
		 * Defines the label of the button.
		 *
		 * @param {array} enrollmentsStatus The course that is enrolled.
		 *
		 * @returns {string} label The label to be displayed on the button.
		 */
		function progressButton( enrollmentsStatus ) {
			if ( enrollmentsStatus.progress === 100 ) {
				return <FormattedMessage id="button.certificate" defaultMessage="Certificate" />;
			}
			if ( enrollmentsStatus.progress > 0 ) {
				return <FormattedMessage id="button.continue" defaultMessage="Continue" />;
			}
			if ( enrollmentsStatus.student ) {
				return <FormattedMessage id="button.getstarted" defaultMessage="Get Started " />;
			}
			if ( enrollmentsStatus.buyer ) {
				return <FormattedMessage id="button.enroll" defaultMessage="Enroll " />;
			}
			return "Unlock now";
		}

		/**
		 * @Summary Get the enrollment status for an array of enrollments.
		 *
		 * @param {array} enrollments Enrollments to get the status for.
		 *
		 * @returns {{progress: number, student: boolean, buyer: boolean, status: string}} The aggregate status for all given enrollments.
		 */
		function getEnrollmentsStatus( enrollments ) {
			let obj = { progress: 0, student: false, buyer: false, status: "Locked" };
			let userId = getUserId();

			for ( let i = 0; i < enrollments.length; i++ ) {
				let enrollment = enrollments[ i ];

				if ( enrollment.studentId === userId ) {
					obj.progress = enrollment.progress;
					obj.student  = true;
					obj.status   = enrollment.status;
				}

				if ( enrollment.buyerId === userId && enrollment.studentId === null ) {
					obj.buyer = true;
				}
			}

			return obj;
		}

		/** Defines the URL of the progressButton based on its label.
		 *
		 * @param {string} progressButtonLabel The label of the progress button.
		 * @param {obj} course The course with the URLs.
		 *
		 * @returns {string} The URL of the progress button.
		 */
		function progressButtonUrl( progressButtonLabel, course ) {
			if ( progressButtonLabel !== "Unlock now" ) {
				if ( progressButtonLabel !== "Enroll" ) {
					return progressButtonLabel === "Certificate" ? course.certificateUrl : course.courseUrl;
				}
				// Should be updated when the Enroll modal is ready.
				return course.courseUrl;
			}
			return course.storeUrl;
		}

		let allEnrollments = _groupBy( this.props.coursesEnrollments, "courseId" );
		return (
			<Paper>
				<ListTable>
					{
						this.props.courses.map( ( course ) => {
							if( course.product === null ) {
								return;
							}
							let enrollments = allEnrollments[ course.id ] || [];
							let enrollmentsStatus = getEnrollmentsStatus( enrollments );
							let progressButtonLabel = progressButton( enrollmentsStatus );

							return (
							<Row key={ course.id }>
								<ColumnIcon separator={ true }>
									<CourseIcon src={ course.icon } alt=""/>
								</ColumnIcon>
								<ColumnPrimary ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.course ) }>
									{ course.name }
								</ColumnPrimary>
								<ColumnStatus ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.status ) }>
									{ enrollmentsStatus.status }
								</ColumnStatus>
								<ColumnProgress ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.progress ) }>
									{ enrollmentsStatus.progress }%
								</ColumnProgress>

								<ColumnFixedWidth>
									<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
										<ResponsiveLargeButtonLink to={ progressButtonUrl( progressButtonLabel, course ) } linkTarget="_blank">
											{ progressButtonLabel }
										</ResponsiveLargeButtonLink>
									</MediaQuery>
									<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet }px)` }>
										<ChevronButtonLink to={ course.courseUrl } linkTarget="_blank" />
									</MediaQuery>
								</ColumnFixedWidth>
							</Row>
							);
						} ) }
				</ListTable>
			</Paper>
		);
	}
}

CoursesProgress.propTypes = {
	intl: intlShape.isRequired,
	coursesEnrollments: PropTypes.array,
	courses: PropTypes.array,
	loadCourses: PropTypes.func,
	loadCoursesEnrollments: PropTypes.func,
};

export default injectIntl( CoursesProgress );
