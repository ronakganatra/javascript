/**
 * Action types
 */

export const PROFILE_UPDATE_EMAIL = "PROFILE_UPDATE_EMAIL";

/**
 * Action creators
 */

/**
 * An action creator for the site add subscription success action.
 *
 * @param {string} email The changing email address of the customer.
 * @returns {Object} An add email action.
 */
export function profileUpdateEmail( email ) {
	return {
		type: PROFILE_UPDATE_EMAIL,
		email: email,
	};
}
