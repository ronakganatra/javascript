/**
 * Returns whether the user is subscribed to the newsletter.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} Whether the user is subscribed.
 */
export function getSubscribed( state ) {
	return state.ui.newsletter.subscribed;
}

/**
 * Returns an error if present.
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
 * @returns {boolean} Whether the newsletter is loading.
 */
export function getNewsletterIsLoading( state ) {
	return state.ui.newsletter.loading;
}
