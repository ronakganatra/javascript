import { createEntityStateSelector } from "./factories";

/**
 * Returns the full state of all sites.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The full state of all sites.
 */
export const getSites = createEntityStateSelector( "sites" );
