import { connect } from "react-redux";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, updateInviteStudentEmailConfirmation,
} from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];
		let courseProps = {
			id: course.id,
			progress: course.progress,
			courseId: course.courseId,
			courseName: course.course.name,
			icon: course.course.product.icon,
			buyerId: course.buyerId,
			buyerEmail: course.order.customerEmail,
			buyerName: course.buyer.userFirstName  + " " + course.buyer.userLastName,
			status: course.status,
			studentEmail: course.student.email,
			studentId: course.studentId,
			studentName: course.student.userFirstName  + " " + course.student.userLastName,
		};

		return courseProps;
	} );

	let inviteModalIsOpen = state.ui.courseInviteModal.courseInviteModalOpen;
	let inviteStudentEmail = state.ui.courseInviteModal.studentEmail;
	let inviteStudentEmailConfirmation = state.ui.courseInviteModal.studentEmailConfirmation;

	return {
		inviteModalIsOpen,
		inviteStudentEmail,
		inviteStudentEmailConfirmation,
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadData: () => dispatch( retrieveCoursesEnrollments() ),
		inviteModalOpen: () => dispatch( courseInviteModalOpen() ),
		inviteModalClose: () => dispatch( courseInviteModalClose() ),
		onClose: () => dispatch( courseInviteModalClose() ),
		onInviteClick: () => dispatch( () => {} ),
		onStudentEmailChange: ( studentEmail ) => dispatch( updateInviteStudentEmail( studentEmail ) ),
		onStudentEmailConfirmationChange: ( studentEmail ) => dispatch( updateInviteStudentEmailConfirmation( studentEmail ) ),
	};
};

const CoursesEnrollmentsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesEnrollments );

export default CoursesEnrollmentsContainer;
