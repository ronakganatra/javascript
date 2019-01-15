import { createAllOfEntitySelector, createEntityByIdSelector, createEntityStateSelector } from "./factories";


/**
 * Returns the full state of all sites.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The full state of all sites.
 */
export const getSites = createEntityStateSelector( "sites" );

/**
 * Returns all sites in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All sites.
 */
export const getAllSites = createAllOfEntitySelector( "sites" );

/**
 * Returns byId part of sites entities in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} byId part sites entities.
 */
export const getByIdSites = createEntityByIdSelector( "sites" );
