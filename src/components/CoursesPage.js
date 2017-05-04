import React from "react";
import styled from "styled-components";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import a11ySpeak from "a11y-speak";
import constructionImage from "../images/construction.svg";
import colors from "yoast-components/style-guide/colors.json";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
} );

const CoursesContainer = styled.div`
	margin-top: 10vh;
	text-align: center;

	img {
		width: 540px;
		max-width: 100%;
		height: auto;
		margin-top: 2em;
	}

	a {
		font-size: 1.5em;
		color: ${ colors.$color_pink_dark };
	}
`;

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
		return (
			<CoursesContainer>
				<p>
					<FormattedMessage id="courses.under-construction" defaultMessage="This section is still under construction. To access your courses, please visit:" /><br />
					<a href="https://yoast.academy" target="_blank">
						yoast.academy
						<NewTabMessage />
					</a>
				</p>
				<img src={ constructionImage } alt="" />
			</CoursesContainer>
		);
	}

}

export default injectIntl( CoursesPage );

CoursesPage.propTypes = {
	intl: intlShape.isRequired,
};
