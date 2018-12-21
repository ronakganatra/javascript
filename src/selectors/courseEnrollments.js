import { getAllOfEntity } from "./entities";
import { getSubscription } from "./subscriptions";
import _includes from "lodash/includes";

/**
 * Returns all courseEnrollments in the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All courseEnrollments.
 */
export function getAllEnrollments( state ) {
	return getAllOfEntity( state, "coursesEnrollments" );
}

/**
 * Get all the courses associated to a subscription.
 *
 * @param {Object} state 			Application state.
 * @param {string} subscriptionId 	The subscription id.
 *
 * @returns {Array} 				An array of courseEnrollments.
 */
export function getCoursesFromSubscription( state, subscriptionId ) {
	const subscription = getSubscription( state, subscriptionId );
	return getAllEnrollments( state ).filter(
		enrollment =>
			_includes( subscription.orders, enrollment.orderId ) &&
			enrollment.studentId );
}

