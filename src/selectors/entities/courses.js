/* Internal dependencies */
import {
	createAllOfEntitySelector,
	createEntityByIdSelector,
	createEntityStateSelector,
} from "./factories";

/**
 * Returns the full state of all courses.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} The full state of all courses.
 */
export const getCoursesState = createEntityStateSelector( "courses" );

/**
 * Returns all courses in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All courses.
 */
export const getCourses = createAllOfEntitySelector( "courses" );

/**
 * Returns a map of all courses in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} A map of all courses.
 */
export const getCoursesById = createEntityByIdSelector( "courses" );
