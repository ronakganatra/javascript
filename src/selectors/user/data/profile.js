import { createSelector } from "reselect";
import { url } from "gravatar";

const avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

/**
 * Returns the user's email state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user email state.
 */
export function getUserEmail( state ) {
	return state.user.data.profile.email;
}

/**
 * Returns the user's first name state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user first name state.
 */
export function getUserFirstName( state ) {
	return state.user.data.profile.userFirstName;
}

/**
 * Returns the user's last name state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user last name state.
 */
export function getUserLastName( state ) {
	return state.user.data.profile.userLastName;
}

/**
 * Returns the user's Avatar URL state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user Avatar URL state.
 */
export function getUserAvatarUrl( state ) {
	return state.user.data.profile.userAvatarUrl;
}

/**
 * Returns the user's avatar.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user's avatar.
 */
export const getUserAvatar = createSelector(
	[ getUserAvatarUrl, getUserEmail ],
	( userAvatar, email ) => userAvatar || url( email, {
		s: "150",
		r: "pg",
		d: avatarPlaceholder,
		protocol: "https",
	} )
);

/**
 * Get the user profile from state.
 *
 * @function
 *
 * @param {Object} state Application state.
 * @returns {Object} The complete user profile.
 */
export const getProfile = state => state.user.data.profile;
