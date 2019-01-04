/* External dependencies */
import { createSelector } from "reselect";

/* Internal dependencies */
import { createAllOfEntitySelector } from "./factories";

/**
 * Returns all configuration service requests in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All configuration service requests.
 */
export const getConfigurationServiceRequests = createAllOfEntitySelector( "configurationServiceRequests" );

export const getAvailableConfigurationServiceRequests = createSelector(
	getConfigurationServiceRequests,
	configurationServiceRequests => configurationServiceRequests.filter( ( request ) => request.status === "intake" )
);
