import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import { Paper } from "./PaperStyles";
import {
	ColumnPrimary, ListTable, ColumnIcon, RowMobileCollapse, makeFullWidth,
	responsiveHeaders, ColumnMinWidth, ColumnFixedWidth,
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
	courses: {
		id: "enrollments.overview.coursesName",
		defaultMessage: "Individual courses",
	},
	subscriptions: {
		id: "enrollments.overview.subscriptionsName",
		defaultMessage: "Subscriptions",
	},
	studentName: {
		id: "enrollments.overview.studentName",
		defaultMessage: "Student Name",
	},
	editStudent: {
		id: "enrollments.overview.editStudent",
		defaultMessage: "Change student",
	},
} );

const CourseColumnIcon = styled( ColumnIcon )`
	display: inline-block;
	position: relative;
	width: 124px;
	padding-right: 24px;
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

const ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
const ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
const ColumnFixedWidthResponsive = styled( makeFullWidth( responsiveHeaders( ColumnFixedWidth ) ) )`
	flex: 0 0 192px;
	text-align: center;
`;

const ResponsiveLargeButton = makeButtonFullWidth( LargeButton );

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
		this.props.loadCourseEnrollments();
		this.props.loadCourses();
		this.props.loadOrders();
		this.props.loadProducts();
		this.props.loadProductGroups();

		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	/**
	 * Returns a view to show when there are no enrollments to show.
	 *
	 * @returns {Object} The element to render.
	 */
	renderNoResults() {
		const paragraphs = [
			<FormattedMessage
				id="courses.noEnrollments.welcome"
				defaultMessage="Welcome to the Course Enrollments overview."
			/>,
			<FormattedMessage
				id="courses.noEnrollments.find"
				defaultMessage="Here you can find all the Yoast Academy courses you own."
			/>,
			<FormattedMessage
				id="courses.noEnrollments.visitShop"
				defaultMessage="However, it looks like you don't have any courses yet! Press the button below to visit our shop."
			/>,
		];

		return <NoResults
			url="https://yoast.com/courses" paragraphs={ paragraphs } pageContext="url"
			imageSource={ noSitesImage }
		/>;
	}

	getModal() {
		const open = this.props.inviteModalIsOpen;

		const modalAriaLabel = defineMessages( {
			id: "modal.arialabel.invite",
			defaultMessage: "Send course invite",
		} );

		return (
			<MyYoastModal
				isOpen={ open }
				onClose={ this.props.inviteModalClose }
				modalAriaLabel={ modalAriaLabel }
			>
				<CourseInvite
					inviteStudentEmail={ this.props.inviteStudentEmail }
					inviteStudentEmailConfirmation={ this.props.inviteStudentEmailConfirmation }
					onStudentEmailChange={ this.props.onStudentEmailChange }
					onStudentEmailConfirmationChange={ this.props.onStudentEmailConfirmationChange }
					courseInviteError={ this.props.courseInviteError }
					onCancelClick={ this.props.inviteModalClose }
					onInviteClick={ this.props.onInviteClick }
					onBulkInviteClick={ this.props.onBulkInviteClick }
				/>
			</MyYoastModal>
		);
	}

	/**
	 * Returns a course actions column.
	 * @param {Object} course the course object.
	 * @returns {JSXElement} Returns a column with either a button, information about the course progress, or information about the course owner.
	 */
	getCourseActions( course ) {
		const currentUser = getUserId();
		const isSwitchable = course.status === "not started" || ! course.outsideTrialProgress;

		if ( currentUser === course.buyerId && isSwitchable ) {
			return (
				<ColumnFixedWidthResponsive>
					<ResponsiveLargeButton
						onClick={ () => this.props.inviteModalOpen( course.id ) }
					>{ this.props.intl.formatMessage( messages.editStudent ) }</ResponsiveLargeButton>
				</ColumnFixedWidthResponsive>
			);
		}

		if ( currentUser === course.buyerId && ! isSwitchable ) {
			return (
				<ColumnFixedWidthResponsive>
					<FormattedMessage
						id="courses.enrollments.progress"
						defaultMessage="Course in progress"
					/>
				</ColumnFixedWidthResponsive>
			);
		}
		if ( currentUser === course.studentId && course.studentId !== course.buyerId && course.buyerId ) {
			return (
				<ColumnFixedWidthResponsive>
					<span key={ course.id }>
						<strong><FormattedMessage id="owner.name" defaultMessage="Owner: " /></strong>
						{ course.buyerName }
						<br />
						<strong><FormattedMessage id="owner.email" defaultMessage="Email: " /></strong>
						{ course.buyerEmail }
					</span>
				</ColumnFixedWidthResponsive>
			);
		}

		return <ColumnFixedWidthResponsive />;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const { groupedCourseEnrollments } = this.props;

		if ( isEmpty( groupedCourseEnrollments ) ) {
			return this.renderNoResults();
		}

		const bulkEnrollments       = groupedCourseEnrollments.filter( e => e.id.startsWith( "bulk" ) );
		const individualEnrollments = groupedCourseEnrollments.filter( e => ! e.id.startsWith( "bulk" ) );

		const tables = [ [ messages.subscriptions, bulkEnrollments ], [ messages.courses, individualEnrollments ] ];

		return (
			<div>
				{ tables.map( ( [ headerMessage, enrollments ] ) => {
					return (
						<Paper>
							<ListTable>
								{ enrollments.map( ( enrollment ) => {
									return (
										<RowMobileCollapse key={ enrollment.id }>
											<CourseColumnIcon separator={ true }><CourseIcon
												src={ enrollment.icon }
												alt=""
											/></CourseColumnIcon>
											<ColumnPrimaryResponsive
												ellipsis={ true }
												headerLabel={ this.props.intl.formatMessage( headerMessage ) }
											>
												{ enrollment.courseName }
											</ColumnPrimaryResponsive>
											<ColumnMinWidthResponsive
												ellipsis={ true }
												headerLabel={ this.props.intl.formatMessage( messages.studentName ) }
											>
												<strong>{ enrollment.studentName }</strong><br />
												{ enrollment.studentEmail }
											</ColumnMinWidthResponsive>
											{ this.getCourseActions( enrollment ) }
										</RowMobileCollapse> );
								} ) }
							</ListTable>
						</Paper>
					);
				} ) }
				{ this.getModal() }
			</div>
		);
	}
}

CoursesEnrollments.propTypes = {
	inviteModalOpen: PropTypes.func.isRequired,
	inviteModalClose: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadCourseEnrollments: PropTypes.func,
	loadCourses: PropTypes.func,
	groupedCourseEnrollments: PropTypes.array,
	inviteModalIsOpen: PropTypes.bool,
	onInviteClick: PropTypes.func,
	onBulkInviteClick: PropTypes.func,
	inviteStudentEmail: PropTypes.string,
	inviteStudentEmailConfirmation: PropTypes.string,
	onStudentEmailChange: PropTypes.func,
	onStudentEmailConfirmationChange: PropTypes.func,
	courseInviteError: PropTypes.object,
	loadOrders: PropTypes.func,
	loadProducts: PropTypes.func,
	loadProductGroups: PropTypes.func,
};

export default injectIntl( CoursesEnrollments );
