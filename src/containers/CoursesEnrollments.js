import { connect } from "react-redux";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, retrieveCourses, updateInviteStudentEmailConfirmation, sendCourseInvite,
} from "../actions/courses";
import CoursesEnrollments from "../components/CoursesEnrollments";

export const mapStateToProps = ( state ) => {
	const allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( enrollmentId => {
		const enrollment = state.entities.coursesEnrollments.byId[ enrollmentId ];

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
			icon = enrollment.course.products[ 0 ] ? enrollment.course.products[ 0 ].icon : "";
		}

		if ( enrollment.order ) {
			buyerName = [ enrollment.buyer.userFirstName, enrollment.buyer.userLastName ].join( " " );
			buyerEmail = enrollment.order.customerEmail;
		}

		if ( enrollment.student ) {
			studentName = [ enrollment.student.userFirstName, enrollment.student.userLastName ].join( " " );
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
			isTrial: enrollment.isTrial,
			outsideTrialProgress: enrollment.outsideTrialProgress,
		};
	} ).filter( ( enrollment ) => !! enrollment );

	const allCourseIds = state.entities.courses.allIds;
	const freeEnrollments = allCourseIds
		.filter( ( courseId ) => {
			const course = state.entities.courses.byId[ courseId ];
			if ( ! course.open ) {
				return false;
			}

			// Don't show a free enrollment is the user is already enrolled.
			return coursesEnrollments.every( enrollment => enrollment.courseId !== courseId );
		} )
		.map( ( courseId ) => {
			const course = state.entities.courses.byId[ courseId ];
			let icon = course.iconUrl;
			if ( ! icon ) {
				icon = course.products[ 0 ] ? course.products[ 0 ].icon : "";
			}

			return {
				// EnrollmentId is not unique across users.
				id: "free-course-" + courseId,
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


	coursesEnrollments = coursesEnrollments.concat( freeEnrollments );


	const inviteModalIsOpen = state.ui.courseInviteModal.courseInviteModalOpen;
	const inviteStudentEmail = state.ui.courseInviteModal.studentEmail;
	const inviteStudentEmailConfirmation = state.ui.courseInviteModal.studentEmailConfirmation;
	const openedCourseEnrollmentId = state.ui.courseInviteModal.openedCourseEnrollmentId;
	const courseInviteError = state.ui.courseInviteModal.courseInviteError;

	return {
		openedCourseEnrollmentId,
		courseInviteError,
		inviteModalIsOpen,
		inviteStudentEmail,
		inviteStudentEmailConfirmation,
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadCourseEnrollments: () => dispatch( retrieveCoursesEnrollments() ),
		loadCourses: () => dispatch( retrieveCourses() ),
		inviteModalOpen: ( courseEnrollmentId ) => dispatch( courseInviteModalOpen( courseEnrollmentId ) ),
		inviteModalClose: () => dispatch( courseInviteModalClose() ),
		onClose: () => dispatch( courseInviteModalClose() ),
		onInviteClick: ( courseEnrollmentId, emailInvitee ) => dispatch( sendCourseInvite( courseEnrollmentId, emailInvitee ) ),
		onStudentEmailChange: ( studentEmail ) => dispatch( updateInviteStudentEmail( studentEmail ) ),
		onStudentEmailConfirmationChange: ( studentEmail ) => dispatch( updateInviteStudentEmailConfirmation( studentEmail ) ),
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	const courseEnrollmentId = stateProps.openedCourseEnrollmentId;
	const emailInvitee = stateProps.inviteStudentEmail;

	const onInviteClick = () => {
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
