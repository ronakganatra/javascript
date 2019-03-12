import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import styled from "styled-components";

import CourseDetails from "./courses/CourseDetails";
import colors from "yoast-components/style-guide/colors";
import { FullHeightCard } from "./Card";

const OuterContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 288px);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
	justify-content: center;
	align-items: flex-start;
	padding: 0;
`;

const CourseListItem = styled.li`
	list-style-type: none;
	height:100%;
	width:100%;
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
	 * @param {object} props the properties of the component
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			email: "",
			confirmationEmail: "",
		};
	}

	componentDidMount() {
		this.props.loadData();

		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	/**
	 * Sets the given field in the state to the given value.
	 *
	 * @param {string} field the field to overwrite
	 * @param {*} value the value to store
	 * @returns {void}
	 */
	setField( field, value ) {
		this.setState( {
			[ field ]: value,
		} );
	}

	/**
	 * Returns the text and colors of a banner, if applicable.
	 * E.g. for a sale or when the course is free.
	 *
	 * @param {Object} course The course to get a banner for.
	 *
	 * @returns {object} an object containing the banner properties.
	 */
	getBanner( course ) {
		if ( course.isOnSale ) {
			return {
				banner: {
					text: course.saleLabel,
					backgroundColor: colors.$color_yellow,
					textColor: colors.$color_black,
				},
			};
		} else if ( course.isFree ) {
			return {
				banner: {
					text: "Free",
					backgroundColor: colors.$color_pink_dark,
					textColor: colors.$color_white,
				},
			};
		} else if ( ( course.hasTrial && ! course.isEnrolled ) || course.isTrial ) {
			return {
				banner: {
					text: "Free trial available",
					backgroundColor: colors.$color_pink_dark,
					textColor: colors.$color_white,
				},
			};
		}
		return null;
	}

	/**
	 * Returns the header information for a course card.
	 *
	 * @param {Object} course The course to get header information for.
	 *
	 * @returns {{header: {image: *, link: *, title: *}}} The header information.
	 */
	getHeader( course ) {
		if ( ! course.title ) {
			return null;
		}
		return {
			header: {
				image: course.image,
				link: this.enableHeaderUrl( course ) ? course.courseUrl : null,
				title: course.title,
			},
		};
	}

	/**
	 * If the header image and title should link to the course.
	 *
	 * @param {Object} course The course to check if the header url is enabled for.
	 *
	 * @returns {Boolean} if the header image and title should link to the course.
	 */
	enableHeaderUrl( course ) {
		return course.hasTrial || course.isFree || course.isEnrolled;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<OuterContainer>
				{ this.props.courses.map( ( course, i ) =>
					<CourseListItem key={ i }>
						<FullHeightCard { ...this.getBanner( course ) } { ...this.getHeader( course ) }>
							<CourseDetails { ...course } />
						</FullHeightCard>
					</CourseListItem> )
				}
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
