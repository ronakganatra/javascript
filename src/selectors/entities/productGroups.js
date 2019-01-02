import { createAllOfEntitySelector } from "./factories";

/**
 * Returns all productGroups in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All productGroups.
 */
export const getProductGroups = createAllOfEntitySelector( "productGroups" );
