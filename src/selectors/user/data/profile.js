import { createSelector } from "reselect";
import { url } from "gravatar";

const avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

/**
 * Returns the user's email state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user's email.
 */
export function getEmail( state ) {
	return state.user.data.profile.email;
}

/**
 * Returns the user's first name state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user's first name.
 */
export function getUserFirstName( state ) {
	return state.user.data.profile.userFirstName;
}

/**
 * Returns the user's last name state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user's last name.
 */
export function getUserLastName( state ) {
	return state.user.data.profile.userLastName;
}

/**
 * Returns the user's Avatar URL state.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The user's Avatar URL.
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
	[ getUserAvatarUrl, getEmail ],
	( userAvatar, email ) => userAvatar || url( email, {
		s: "150",
		r: "pg",
		d: avatarPlaceholder,
		protocol: "https",
	} )
);
