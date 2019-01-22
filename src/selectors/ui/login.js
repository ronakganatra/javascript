/**
 * Get the login from state.
 *
 * @function
 *
 * @param {Object} state Application state.
 * @returns {Object} The current login status.
 */
export const getLogin = ( state ) => state.ui.login;

/**
 * Get the reset password from the state.
 *
 * @function
 *
 * @param {Object } state Application state.
 * @returns {Object} The reset password object.
 */
export const getResetPassword = state => state.ui.resetPassword;