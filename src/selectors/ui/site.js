/**
 * Returns the ui site state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The ui site state.
 */
export function getSite( state ) {
	return state.ui.site;
}

/**
 * Returns the ui activate from state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Boolean} Whether there is an activate.
 */
export const getActivate = ( state ) => state.ui.activate;
