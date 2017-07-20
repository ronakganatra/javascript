import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import LandingPage from "./LandingPage";
import a11ySpeak from "a11y-speak";
import constructionImage from "../images/construction.svg";
import { LargeButton } from "../components/Button.js";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	underConstruction: {
		id: "courses.under-construction",
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
		a11ySpeak( message );
	}

	render() {
		let paragraphs = [ <FormattedMessage id="courses.under-construction" defaultMessage="This section is still under construction. To access your courses, please visit:" /> ];
		return (
			<div>
				/*
				<LandingPage url="https://yoa.st/myyoast-academy"
							 urlText="yoast.academy"
							 imageSource={ constructionImage }
							 paragraphs={ paragraphs }
				/>
				*/
				<LargeButton>Test</LargeButton>
				<constructionImage/>

			</div>

		);
	}
}

export default injectIntl( CoursesPage );

CoursesPage.propTypes = {
	intl: intlShape.isRequired,
};
