import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import { ListTable } from "./Tables";
import Paper from "./Paper";
import _groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import NoResults from "./NoResults";
import noSitesImage from "./../images/noSites.svg";
import CourseEnrollment from "./courses/progress/CourseEnrollment";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
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

	/**
	 * Returns a view to show when there are no courses to show.
	 *
	 * @returns {Object} The element to render.
	 */
	static renderNoResults() {
		let paragraphs = [
			<FormattedMessage id="courses.noCourseProgress.welcome" defaultMessage="Welcome to the Course Progress overview." />,
			<FormattedMessage id="courses.noCourseProgress.start" defaultMessage="Here you can quickly start or continue any Yoast Academy courses you are enrolled in." />,
			<FormattedMessage id="courses.noCourseProgress.visitShop" defaultMessage="However, it looks like you don't have any courses yet! Press the button below to visit our shop." />,
		];

		return <NoResults url="https://yoast.com/courses" paragraphs={ paragraphs } pageContext="url" imageSource={ noSitesImage } />;
	}

	render() {
		let { courses, coursesEnrollments } = this.props;
		let allEnrollments = _groupBy( coursesEnrollments, "courseId" );

		if ( isEmpty( allEnrollments ) ) {
			return CoursesProgress.renderNoResults();
		}

		courses = courses.filter( ( course ) => {
			return ! isEmpty( allEnrollments[ course.id ] );
		} );

		return (
			<Paper>
				<ListTable>
					{ courses.map( ( course ) => {
						let enrollments = allEnrollments[ course.id ] || [];

						return <CourseEnrollment key={ course.id } course={ course } courseEnrollments={ enrollments } intl={ this.props.intl } />;
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
