import { connect } from "react-redux";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, updateInviteStudentEmailConfirmation, sendCourseInvite,
} from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( enrollmentId => {
		let enrollment = state.entities.coursesEnrollments.byId[ enrollmentId ];

		// We don't want to display refunded course enrollments.
		if ( enrollment.status === "refunded" ) {
			return false;
		}

		let icon = enrollment.course.iconUrl;
		let buyerEmail = "";
		let buyerName = "";
		let studentEmail = "";
		let studentName = "";

		if ( ! icon ) {
			icon = enrollment.course.product ? enrollment.course.product.icon : "";
		}

		if ( enrollment.order ) {
			buyerName = enrollment.buyer.userFirstName  + " " + enrollment.buyer.userLastName;
			buyerEmail = enrollment.order.customerEmail;
		}

		if ( enrollment.student ) {
			studentName = enrollment.student.userFirstName  + " " + enrollment.student.userLastName;
			studentEmail = enrollment.student.userEmail;
		}

		return {
			id: enrollment.id,
			progress: enrollment.progress,
			courseId: enrollment.courseId,
			courseName: enrollment.course.name,
			icon: icon,
			buyerId: enrollment.buyerId,
			buyerEmail,
			buyerName,
			status: enrollment.status,
			studentEmail,
			studentId: enrollment.studentId,
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
