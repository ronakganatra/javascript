import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
// import retrieveCourses from "../actions/courses";
// import CoursesProgress from "./CoursesProgress";
// import CoursesEnrollments from "../containers/CoursesEnrollments";
import PropTypes from "prop-types";
// import { ListTable } from "./Tables";
// import Paper from "./Paper";
// import CollapsibleHeader from "./CollapsibleHeader";

const messages = defineMessages( {
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
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class CoursesEnrollments extends React.Component {
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
		return (
			<h1>test</h1>
		);
	}
}

CoursesEnrollments.propTypes = {
	intl: intlShape.isRequired,
	loadData: PropTypes.func,
};

export default injectIntl( CoursesEnrollments );
