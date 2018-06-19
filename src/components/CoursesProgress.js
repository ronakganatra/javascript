import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import NoResults from "./NoResults";
import noSitesImage from "./../images/noSites.svg";
import CourseCard from "./courses/CourseCard";

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
			<FormattedMessage id="courses.noCourseProgress.welcome"
							  defaultMessage="Welcome to the Course Progress overview." />,
			<FormattedMessage id="courses.noCourseProgress.start"
							  defaultMessage="Here you can quickly start or continue any Yoast Academy courses you are enrolled in." />,
			<FormattedMessage id="courses.noCourseProgress.visitShop"
							  defaultMessage="However, it looks like you don't have any courses yet! Press the button below to visit our shop." />,
		];

		return <NoResults url="https://yoast.com/courses" paragraphs={ paragraphs } pageContext="url"
						  imageSource={ noSitesImage } />;
	}

	render() {
		return (
			<CourseCard />
		);
	}
}

CoursesProgress.propTypes = {
	intl: intlShape.isRequired,
	coursesEnrollments: PropTypes.array,
	courses: PropTypes.array,
	loadCourses: PropTypes.func,
	loadCoursesEnrollments: PropTypes.func,
	background: PropTypes.string,
};

export default injectIntl( CoursesProgress );
