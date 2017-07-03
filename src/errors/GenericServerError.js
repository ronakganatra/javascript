/**
 * Creates a generic server error that wraps the passed error for easier catching.
 */
class GenericServerError extends Error {

	/**
	 * Constructs the general error message.
	 *
	 * @returns {void}
	 */
	constructor() {
		let errorMessage = "Oops, something went wrong on our end, please try again. If this keeps happening, please contact support.";
		super( errorMessage );
	}
}

exports.GenericServerError = GenericServerError;
