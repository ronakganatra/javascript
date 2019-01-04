import { createAllOfEntitySelector } from "./factories";

/**
 * Returns all products in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All products.
 */
export const getProducts = createAllOfEntitySelector( "products" );
