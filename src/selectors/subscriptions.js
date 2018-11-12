import { getAllOfEntity, getEntityById } from "./entities";

/**
 * Returns all subscriptions in the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All subscriptions.
 */
export function getSubscriptions( state ) {
	return getAllOfEntity( state, "subscriptions" );
}

/**
 * Returns a subscription with a given ID.
 *
 * @param {Object} state Application state.
 * @param {string} id ID of the subscription to retrieve.
 *
 * @returns {Object} The subscription object.
 */
export function getSubscription( state, id ) {
	return getEntityById( state, "subscriptions", id );
}
