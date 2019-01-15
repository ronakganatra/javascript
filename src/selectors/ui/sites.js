/**
 * Returns the ui sites state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The ui sites state.
 */
export function getSitesUi( state ) {
	return state.ui.sites;
}

/**
 * Returns the retrievingSites state.
 *
 * @param   {Object}  state The application state.
 * @returns {boolean}       The retrievingSites state (should be true when get sites request is not successful or failed yet).
 */
export const isRetrievingSites = ( state ) => {
	return state.ui.sites.retrievingSites;
};
