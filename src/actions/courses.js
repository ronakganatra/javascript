import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";
import _unionBy from "lodash/unionBy";

export const RETRIEVE_COURSES_REQUEST = "RETRIEVE_COURSES_REQUEST";
export const RETRIEVE_COURSES_SUCCESS = "RETRIEVE_COURSES_SUCCESS";
export const RETRIEVE_COURSES_FAILURE = "RETRIEVE_COURSES_FAILURE";
export const RETRIEVE_COURSESENROLLMENTS_REQUEST = "RETRIEVE_COURSESENROLLMENTS_REQUEST";
export const RETRIEVE_COURSESENROLLMENTS_SUCCESS = "RETRIEVE_COURSESENROLLMENTS_SUCCESS";
export const RETRIEVE_COURSESENROLLMENTS_FAILURE = "RETRIEVE_COURSESENROLLMENTS_FAILURE";
export const COURSE_INVITE_MODAL_OPEN = "COURSE_INVITE_MODAL_OPEN";
export const COURSE_INVITE_MODAL_CLOSE = "COURSE_INVITE_MODAL_CLOSE";
export const UPDATE_STUDENT_EMAIL = "UPDATE_STUDENT_EMAIL";
export const UPDATE_STUDENT_EMAIL_CONFIRMATION = "UPDATE_STUDENT_EMAIL_CONFIRMATION";
export const SEND_COURSE_INVITE_REQUEST = "SEND_COURSE_INVITE_REQUEST";
export const SEND_COURSE_INVITE_SUCCESS = "SEND_COURSE_INVITE_SUCCESS";
export const SEND_COURSE_INVITE_FAILURE = "SEND_COURSE_INVITE_FAILURE";

/**
 * An action creator for the academy invite modal open action.
 *
 * @param {string} courseEnrollmentId The id of the courseEnrollment
 *
 * @returns {Object} An academy invite modal open action.
 */
export function courseInviteModalOpen( courseEnrollmentId ) {
	return {
		type: COURSE_INVITE_MODAL_OPEN,
		courseEnrollmentId: courseEnrollmentId,
	};
}

/**
 * An action creator for the academy invite modal close action.
 *
 * @returns {Object} An academy invite modal close action.
 */
export function courseInviteModalClose() {
	return {
		type: COURSE_INVITE_MODAL_CLOSE,
	};
}

/**
 * An action creator for the update invite student email action.
 *
 * @param {string} studentEmail The name of the student to invite.
 *
 * @returns {Object} An invite update student name action.
 */
export function updateInviteStudentEmail( studentEmail ) {
	return {
		type: UPDATE_STUDENT_EMAIL,
		studentEmail: studentEmail,
	};
}

/**
 * An action creator for the update invite student email confirmation action.
 *
 * @param {string} studentEmail The email of the to be invited student.
 *
 * @returns {Object} An update invite student email confirmation action.
 */
export function updateInviteStudentEmailConfirmation( studentEmail ) {
	return {
		type: UPDATE_STUDENT_EMAIL_CONFIRMATION,
		studentEmail: studentEmail,
	};
}

/**
 * An action creator for the send course invite request action.
 *
 * @returns {Object} A send course invite request action.
 */
export function sendCourseInviteRequest() {
	return {
		type: SEND_COURSE_INVITE_REQUEST,
	};
}

/**
 * An action creator for the send course invite success action.
 *
 * @param {Object} updatedCourseEnrollments The Course Enrollments that were updated.
 *
 * @returns {Object} A send course invite success action.
 */
export function sendCourseInviteSuccess( updatedCourseEnrollments ) {
	if ( ! Array.isArray( updatedCourseEnrollments ) ) {
		updatedCourseEnrollments = [ updatedCourseEnrollments ];
	}
	return {
		type: SEND_COURSE_INVITE_SUCCESS,
		updatedCourseEnrollments,
	};
}

/**
 * An action creator for the send course invite failure action.
 *
 * @param {Object} error The error object that was thrown.
 *
 * @returns {Object} A send course invite failure action.
 */
export function sendCourseInviteFailure( error ) {
	return {
		type: SEND_COURSE_INVITE_FAILURE,
		error,
	};
}

/**
 * An action creator for the server request action.
 *
 * @returns {Object} A server request action.
 */
export function retrieveCoursesRequest() {
	return {
		type: RETRIEVE_COURSES_REQUEST,
	};
}

/**
 * An action creator for the retrieve courses success action.
 *
 * @param {Array} courses The courses to be retrieved.
 *
 * @returns {Object} A retrieve courses success action.
 */
