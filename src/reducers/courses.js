/**
 * Initial state
 */
import { RETRIEVE_COURSES_REQUEST, RETRIEVE_COURSES_SUCCESS, RETRIEVE_COURSES_FAILURE } from "../actions/courses";
//
// import _isUndefined from "lodash/isUndefined";
// import _pull from "lodash/pull";
// import _remove from "lodash/remove";
// import _union from "lodash/union";
// import _unset from "lodash/unset";
// import reduceReducers from "reduce-reducers";

const rootState = {
	entities: {
		courses: {
			byId: {},
			allIds: [],
		},
	},
	// ui: {
	// 	courses: {
	// 		// Whether or not we are currently enrolling to a new course.
	// 		addPopupOpen: false,
	//
	// 		// Whether or not we are currently doing a request to the server to enroll to a new course.
	// 		enrollingCourse: false,
	//
	// 		// The course ID of the course that is currently trying to be enrolled.
	// 		enrollingCourseId: "",
	//
	// 		// Whether or not linking of a course has failed.
	// 		enrollingCourseFailed: false,
	//
	// 		// The error object we retrieved from the server, which contains information on why the enrollment failed.
	// 		enrollingCourseError: null,
	//
	// 		// Whether or not we are currently doing a request to the server to retrieve the courses.
	// 		retrievingCourses: false,
	//
	// 		// Whether or not the retrieving of the courses has failed.
	// 		retrievingCoursesFailed: false,
	//
	// 		// The error message we retrieved from the server about why the retrieving of the courses failed.
	// 		retrievingCoursesError: "",
	//
	// 		// Whether or not the connected courses have been retrieved from the server.
	// 		coursesRetrieved: false,
	// 	},
	// },
};

/**
 * A reducer for the courses object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Courses object.
 */
export function coursesReducer( state = rootState.ui.courses, action ) {
	switch ( action.type ) {
		case UPDATE_COURSE_ENROLLMENT:
			return Object.assign( {}, state, {
				enrollingCourse: true,
				enrollingCourseId: action.courseId,
			} );
		case ENROLLING_COURSE_REQUEST:
			return Object.assign( {}, state, {
				linkingSite: true,
			} );
		case ENROLLING_COURSE_SUCCESS:
			return Object.assign( {}, state, {
				linkSiteFailed: false,
				addSitePopupOpen: false,
				linkingSiteUrl: "",
				linkSiteError: null,
				linkingSite: false,
			} );
		case ENROLLING_COURSE_FAILURE:
			return Object.assign( {}, state, {
				enrollingCourseFailed: true,
				enrollingCourseError: action.enrollingCourseError,
				enrollingCourse: false,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
function retrieveCoursesReducer( state = rootState.ui.sites, action ) {
	switch ( action.type ) {
		case RETRIEVE_COURSES_REQUEST:
			return Object.assign( {}, state, {
				retrievingCourses: true,
			} );
		case RETRIEVE_COURSES_SUCCESS:
			return Object.assign( {}, state, {
				retrievingCourses: false,
				retrievingCoursesFailed: false,
				CoursesRetrieved: true,
				retrievingCoursesError: null,
			} );
		case RETRIEVE_COURSES_FAILURE:
			return Object.assign( {}, state, {
				retrievingCourses: false,
				retrievingCoursesFailed: true,
				retrievingCoursesError: action.retrieveCoursesError,
			} );
		default:
			return state;
	}
}

let uiSites = reduceReducers( coursesReducer, retrieveCoursesReducer );

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
export function uiCoursesReducer( state = rootState.ui.courses, action ) {
	return uiCourses( state, action );
}

// /**
//  * Returns a new courses object with only course ids.
//  *
//  * @param {Object} course The course to pluck.
//  * @returns {Object} New courses object with only course ids.
//  */
// function pluckSubscriptionIds( course ) {
// 	if ( _isUndefined( site.subscriptions ) ) {
// 		return Object.assign( {}, site, { subscriptions: [] } );
// 	}
//
// 	return Object.assign( {}, site, { subscriptions: site.subscriptions.map( subscription => subscription.id ) } );
// }
//
// /**
//  * A reducer for the byId object.
//  *
//  * @param {Object} state The current state of the byId object.
//  * @param {Object} action The current action received.
//  *
//  * @returns {Object} The updated byId object.
//  */
// export function byIdReducer( state = rootState.entities.courses.byId, action ) {
// 	let sites = Object.assign( {}, state );
//
// 	switch ( action.type ) {
// 		case LINK_SITE_SUCCESS:
// 			sites[ action.site.id ] = pluckCoursesIds( action.site );
// 			break;
//
// 		case RETRIEVE_SITES_SUCCESS:
// 			action.sites.forEach( ( site ) => {
// 				sites[ site.id ] = pluckSubscriptionIds( site );
// 			} );
// 			break;
//
// 		case SITE_ADD_SUBSCRIPTION_SUCCESS:
// 			sites[ action.siteId ].subscriptions.push( action.subscriptionId );
// 			break;
//
// 		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
// 			_remove( sites[ action.siteId ].subscriptions, subscriptionId => subscriptionId === action.subscriptionId );
// 			break;
//
// 		case SITE_REMOVE_SUCCESS:
// 			_unset( sites, action.siteId );
// 			break;
// 	}
// 	return sites;
// }

/**
 * A reducer for the allIds array.
 *
 * @param {Array} state The current state of the allIds array.
 * @param {Object} action The current action received.
 *
 * @returns {Array} The updated allIds array.
 */
export function allIdsReducer( state = rootState.entities.courses.allIds, action ) {
	let courses;
	switch ( action.type ) {
		case ENROLLING_COURSE_SUCCESS:
			return [ ...state, action.site.id ];
		case RETRIEVE_COURSES_SUCCESS:
			sites = _union( state, action.sites.map( site => site.id ) );
			return sites;
		default:
			return state;
	}
}
