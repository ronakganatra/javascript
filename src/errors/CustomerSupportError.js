/**
 * Creates a custom error message when a duplicate record is being inserted into the database.
 */
class CustomerSupportError extends Error {

	/**
	 * Constructs the error message.
	 *
	 * @returns {void}
	 */
	constructor() {
		// %s should be replaced with a link to the support e-mail.
		let errorMessage = "Oops, something went wrong on our end, please try again. If this keeps happening, [customer_support_link]";
		super( errorMessage );

		this.name = this.constructor.name;

		let stackTraceType = typeof Error.captureStackTrace;

		if ( stackTraceType === "function" ) {
			Error.captureStackTrace( this, this.constructor );
		}

		if ( stackTraceType !== "function" ) {
			this.stack = ( new Error( this.message ) ).stack;
		}
	}
}

exports.CustomerSupportError = CustomerSupportError;
