import { connect } from "react-redux";
import _groupBy from "lodash/groupBy";
import _maxBy from "lodash/maxBy";
import _sortBy from "lodash/sortBy";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, retrieveCourses, updateInviteStudentEmailConfirmation, sendCourseInvite,
	sendBulkInvite,
} from "../actions/courses";
import { getOrders } from "../actions/orders";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import CoursesEnrollments from "../components/CoursesEnrollments";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const allIds = state.entities.coursesEnrollments.allIds;
	const courseEnrollments = allIds.map( id => state.entities.coursesEnrollments.byId[ id ] );
	const groupedEnrollments = _groupBy( courseEnrollments, e => e.lineItemId ? `${e.lineItemId}:${e.lineItemNumber}` : e.id );

	let groupedCourseEnrollments = Object.keys( groupedEnrollments ).map( ( identifier ) => {
		const enrollments = groupedEnrollments[ identifier ];
		const firstEnrollment = enrollments[ 0 ];
		const grouped = enrollments.length > 1;

		identifier = grouped ? `bulk:${identifier}` : `individual:${firstEnrollment.id}`;

		let buyerEmail = "";
		let buyerName = "";
		let studentEmail = "";
		let studentName = "";

		const course = state.entities.courses.byId[ firstEnrollment.courseId ];
		const order = state.entities.orders.byId[ firstEnrollment.orderId ];
		if ( order ) {
			buyerName = [ order.customerFirstName, order.customerLastName ].join( " " );
			buyerEmail = order.customerEmail;
		}

		if ( firstEnrollment.student ) {
			studentName = [ firstEnrollment.student.userFirstName, firstEnrollment.student.userLastName ].join( " " );
			studentEmail = firstEnrollment.student.userEmail;
		}

		let icon = "";
		if ( grouped ) {
			icon = "https://yoast.com/app/uploads/2018/11/Training_subscription_MyYoast.png";
		} else {
			icon = ( course.products[ 0 ] ? course.products[ 0 ].icon : "" );
		}

		const outsideTrialProgress = enrollments.some( ( enrollment ) => enrollment.outsideTrialProgress );
		const isTrial = enrollments.some( ( enrollment ) => enrollment.isTrial );
		const progress = _maxBy( enrollments, "progress" ) || 0;
		const status = enrollments.some( ( enrollment ) => enrollment.status === "started" ) ? "started" : "not started";

		return {
			icon,
			id: identifier,
			progress,
			courseId: grouped ? " grouped" : course.id,
			courseName: grouped ? "Training Subscription" : course.name,
			buyerEmail,
			buyerName,
			buyerId: firstEnrollment.buyerId,
			status,
			studentEmail,
			studentName,
			isTrial,
			outsideTrialProgress,
		};
	} );

	const allCourseIds = state.entities.courses.allIds;
	const freeEnrollments = allCourseIds
		.filter( ( courseId ) => {
			const course = state.entities.courses.byId[ courseId ];
			if ( ! course.open ) {
				return false;
			}

			// Don't show a free enrollment is the user is already enrolled.
			return groupedCourseEnrollments.every( enrollment => enrollment.courseId !== courseId );
		} )
		.map( ( courseId ) => {
			const course = state.entities.courses.byId[ courseId ];
			let icon = course.iconUrl;
			if ( ! icon ) {
				icon = course.products[ 0 ] ? course.products[ 0 ].icon : "";
			}

			return {
				// EnrollmentId is not unique across users.
				id: "free-course:" + courseId,
				progress: 0,
				courseId: courseId,
				courseName: course.name,
				icon,
				buyerId: "",
				buyerEmail: "",
				buyerName: "",
				status: "not started",
				studentEmail: state.user.data.profile.email,
				studentId: state.user.userId,
				studentName: [ state.user.data.profile.userFirstName, state.user.data.profile.userLastName ].join( " " ),
			};
		} );

	groupedCourseEnrollments = _sortBy( groupedCourseEnrollments, "courseId" );
	groupedCourseEnrollments = groupedCourseEnrollments.concat( freeEnrollments );

	const inviteModalIsOpen = state.ui.courseInviteModal.courseInviteModalOpen;
	const inviteStudentEmail = state.ui.courseInviteModal.studentEmail;
	const inviteStudentEmailConfirmation = state.ui.courseInviteModal.studentEmailConfirmation;
	const openedCourseEnrollmentId = state.ui.courseInviteModal.openedCourseEnrollmentId;
	const courseInviteError = state.ui.courseInviteModal.courseInviteError;
	const requestingCourseInvite = state.ui.courseInviteRequest.requestingCourseInvite;

	return {
		openedCourseEnrollmentId,
		courseInviteError,
		requestingCourseInvite,
		inviteModalIsOpen,
		inviteStudentEmail,
		inviteStudentEmailConfirmation,
		groupedCourseEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadCourseEnrollments: () => dispatch( retrieveCoursesEnrollments() ),
		loadCourses: () => dispatch( retrieveCourses() ),
		loadProductGroups: () => dispatch( getProductGroups() ),
		loadOrders: () => dispatch( getOrders() ),
		loadProducts: () => dispatch( getAllProducts() ),
		inviteModalOpen: ( courseEnrollmentId ) => dispatch( courseInviteModalOpen( courseEnrollmentId ) ),
		inviteModalClose: () => dispatch( courseInviteModalClose() ),
		onClose: () => dispatch( courseInviteModalClose() ),
		onIndividualInviteClick: ( courseEnrollmentId, emailInvitee ) => dispatch( sendCourseInvite( courseEnrollmentId, emailInvitee ) ),
		onBulkInviteClick: ( lineItemId, lineItemNumber, emailInvitee ) => dispatch( sendBulkInvite( lineItemId, lineItemNumber, emailInvitee ) ),
		onStudentEmailChange: ( studentEmail ) => dispatch( updateInviteStudentEmail( studentEmail ) ),
		onStudentEmailConfirmationChange: ( studentEmail ) => dispatch( updateInviteStudentEmailConfirmation( studentEmail ) ),
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const courseEnrollmentId = stateProps.openedCourseEnrollmentId;
	const emailInvitee = stateProps.inviteStudentEmail;

	const onInviteClick = () => {
		const [ type, id, number ] = courseEnrollmentId.split( ":" );
		switch ( type ) {
			case "individual":
				dispatchProps.onIndividualInviteClick( id, emailInvitee );
				break;
			case "bulk":
				dispatchProps.onBulkInviteClick( id, number, emailInvitee );
				break;
		}
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onInviteClick } );
};

const CoursesEnrollmentsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( CoursesEnrollments );

export default CoursesEnrollmentsContainer;
