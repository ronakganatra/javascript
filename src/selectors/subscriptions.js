import { getAllOfEntity } from "./entities";

/**
 * Returns all subscriptions in the state.
 *
 * @param {Object} state Application state.
 * @returns {Array} All subscriptions.
 */
export function getSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" );
}
