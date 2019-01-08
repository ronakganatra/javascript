/* Internal dependencies */
import { createEntityByIdSelector } from "./factories";

/**
 * Returns a map of all refunds in the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} A map of all refunds.
 */
export const getRefundsById = createEntityByIdSelector( "refunds" );
