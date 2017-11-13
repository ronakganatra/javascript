import { RETRIEVE_COURSES_SUCCESS } from "../actions/courses";
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
	},
};

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

			action.courses.forEach( ( order ) => {
				courses[ order.id ] = order;
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
			return _union( state, action.courses.map( order => order.id ) );
		default:
			return state;
	}
}
