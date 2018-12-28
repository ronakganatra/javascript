/**
 * Returns if the user is in the process of saving the profile page.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The user saving profile state.
 */
export function getIsSaving( state ) {
	return state.user.savingProfile;
}

/**
 * Returns if the profile page has been saved.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The user profile saved state.
 */
export function getIsSaved( state ) {
	return state.user.profileSaved;
}

/**
 * Returns if the user is in the process of deleting the profile page.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The user deleting profile state.
 */
export function getIsDeleting( state ) {
	return state.user.deletingProfile;
}

/**
 * Returns the error (if present) for the email saving process.
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The use save mail error state.
 */
export function getSaveEmailError( state ) {
	return state.user.saveEmailError;
}
