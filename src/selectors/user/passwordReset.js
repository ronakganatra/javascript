/**
 * Returns if the user is in the process of sending a password reset.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} Whether the user is in the process of sending a password reset.
 */
export function getIsSending( state ) {
	return state.user.sendingPasswordReset;
}

/**
 * Returns if the password reset request has been sent.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} Whether the password reset request has been sent.
 */
export function getIsSent( state ) {
	return state.user.sendPasswordReset;
}

/**
 * Returns the error of the password reset process.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The error.
 */
export function getError( state ) {
	return state.user.passwordResetError;
}
