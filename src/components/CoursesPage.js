import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import LandingPage from "./LandingPage";
import { speak } from "@wordpress/a11y";
import constructionImage from "../images/construction.svg";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
// import retrieveCourses from "../actions/courses";
// import CoursesProgress from "./CoursesProgress";
import CoursesEnrollments from "../containers/CoursesEnrollments";
import PropTypes from "prop-types";

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
		component: CoursesEnrollments,
		path: "/courses/progress",
		title: "Progress",
		isActive: ( match, location ) => {
			if ( match ) {
				return match;
			}

			return location.pathname === "/courses" || location.pathname === "/courses/";
		},
	},
	{
		component: CoursesEnrollments,
		path: "/courses/enrollments",
		title: "Enrollments",
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
		this.props.loadData();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		let paragraphs = [ <FormattedMessage id={ messages.underConstruction.id }
			defaultMessage={ messages.underConstruction.defaultMessage }/> ];
		if ( process.env.NODE_ENV === "development" ) {
			return (
				<div>
					<SubNavigation itemRoutes={ itemRoutes } />
					<SubNavigationItem itemRoutes={ itemRoutes } />
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
	loadData: PropTypes.func,
};
