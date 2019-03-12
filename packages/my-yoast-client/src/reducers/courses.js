import {
	RETRIEVE_COURSES_SUCCESS, RETRIEVE_COURSES_REQUEST, RETRIEVE_COURSES_FAILURE, RETRIEVE_COURSE_ENROLLMENTS_REQUEST,
	RETRIEVE_COURSE_ENROLLMENTS_SUCCESS, RETRIEVE_COURSE_ENROLLMENTS_FAILURE, COURSE_INVITE_MODAL_OPEN,
	COURSE_INVITE_MODAL_CLOSE,
	UPDATE_STUDENT_EMAIL, UPDATE_STUDENT_EMAIL_CONFIRMATION, SEND_COURSE_INVITE_REQUEST, SEND_COURSE_INVITE_SUCCESS,
	SEND_COURSE_INVITE_FAILURE,
} from "../actions/courses";
import _union from "lodash/union";

/**
 * Initial state
 */
const rootState = {
	entities: {
		courses: {
			byId: {},
			allIds: [],
		},
		courseEnrollments: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		courses: {
			retrievingCourses: false,
			error: "",
		},
		courseEnrollments: {
			retrievingCourseEnrollments: false,
			error: "",
		},
		courseInviteModal: {
			courseInviteModalOpen: false,
			openedCourseEnrollmentId: "",
			studentEmail: "",
			studentEmailConfirmation: "",
			courseInviteError: null,
		},
		courseInviteRequest: {
			requestingCourseInvite: false,
		},
	},
};


/**
 * A reducer for the courses object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Courses object.
 */
export function uiCoursesReducer( state = rootState.ui.courses, action ) {
	switch ( action.type ) {
		case RETRIEVE_COURSES_REQUEST:
			return Object.assign( {}, state, {
				retrievingCourses: true,
				error: "",
			} );
		case RETRIEVE_COURSES_SUCCESS:
			return Object.assign( {}, state, {
				retrievingCourses: false,
			} );
		case RETRIEVE_COURSES_FAILURE:
			return Object.assign( {}, state, {
				retrievingCourses: false,
				error: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the courseEnrollments object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated CourseEnrollments object.
 */
export function uiCourseEnrollmentsReducer( state = rootState.ui.courseEnrollments, action ) {
	switch ( action.type ) {
		case RETRIEVE_COURSE_ENROLLMENTS_REQUEST:
			return Object.assign( {}, state, {
				retrievingCourseEnrollments: true,
				error: "",
			} );
		case RETRIEVE_COURSE_ENROLLMENTS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingCourseEnrollments: false,
			} );
		case RETRIEVE_COURSE_ENROLLMENTS_FAILURE:
			return Object.assign( {}, state, {
				retrievingCourseEnrollments: false,
				error: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the invite modal object within the invite modal object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated invite modal object.
 */
export function uiCourseInviteModalReducer( state = rootState.ui.courseInviteModal, action ) {
	/* eslint complexity: ["error", 7]*/
	switch ( action.type ) {
		case COURSE_INVITE_MODAL_OPEN:
			return Object.assign( {}, state, {
				courseInviteModalOpen: true,
				openedCourseEnrollmentId: action.courseEnrollmentId,
			} );
		case COURSE_INVITE_MODAL_CLOSE:
			return Object.assign( {}, state, {
				courseInviteModalOpen: false,
				openedCourseEnrollmentId: "",
				studentEmail: "",
				studentEmailConfirmation: "",
				courseInviteError: null,
			} );
		case UPDATE_STUDENT_EMAIL:
			return Object.assign( {}, state, {
				studentEmail: action.studentEmail,
			} );
		case UPDATE_STUDENT_EMAIL_CONFIRMATION:
			return Object.assign( {}, state, {
				studentEmailConfirmation: action.studentEmail,
			} );
		case SEND_COURSE_INVITE_SUCCESS:
			return Object.assign( {}, state, {
				courseInviteModalOpen: false,
				courseInviteError: null,
			} );
		case SEND_COURSE_INVITE_FAILURE:
			return Object.assign( {}, state, {
				courseInviteError: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the invite request within the ui invite modal object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated invite modal object.
 */
export function uiCourseInviteRequestReducer( state = rootState.ui.courseInviteRequest, action ) {
	switch ( action.type ) {
		case SEND_COURSE_INVITE_REQUEST:
			return Object.assign( {}, state, {
				requestingCourseInvite: true,
			} );
		case SEND_COURSE_INVITE_SUCCESS:
			return Object.assign( {}, state, {
				requestingCourseInvite: false,
			} );
		case SEND_COURSE_INVITE_FAILURE:
			return Object.assign( {}, state, {
				requestingCourseInvite: false,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdCoursesReducer list.
 *
 * @param {Object} state The current state of the byIdCoursesReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdCoursesReducer object.
 */
export function byIdCoursesReducer( state = rootState.entities.courses.byId, action ) {
	let courses;

	switch ( action.type ) {
		case RETRIEVE_COURSES_SUCCESS:
			courses = Object.assign( {}, state );

			action.courses.forEach( ( course ) => {
				courses[ course.id ] = course;
			} );

			return courses;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsCoursesReducer list.
 *
 * @param {Array} state The current state of the allIdsCoursesReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsCoursesReducer array.
 */
export function allIdsCoursesReducer( state = rootState.entities.courses.allIds, action ) {
	switch ( action.type ) {
		case RETRIEVE_COURSES_SUCCESS:
			return _union( state, action.courses.map( course => course.id ) );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdCoursesReducer list.
 *
 * @param {Object} state The current state of the byIdCoursesReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdCoursesReducer object.
 */
export function byIdCourseEnrollmentsReducer( state = rootState.entities.courseEnrollments.byId, action ) {
	let courses;
	switch ( action.type ) {
		case RETRIEVE_COURSE_ENROLLMENTS_SUCCESS:
			courses = Object.assign( {}, state );

			action.courseEnrollments.forEach( ( course ) => {
				courses[ course.id ] = course;
			} );

			return courses;
		case SEND_COURSE_INVITE_SUCCESS:
			courses = Object.assign( {}, state );

			action.updatedCourseEnrollments.map( ( updatedCourseEnrollment ) => {
				courses[ updatedCourseEnrollment.id ] = updatedCourseEnrollment;
			} );

			return courses;
		default:
			return state;
	}
}

/**
 * A reducer for the allIdsCoursesReducer list.
 *
 * @param {Array} state The current state of the allIdsCoursesReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsCoursesReducer array.
 */
export function allIdsCourseEnrollmentsReducer( state = rootState.entities.courseEnrollments.allIds, action ) {
	switch ( action.type ) {
		case RETRIEVE_COURSE_ENROLLMENTS_SUCCESS:
			return _union( state, action.courseEnrollments.map( course => course.id ) );
		default:
			return state;
	}
}
