import { connect } from "react-redux";
import flatten from "lodash/flatten";
import _includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import {
	courseInviteModalClose, courseInviteModalOpen, updateInviteStudentEmail,
	retrieveCoursesEnrollments, retrieveCourses, updateInviteStudentEmailConfirmation, sendCourseInvite,
} from "../actions/courses";
import { getOrders } from "../actions/orders";
import { getAllProducts } from "../actions/products";
import { getProductGroups } from "../actions/productGroups";
// F import LineItems from "../components/LineItems";
import CoursesEnrollments from "../components/CoursesEnrollments";
// C import _includes from "lodash/includes";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const allIds = state.entities.coursesEnrollments.allIds;
	const lineItemEnrollmentIds = {};
	allIds.forEach( ( enrollmentId ) => {
		const lineItemId = state.entities.coursesEnrollments.byId[ enrollmentId ].lineItemId;
		// Check if there is a line item ID for the enrollment
		if ( lineItemId ) {
			if ( ! _includes( Object.keys( lineItemEnrollmentIds ), lineItemId ) ) {
				lineItemEnrollmentIds[ lineItemId ] = [ enrollmentId ];
			}
			lineItemEnrollmentIds[ lineItemId ].push( enrollmentId );
		}
	} );

	const allLineItemIds = Object.keys( lineItemEnrollmentIds );
	const allOrderIds = state.entities.orders.allIds;
	const allCourseEnrollmentIds = state.entities.coursesEnrollments.allIds;

	const lineItems = flatten( allOrderIds.map( orderId => {
		return state.entities.orders.byId[ orderId ].items;
	} ) );
	const groupedEnrollmentLineItems = {};
	allLineItemIds.map( ( lineItemId ) => {
		if ( ! _includes( Object.keys( groupedEnrollmentLineItems ), lineItemId ) ) {
			groupedEnrollmentLineItems[ lineItemId ] = lineItems.filter( ( item ) => item.id === lineItemId )[ 0 ];
		}
	} );

	const groupedProductsByLineItem = {};
	const groupedProductGroupsByLineItem = {};
	if ( ! isEmpty( groupedEnrollmentLineItems ) && ! isEmpty( lineItems ) && ! isEmpty( state.entities.products.allIds ) ) {
		allLineItemIds.map( ( itemId ) => {
			groupedProductsByLineItem[ itemId ] = state.entities.products.byId[ groupedEnrollmentLineItems[ itemId ].productId ];
			groupedProductGroupsByLineItem[ itemId ] = {};
			groupedProductsByLineItem[ itemId ].productGroups.map( ( productGroup ) => {
				groupedProductGroupsByLineItem[ itemId ] = state.entities.productGroups.byId[ productGroup.id ];
			} );
		} );
	}

	let groupedCourseEnrollments = [];
	// Looping over the grouped productGroups ensures that they already exists
	Object.keys( groupedProductGroupsByLineItem ).map( ( lineItemId ) => {
		const prodGroup = groupedProductGroupsByLineItem[ lineItemId ];
		if ( prodGroup ) {
			console.log( lineItemId );
			console.log( prodGroup );
			const icon = prodGroup.icon || "";
			let buyerEmail = "";
			let buyerName = "";
			let studentEmail = "";
			let studentName = "";

			const order = state.entities.orders.byId[ groupedEnrollmentLineItems[ lineItemId ].orderId ];
			const enrollment = state.entities.coursesEnrollments.byId[ lineItemEnrollmentIds[ lineItemId ][ 0 ] ];
			if ( order ) {
				buyerName = [ order.customerFirstName, order.customerLastName ].join( " " );
				buyerEmail = order.customerEmail;
			}

			if ( enrollment.student ) {
				studentName = [ enrollment.student.userFirstName, enrollment.student.userLastName ].join( " " );
				studentEmail = enrollment.student.userEmail;
			}

			const outsideTrialProgress = allCourseEnrollmentIds.some( ( courseEnrollmentId ) => {
				const courseEnrollment = state.entities.coursesEnrollments.byId[ courseEnrollmentId ];
				return courseEnrollment.outsideTrialProgress === true;
			} );
			const progress = allCourseEnrollmentIds.some( ( courseEnrollmentId ) => {
				const courseEnrollment = state.entities.coursesEnrollments.byId[ courseEnrollmentId ];
				return courseEnrollment.progress > 0;
			} ) || 0;

			groupedCourseEnrollments.push( {
				icon: icon,
				id: enrollment.id,
				progress: progress,
				courseId: prodGroup.courseId,
				courseName: prodGroup.name,
				buyerEmail: buyerEmail,
				buyerName: buyerName,
				buyerId: enrollment.buyerId,
				status: enrollment.status,
				studentEmail: studentEmail,
				studentName: studentName,
				isTrial: enrollment.isTrial,
				outsideTrialProgress: outsideTrialProgress,
			} );
		}
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


	groupedCourseEnrollments = groupedCourseEnrollments.concat( freeEnrollments );


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
		groupedCourseEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	console.log( "*-**********--*-*-*-*--*", dispatch( getAllProducts() ) );
	return {
		loadCourseEnrollments: () => dispatch( retrieveCoursesEnrollments() ),
		loadCourses: () => dispatch( retrieveCourses() ),
		loadProductGroups: () => dispatch( getProductGroups() ),
		loadOrders: () => dispatch( getOrders() ),
		loadProducts: () => dispatch( getAllProducts() ),
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
