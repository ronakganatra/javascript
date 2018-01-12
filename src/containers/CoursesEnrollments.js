import { connect } from "react-redux";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, updateInviteStudentEmailConfirmation, sendCourseInvite,
} from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];

		return {
			id: course.id,
			progress: course.progress,
			courseId: course.courseId,
			courseName: course.course.name,
			icon: course.course.product ? course.course.product.icon : "",
			buyerId: course.buyerId,
			buyerEmail: course.order ? course.order.customerEmail : "",
			buyerName: course.order ? course.buyer.userFirstName  + " " + course.buyer.userLastName : "",
			status: course.status,
			studentEmail: course.student ? course.student.userEmail : "",
			studentId: course.studentId,
			studentName: course.student ? course.student.userFirstName  + " " + course.student.userLastName : "",
		};
	} );

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
