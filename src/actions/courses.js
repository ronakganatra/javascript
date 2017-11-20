import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

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

/**
 * An action creator for the academy invite modal open action.
 *
 * @returns {Object} An academy invite modal open action.
 */
export function courseInviteModalOpen() {
	return {
		type: COURSE_INVITE_MODAL_OPEN,
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
		studentName: studentEmail,
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
		studentName: studentEmail,
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

		let request = prepareInternalRequest( "Courses" );

		return doRequest( request )
		.then( json =>
		dispatch( retrieveCoursesSuccess( json ) ) )
		.catch( error => dispatch( retrieveCoursesFailure( error ) ) );
	};
}

/**
 * An action creator for the retrieve courseEnrollments action.
 *
 * @returns {Object} A retrieve courses action.
 */
export function retrieveCoursesEnrollments() {
	return ( dispatch ) => {
		dispatch( retrieveCoursesEnrollmentsRequest() );
		let userId = getUserId();

		let request = prepareInternalRequest( `Customers/${userId}/courseEnrollments/` );

		return doRequest( request )
		.then( json =>
			dispatch( retrieveCoursesEnrollmentsSuccess( json ) ) )
		.catch( error => dispatch( retrieveCoursesEnrollmentsFailure( error ) ) );
	};
}
