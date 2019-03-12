/**
 * Returns whether the user is subscribed to the newsletter.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The newsletter subscribed state.
 */
export function isNewsletterSubscribed( state ) {
	return state.ui.newsletter.subscribed;
}

/**
 * Returns an newsletter error if present.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The newsletter error state.
 */
export function getNewsletterError( state ) {
	return state.ui.newsletter.error;
}

/**
 * Returns whether the newsletter is loading.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The newsletter loading state.
 */
export function isNewsletterLoading( state ) {
	return state.ui.newsletter.loading;
}
