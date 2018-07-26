import { doRequest, prepareInternalRequest } from "../functions/api";

/**
 * Action types
 */

export const SEND_RESET_PASSWORD_EMAIL_REQUEST = "SEND_RESET_PASSWORD_EMAIL_REQUEST";
export const SEND_RESET_PASSWORD_EMAIL_SUCCESS = "SEND_RESET_PASSWORD_EMAIL_SUCCESS";
export const SEND_RESET_PASSWORD_EMAIL_FAILURE = "SEND_RESET_PASSWORD_EMAIL_FAILURE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";


/**
 * Action creators
 */

/**
 * An action creator for the doing reset password email action.
 *
 * @returns {Object} A doing reset password email action.
 */
export function sendingResetPasswordEmailRequest() {
	return {
		type: SEND_RESET_PASSWORD_EMAIL_REQUEST,
	};
}

/**
 * An action creator for the doing reset password email  action.
 *
 * @returns {Object} A doing reset password email action.
 */
export function sendResetPasswordEmailSuccess() {
	return {
		type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
	};
}

/**
 * An action creator for the reset password failure email action.
 *
 * @param {Object} error The reset password email error.
 *
 * @returns {Object} An reset password failure email action.
 */
export function sendResetPasswordEmailFailure( error ) {
	return {
		type: SEND_RESET_PASSWORD_EMAIL_FAILURE,
		error: error,
	};
}


/**
 * An action creator for the doing reset password action.
 *
 * @returns {Object} A doing reset password action.
 */
export function resetPasswordRequest() {
	return {
		type: RESET_PASSWORD_REQUEST,
	};
}

/**
 * An action creator for the doing reset password action.
 *
 * @returns {Object} A doing reset password action.
 */
export function resetPasswordSuccess() {
	return {
		type: RESET_PASSWORD_SUCCESS,
	};
}

/**
 * An action creator for the reset password failure action.
 *
 * @param {Object} error The reset password error.
 *
 * @returns {Object} An reset password failure action.
 */
export function resetPasswordFailure( error ) {
	return {
		type: RESET_PASSWORD_FAILURE,
		error: error,
	};
}


/**
 * An action creator for the reset password request action.
 *
 * Attempts to reset a password by doing an API call to the MyYoast server, which forwards it to yoast.com's APIs.
 * When this succeeds, we attempt to redirect the user to the send reset password email success page.
 *
 * @param {Object} params The request parameters.
 * @param {string} params.email The email address of the user who is trying to log in.
 * @param {Object} ownProps The ownProps of resetPasswordEmail container.
 *
 * @returns {Function} A function which enables us to expose the dispatch function.
 */
export function sendResetPasswordEmailRequest( params, ownProps ) {
	return ( dispatch ) => {
		dispatch( sendingResetPasswordEmailRequest() );
		let request = prepareInternalRequest( "Customers/sendResetPasswordEmail/", "POST", params );
		doRequest( request )
			.then( () => {
				dispatch( sendResetPasswordEmailSuccess() );
			} )
			.catch( ( error ) => {
				dispatch( sendResetPasswordEmailFailure( error ) );
			} );
	};
}
