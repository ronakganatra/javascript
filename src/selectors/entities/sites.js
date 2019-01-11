import { createEntityByIdSelector, createEntityStateSelector } from "./factories";

/**
 * Returns the full state of all sites.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The full state of all sites.
 */
export const getSites = createEntityStateSelector( "sites" );

/**
 * Returns a map of all sites in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} A map of all sites.
 */
export const getSitesById = createEntityByIdSelector( "sites" );
