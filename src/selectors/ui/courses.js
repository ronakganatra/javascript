/**
 * Returns the course invite modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The course invite modal state.
 */
export function getCourseInviteModal( state ) {
	return state.ui.courseInviteModal;
}

/**
 * Returns the course invite request state.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The course invite request state.
 */
export function getCourseInviteRequest( state ) {
	return state.ui.courseInviteRequest;
}