export function retrieveCoursesSuccess( courses ) {
	return {
		type: RETRIEVE_COURSES_SUCCESS,
		courses: courses,
	};
}

/**
 * An action creator for the retrieve courses failure action.
 *
 * @param {string} error The error message.
 *
 * @returns {Object} A retrieve courses failure action.
 */
export function retrieveCoursesFailure( error ) {
	return {
		type: RETRIEVE_COURSES_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the server request action.
 *
 * @returns {Object} A server request action.
 */
export function retrieveCoursesEnrollmentsRequest() {
	return {
		type: RETRIEVE_COURSESENROLLMENTS_REQUEST,
	};
}

/**
 * An action creator for the retrieve courses success action.
 *
 * @param {Array} courses The courses to be retrieved.
 *
 * @returns {Object} A retrieve courses success action.
 */
export function retrieveCoursesEnrollmentsSuccess( courses ) {
	return {
		type: RETRIEVE_COURSESENROLLMENTS_SUCCESS,
		coursesEnrollments: courses,
	};
}

/**
 * An action creator for the retrieve courses failure action.
 *
 * @param {string} error The error message.
 *
 * @returns {Object} A retrieve courses failure action.
 */
export function retrieveCoursesEnrollmentsFailure( error ) {
	return {
		type: RETRIEVE_COURSESENROLLMENTS_FAILURE,
		error: error,
	};
}
/**
 * An action creator for the retrieve courseEnrollments action.
 *
 * @returns {Object} A retrieve courses action.
 */
export function retrieveCourses() {
	return ( dispatch ) => {
		dispatch( retrieveCoursesRequest() );

		const request = prepareInternalRequest( "Courses" );

		return doRequest( request )
			.then( json =>
				dispatch( retrieveCoursesSuccess( json ) ) )
			.catch( error => dispatch( retrieveCoursesFailure( error ) ) );
	};
}

/**
 * An action creator for the retrieve coursesEnrollments action.
 *
 * @returns {Object} A retrieve courses enrollments action.
 */
export function retrieveCoursesEnrollments() {
	return ( dispatch ) => {
		dispatch( retrieveCoursesEnrollmentsRequest() );
		const userId = getUserId();

		const studentRequest = prepareInternalRequest( `Customers/${userId}/courseEnrollments/` );
		const ownedRequest   = prepareInternalRequest( `Customers/${userId}/ownedCourseEnrollments/` );

		return Promise.all( [ doRequest( studentRequest ), doRequest( ownedRequest ) ] )
			.then( ( [ studentJson, ownedJson ] ) => dispatch( retrieveCoursesEnrollmentsSuccess( _unionBy( studentJson, ownedJson, "id" ) ) ) )
			.catch( error => dispatch( retrieveCoursesEnrollmentsFailure( error ) ) );
	};
}

/**
 * An action creator for the send course invite action.
 *
 * @param {string} courseEnrollmentId The id of the courseEnrollment.
 * @param {string} emailInvitee The email address of the student that should be invited.
 *
 * @returns {Object} A send course invite action.
 */
export function sendCourseInvite( courseEnrollmentId, emailInvitee ) {
	return ( dispatch ) => {
		dispatch( sendCourseInviteRequest() );

		const request = prepareInternalRequest( `CourseEnrollments/${courseEnrollmentId}/invite/`, "POST", { email: emailInvitee } );

		return doRequest( request )
			.then( ( json ) => {
				dispatch( sendCourseInviteSuccess( json ) );
				dispatch( retrieveCoursesEnrollments() );
			} )
			.catch( error => dispatch( sendCourseInviteFailure( error ) ) );
	};
}

/**
 *  An action creator for the send bulk invite action.
 *
 * @param {string} lineItemId 		The source ID of the line item associated with the course enrollment.
 * @param {number} lineItemNumber	The lineItemNumber of the course enrollment.
 * @param {string} emailInvitee		The email address of the invitee.
 *
 * @returns {Object}				A bulk invite action.
 */
export function sendBulkInvite( lineItemId, lineItemNumber, emailInvitee ) {
	return ( dispatch ) => {
		dispatch( sendCourseInviteRequest() );

		const request = prepareInternalRequest( "CourseEnrollments/bulkInvite/", "POST", { lineItemId: lineItemId, lineItemNumber: lineItemNumber, email: emailInvitee } );

		return doRequest( request )
			.then( ( json ) => {
				dispatch( sendCourseInviteSuccess( json ) );
				dispatch( retrieveCoursesEnrollments() );
			} )
			.catch( error => dispatch( sendCourseInviteFailure( error ) ) );
	};
}
