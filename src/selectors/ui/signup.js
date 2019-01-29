/**
 * Get the signup error from the state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Object} The signup error.
 */
export const getSignupError = state => state.ui.signup.error;

/**
 * Get the whether the signup request was a success.
 * @param {Object} state Application state.
 *
 * @returns {boolean} Whether the request was succesful.
 */
export const getSignupRequestSuccess = state => state.ui.signup.signupRequestSuccess;
