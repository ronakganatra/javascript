import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const RETRIEVE_COURSES_REQUEST = "RETRIEVE_COURSES_REQUEST";
export const RETRIEVE_COURSES_SUCCESS = "RETRIEVE_COURSES_SUCCESS";
export const RETRIEVE_COURSES_FAILURE = "RETRIEVE_COURSES_FAILURE";
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
 * @param {string} errorText The error message.
 *
 * @returns {Object} A retrieve courses failure action.
 */
export function retrieveCoursesFailure( errorText ) {
	return {
		type: RETRIEVE_COURSES_FAILURE,
		retrieveError: errorText,
	};
}
/**
 * An action creator for the retrieve courses action.
 *
 * @returns {Object} A retrieve courses action.
 */
export function retrieveCourses() {
	return ( dispatch ) => {
		dispatch( retrieveCoursesRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/courses/` );

		return doRequest( request )
		.then( json =>
			console.log( json ) )
		// dispatch( retrieveCoursesSuccess( json ) ) )
		.catch( error => dispatch( retrieveCoursesFailure( error.message ) ) );
	};
}
