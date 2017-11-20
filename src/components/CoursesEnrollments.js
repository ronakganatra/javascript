import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
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
import CourseInviteModal from "./CourseInviteModal";

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

	getModal() {
		let open = this.props.inviteModalIsOpen;

		return <CourseInviteModal
			isOpen={ open }
			onInviteClick={ this.props.onInviteClick }
			onClose={ this.props.inviteModalClose }
			onStudentEmailChange={ this.props.onStudentEmailChange }
			onStudentEmailConfirmationChange={ this.props.onStudentEmailConfirmationChange }
			emailsAreEqual={ this.props.emailsAreEqual }
		/>;
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
							<LargeButton onClick={ this.props.inviteModalOpen }>{ this.props.intl.formatMessage( messages.editStudent ) }</LargeButton>
						</MediaQuery>
						<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet }px)` }>
							<ChevronButton aria-label={ this.props.intl.formatMessage( messages.editStudent ) }
										   onClick={ this.props.inviteModalOpen } />
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
			<div>
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
									<ColumnPrimary ellipsis={ true } >
										{ studentOrBuyer( course ) }
									</ColumnPrimary>
								</Row> );
						} ) }
					</ListTable>
				</Paper>
				{ this.getModal() }
			</div>
		);
	}
}

CoursesEnrollments.propTypes = {
	inviteModalOpen: PropTypes.func.isRequired,
	inviteModalClose: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadData: PropTypes.func,
	coursesEnrollments: PropTypes.array,
	inviteModalIsOpen: PropTypes.bool,
	onInviteClick: PropTypes.func,
	onStudentEmailChange: PropTypes.func,
	onStudentEmailConfirmationChange: PropTypes.func,
	emailsAreEqual: PropTypes.bool,
};

export default injectIntl( CoursesEnrollments );
