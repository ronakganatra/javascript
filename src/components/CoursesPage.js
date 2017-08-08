import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import LandingPage from "./LandingPage";
import speak from "a11y-speak";
import constructionImage from "../images/construction.svg";

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
		let paragraphs = [ <FormattedMessage id={ messages.underConstruction.id } defaultMessage={ messages.underConstruction.defaultMessage } /> ];
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
};
