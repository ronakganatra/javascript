/**
 * Get the login from state.
 *
 * @function
 *
 * @param {Object} state Application state.
 * @returns {Object} The current login status.
 */
export const getLogin = ( state ) => state.ui.login;