import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import { ListTable, ColumnIcon, ColumnPrimary, ColumnFixedWidth } from "./Tables";
import MediaQuery from "react-responsive";
import Paper from "./Paper";
import { Row } from "./Tables";
import styled from "styled-components";
import { getUserId } from "../functions/auth";
import defaults from "../config/defaults.json";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/Button.js";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	manageTitle: {
		id: "siteSubscriptions.overview.title",
		defaultMessage: "Subscriptions",
	},
	courseName: {
		id: "progress.overview.courseName",
		defaultMessage: "Course name",
	},
	activeSubscriptions: {
		id: "site.overview.activeSubscriptions",
		defaultMessage: "Active subscriptions",
	},
	editStudent: {
		id: "enrollments.overview.editStudent",
		defaultMessage: "Edit student",
	},
} );

const CourseIcon = styled.img`
	height: inherit;
`;
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
		let currentUser = getUserId();

		/**
		 * Sets the Course status column.
		 * @param {Object} course the course object.
		 * @returns {void}
		 */
		let studentOrBuyer = ( course ) => {
			if ( currentUser === course.buyerId && course.status === "not started" ) {
				return (
					<ColumnFixedWidth>
						<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
							<LargeButton onClick={ () => {} }>{ this.props.intl.formatMessage( messages.editStudent ) }</LargeButton>
						</MediaQuery>
						<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet }px)` }>
							<ChevronButton aria-label={ this.props.intl.formatMessage( messages.editStudent ) }
										   onClick={ () => {} } />
						</MediaQuery>
					</ColumnFixedWidth>
				);
			}
			if ( currentUser === course.buyerId && course.status !== "not started" ) {
				return (
					<ColumnFixedWidth>
						Course in Progress
					</ColumnFixedWidth>
				);
			}
			if ( currentUser === course.studentId && course.studentId !== course.buyerId ) {
				return (
					<ColumnFixedWidth>
						{ this.props.coursesEnrollments.map( function( course ) {
							return ( course.buyerName + "<br />" + course.buyerEmail );
						} ) }
					</ColumnFixedWidth>
				);
			}
		};

		return (
			<Paper>
				<ListTable>
					{ this.props.coursesEnrollments.map( function( course ) {
						return (
							<Row key={ course.id }>
								<ColumnIcon separator={ true }><CourseIcon src={ course.icon } alt=""/></ColumnIcon>
								<ColumnPrimary ellipsis={ true } headerLabel={ "Course Name" }>
									{ course.courseName }
								</ColumnPrimary>
								<ColumnPrimary ellipsis={ true } headerLabel="Student Name">
									<strong>{ course.studentName }</strong><br />
									{ course.studentEmail }
								</ColumnPrimary>
								<ColumnPrimary ellipsis={ true } headerLabel={ ( currentUser === course.buyerId ) ? "Manage user" : "Course owner"  }>
									{ studentOrBuyer( course ) }
								</ColumnPrimary>
							</Row> );
					} ) }
				</ListTable>
			</Paper>
		);
	}
}

CoursesEnrollments.propTypes = {
	intl: intlShape.isRequired,
	loadData: PropTypes.func,
	coursesEnrollments: PropTypes.array,
};

export default injectIntl( CoursesEnrollments );
