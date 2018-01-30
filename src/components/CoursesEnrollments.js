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
import { LargeButton, makeButtonFullWidth } from "../components/Button.js";
import isEmpty from "lodash/isEmpty";
import NoResults from "./NoResults";
import noSitesImage from "./../images/noSites.svg";
import defaults from "../config/defaults.json";
import MyYoastModal from "./MyYoastModal";
import CourseInvite from "./CourseInvite";

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

const CourseColumnIcon = styled( ColumnIcon )`
	display: inline-block;
	position: relative;
	width: 100px;
	padding-right: 40px;
	text-align: center;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}

	&:after {
		position: absolute;
		padding: 0;
		right: 0;
	}
	
	img {
		margin: auto;
		height: 100%;
	}
`;

let ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );

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

	/**
	 * Returns a view to show when there are no enrollments to show.
	 *
	 * @returns {Object} The element to render.
	 */
	renderNoResults() {
		let paragraphs = [
			<FormattedMessage id="courses.noEnrollments.welcome" defaultMessage="Welcome to the Course Enrollments overview." />,
			<FormattedMessage id="courses.noEnrollments.find" defaultMessage="Here you can find all the Yoast Academy courses you own." />,
			<FormattedMessage id="courses.noEnrollments.visitShop" defaultMessage="However, it looks like you don't have any courses yet! Press the button below to visit our shop." />,
		];

		return <NoResults url="https://yoast.com/courses" paragraphs={ paragraphs } pageContext="url" imageSource={ noSitesImage } />;
	}

	getModal() {
		let open = this.props.inviteModalIsOpen;

		const messages = defineMessages( {
			modalAriaLabel: {
				id: "modal.arialabel.invite",
				defaultMessage: "Send course invite",
			},
		} );

		return <MyYoastModal
			isOpen={ open }
			onClose={ this.props.inviteModalClose }
			messages={ messages }
			modalComponent={
				<CourseInvite
					inviteStudentEmail={ this.props.inviteStudentEmail }
					inviteStudentEmailConfirmation={ this.props.inviteStudentEmailConfirmation }
					onStudentEmailChange={ this.props.onStudentEmailChange }
					onStudentEmailConfirmationChange={ this.props.onStudentEmailConfirmationChange }
					courseInviteError={ this.props.courseInviteError }
					onCancelClick={ this.props.inviteModalClose }
					onInviteClick={ this.props.onInviteClick }
				/> }
		/>;
	}

	render() {
		const { coursesEnrollments } = this.props;

		if ( isEmpty( coursesEnrollments ) ) {
			return this.renderNoResults();
		}

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
						<ResponsiveLargeButton onClick={ () => this.props.inviteModalOpen( course.id ) }>{ this.props.intl.formatMessage( messages.editStudent ) }</ResponsiveLargeButton>
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
			if ( currentUser === course.studentId && course.studentId !== course.buyerId && course.buyerId ) {
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

			return <ColumnMinWidthResponsive />;
		};

		return (
			<div>
				<Paper>
					<ListTable>
						{ coursesEnrollments.map( ( course ) => {
							return (
								<RowMobileCollapse key={ course.id }>
									<CourseColumnIcon separator={ true }><CourseIcon src={ course.icon } alt=""/></CourseColumnIcon>
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
	inviteStudentEmail: PropTypes.string,
	inviteStudentEmailConfirmation: PropTypes.string,
	onStudentEmailChange: PropTypes.func,
	onStudentEmailConfirmationChange: PropTypes.func,
	courseInviteError: PropTypes.object,
};

export default injectIntl( CoursesEnrollments );
