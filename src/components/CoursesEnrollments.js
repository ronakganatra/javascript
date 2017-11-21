import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import Paper from "./Paper";
import { Row, ColumnPrimary, ListTable, ColumnIcon, ColumnFixedWidth } from "./Tables";
import styled from "styled-components";
import { getUserId } from "../functions/auth";
import defaults from "../config/defaults.json";
import { LargeButton, ChevronButton } from "../components/Button.js";

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
	course: {
		id: "enrollments.overview.courseName",
		defaultMessage: "Course",
	},
	studentName: {
		id: "enrollments.overview.studentName",
		defaultMessage: "Student Name",
	},
	editStudent: {
		id: "enrollments.overview.editStudent",
		defaultMessage: "Edit student",
	},
} );

let ColumnStudentName = styled( ColumnFixedWidth )`
	flex-basis: 280px;
`;

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
							return (
								<span key={ course.id }>
									<strong><FormattedMessage id="owner.name" defaultMessage="Owner: " /></strong>
									{ course.buyerName }
									<br />
									<strong><FormattedMessage id="owner.email" defaultMessage="Email: " /></strong>
									{ course.buyerEmail }
								</span>
							);
						} ) }
					</ColumnFixedWidth>
				);
			}
		};

		return (
			<Paper>
				<ListTable>
					{ this.props.coursesEnrollments.map( ( course ) => {
						return (
							<Row key={ course.id }>
								<ColumnIcon separator={ true }><CourseIcon src={ course.icon } alt=""/></ColumnIcon>
								<ColumnPrimary ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.course ) }>
									{ course.courseName }
								</ColumnPrimary>
								<ColumnStudentName ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.studentName ) }>
									<strong>{ course.studentName }</strong><br />
									{ course.studentEmail }
								</ColumnStudentName>
									{ studentOrBuyer( course ) }
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
