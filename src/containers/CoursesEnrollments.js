import { connect } from "react-redux";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, updateInviteStudentEmailConfirmation, sendCourseInvite,
} from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( courseId => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];

		// We don't want to display refunded course enrollments.
		if ( course.status === "refunded" ) {
			return false;
		}

		let icon = course.course.iconUrl;
		let buyerEmail = "";
		let buyerName = "";
		let studentEmail = "";
		let studentName = "";

		if ( ! icon ) {
			icon = course.course.product ? course.course.product.icon : "";
		}

		if ( course.order ) {
			buyerName = course.buyer.userFirstName  + " " + course.buyer.userLastName;
			buyerEmail = course.order.customerEmail;
		}

		if ( course.student ) {
			studentName = course.student.userFirstName  + " " + course.student.userLastName;
			studentEmail = course.student.userEmail;
		}

		return {
			id: course.id,
			progress: course.progress,
			courseId: course.courseId,
			courseName: course.course.name,
			icon: icon,
			buyerId: course.buyerId,
			buyerEmail,
			buyerName,
			status: course.status,
			studentEmail,
			studentId: course.studentId,
			studentName,
		};
	} ).filter( ( enrollment ) => !! enrollment );

	let inviteModalIsOpen = state.ui.courseInviteModal.courseInviteModalOpen;
	let inviteStudentEmail = state.ui.courseInviteModal.studentEmail;
	let inviteStudentEmailConfirmation = state.ui.courseInviteModal.studentEmailConfirmation;
	let openedCourseEnrollmentId = state.ui.courseInviteModal.openedCourseEnrollmentId;
	let courseInviteError = state.ui.courseInviteModal.courseInviteError;

	return {
		openedCourseEnrollmentId,
		courseInviteError,
		inviteModalIsOpen,
		inviteStudentEmail,
		inviteStudentEmailConfirmation,
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadData: () => dispatch( retrieveCoursesEnrollments() ),
		inviteModalOpen: ( courseEnrollmentId ) => dispatch( courseInviteModalOpen( courseEnrollmentId ) ),
		inviteModalClose: () => dispatch( courseInviteModalClose() ),
		onClose: () => dispatch( courseInviteModalClose() ),
		onInviteClick: ( courseEnrollmentId, emailInvitee ) => dispatch( sendCourseInvite( courseEnrollmentId, emailInvitee ) ),
		onStudentEmailChange: ( studentEmail ) => dispatch( updateInviteStudentEmail( studentEmail ) ),
		onStudentEmailConfirmationChange: ( studentEmail ) => dispatch( updateInviteStudentEmailConfirmation( studentEmail ) ),
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let courseEnrollmentId = stateProps.openedCourseEnrollmentId;
	let emailInvitee = stateProps.inviteStudentEmail;

	let onInviteClick = () => {
		dispatchProps.onInviteClick( courseEnrollmentId, emailInvitee );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onInviteClick } );
};

const CoursesEnrollmentsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( CoursesEnrollments );

export default CoursesEnrollmentsContainer;
