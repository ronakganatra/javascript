import { connect } from "react-redux";

import {
	courseInviteModalClose,
	courseInviteModalOpen,
	updateInviteStudentEmail,
	retrieveCourseEnrollments,
	retrieveCourses,
	updateInviteStudentEmailConfirmation,
	sendCourseInvite,
	sendBulkInvite,
} from "../actions/courses";
import { getOrders } from "../actions/orders";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
import CourseEnrollments from "../components/CourseEnrollments";
import { getGroupedCourseEnrollments } from "../selectors/entities/courseEnrollments";
import { getCourseInviteModal, getCourseInviteRequest } from "../selectors/ui/courses";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const groupedCourseEnrollments = getGroupedCourseEnrollments( state );
	const courseInviteModal = getCourseInviteModal( state );
	const courseInviteRequest = getCourseInviteRequest( state );

	return {
		openedCourseEnrollmentId: courseInviteModal.openedCourseEnrollmentId,
		courseInviteError: courseInviteModal.courseInviteError,
		requestingCourseInvite: courseInviteRequest.requestingCourseInvite,
		inviteModalIsOpen: courseInviteModal.courseInviteModalOpen,
		inviteStudentEmail: courseInviteModal.studentEmail,
		inviteStudentEmailConfirmation: courseInviteModal.studentEmailConfirmation,
		groupedCourseEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		loadCourseEnrollments: () => dispatch( retrieveCourseEnrollments() ),
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

const CourseEnrollmentsContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( CourseEnrollments );

export default CourseEnrollmentsContainer;
