import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import LandingPage from "./LandingPage";
import { speak } from "@wordpress/a11y";
import constructionImage from "../images/construction.svg";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import CoursesEnrollments from "../containers/CoursesEnrollments";
import CoursesProgress from "../containers/CoursesProgress";
import PropTypes from "prop-types";
import { hasAccessToFeature } from "../functions/features";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	underConstruction: {
		id: "courses.underConstruction",
		defaultMessage: "This section is still under construction. To access your courses, please visit:",
	},
} );

let itemRoutes = [
	{
		component: CoursesProgress,
		path: "/courses/progress",
		title: "Progress",
	},
	{
		component: CoursesEnrollments,
		path: "/courses/enrollments",
		title: "Enrollments",
		isActive: ( match, location ) => {
			if ( match ) {
				return match;
			}

			return location.pathname === "/courses" || location.pathname === "/courses/";
		},
	},

];

/**
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class CoursesPage extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		let paragraphs = [ <FormattedMessage id={ messages.underConstruction.id }
			defaultMessage={ messages.underConstruction.defaultMessage }/> ];
		if ( hasAccessToFeature( "COURSES" ) ) {
			return (
				<div>
					<SubNavigation itemRoutes={ itemRoutes } />
					<SubNavigationItem itemRoutes={ itemRoutes } />
					<SubNavigationItem itemRoutes={ [
						{
							path: "/courses",
							component: CoursesEnrollments,
						},
					] } />
				</div>
			);
		}
		return (
			<LandingPage url="https://yoa.st/myyoast-academy"
						 urlText="Yoast Academy"
						 imageSource={ constructionImage }
						 paragraphs={ paragraphs }
			/>
		);
	}
}

export default injectIntl( CoursesPage );

CoursesPage.propTypes = {
	intl: intlShape.isRequired,
	loadCourses: PropTypes.func,
	loadCoursesEnrollments: PropTypes.func,
};
