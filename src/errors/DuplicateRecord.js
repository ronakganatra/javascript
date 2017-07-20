/**
 * Creates a custom error message when a duplicate record is being inserted into the database.
 */
class DuplicateRecord extends Error {

	/**
	 * Constructs the error message.
	 *
	 * @param {string} context The context in which the error was thrown.
	 * @returns {void}
	 */
	constructor( context ) {
		let errorMessage = "It looks like you have already added this [PLACEHOLDER] to your My Yoast account.".replace( "[PLACEHOLDER]", context.toLocaleLowerCase() );
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

exports.DuplicateRecord = DuplicateRecord;
