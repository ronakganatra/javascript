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

export const getActivate = ( state ) => state.ui.activate;
