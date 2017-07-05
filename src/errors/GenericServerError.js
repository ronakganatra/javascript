/**
 * Creates a generic server error that wraps the passed error for easier catching.
 */
class GenericServerError extends Error {

	/**
	 * Constructs the error message.
	 * @param {string} message The message to display in the error.
	 * @returns {void}
	 */
	constructor( message ) {
		super( message );
	}
}

exports.GenericServerError = GenericServerError;
