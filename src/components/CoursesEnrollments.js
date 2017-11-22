import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import Paper from "./Paper";
import {
	ColumnPrimary, ListTable, ColumnIcon, RowMobileCollapse, makeFullWidth,
	responsiveHeaders, ColumnMinWidth,
} from "./Tables";
import styled from "styled-components";
import { getUserId } from "../functions/auth";
import { LargeButton } from "../components/Button.js";
import { makeButtonFullWidth } from "./Button";

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

let ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
// let ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

let ResponsiveLargeButton = makeButtonFullWidth( LargeButton );

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
					<ColumnMinWidthResponsive>
						<ResponsiveLargeButton onClick={ () => {} }>{ this.props.intl.formatMessage( messages.editStudent ) }</ResponsiveLargeButton>
					</ColumnMinWidthResponsive>
				);
			}
			if ( currentUser === course.buyerId && course.status !== "not started" ) {
				return (
					<ColumnMinWidthResponsive>
						Course in Progress
					</ColumnMinWidthResponsive>
				);
			}
			if ( currentUser === course.studentId && course.studentId !== course.buyerId ) {
				return (
					<ColumnMinWidthResponsive>
						<span key={ course.id }>
							<strong><FormattedMessage id="owner.name" defaultMessage="Owner: " /></strong>
							{ course.buyerName }
							<br />
							<strong><FormattedMessage id="owner.email" defaultMessage="Email: " /></strong>
							{ course.buyerEmail }
						</span>
					</ColumnMinWidthResponsive>
				);
			}
		};

		return (
			<Paper>
				<ListTable>
					{ this.props.coursesEnrollments.map( ( course ) => {
						return (
							<RowMobileCollapse key={ course.id }>
								<ColumnIcon separator={ true }><CourseIcon src={ course.icon } alt=""/></ColumnIcon>
								<ColumnPrimaryResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.course ) }>
									{ course.courseName }
								</ColumnPrimaryResponsive>
								<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.studentName ) }>
									<strong>{ course.studentName }</strong><br />
									{ course.studentEmail }
								</ColumnMinWidthResponsive>
								{ studentOrBuyer( course ) }
							</RowMobileCollapse> );
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
