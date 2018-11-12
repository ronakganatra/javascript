import { getAllOfEntity } from "./entities";

/**
 * Returns all the sites in the state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All sites.
 */
export function getSites( state ) {
	return getAllOfEntity( state, "sites" );
}

/**
 * Returns sites for a given subscription.
 *
 * @param {Object} state Application state.
 * @param {string} subscriptionId ID for the subscription to find sites for.
 *
 * @returns {Array} Sites belonging to the subscription.
 */
export function getSitesForSubscription( state, subscriptionId ) {
	const sites = getSites( state );

	return sites.filter( site => site.subscriptions.includes( subscriptionId ) );
}
