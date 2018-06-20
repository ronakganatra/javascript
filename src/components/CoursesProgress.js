import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import { CourseCard } from "./PaperStyles";
import styled from "styled-components";
import defaults from "../config/defaults.json";

const OuterContainer = styled.div`
	display: flex;
	flex-direction:row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;
	
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		flex-direction: column;
	}
`;

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
		this.props.loadData();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	render() {
		return (
			<OuterContainer>
				{ this.props.courses.map( ( course, i ) => <CourseCard key={ i } { ...course } /> ) }
			</OuterContainer>
		);
	}
}

CoursesProgress.propTypes = {
	intl: intlShape.isRequired,
	courses: PropTypes.array,
	loadData: PropTypes.func,
};

export default injectIntl( CoursesProgress );
