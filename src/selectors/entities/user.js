/**
 * Returns the user profile from the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The user profile.
 */
export const getUserProfile = state => Object.assign( { userId: state.user.userId }, state.user.data.profile );
