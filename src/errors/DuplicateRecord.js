/**
 * Creates a custom error message when a duplicate record is being inserted into the database.
 */
class DuplicateRecord extends Error {

	/**
	 * Constructs the error message.
	 *
	 * @returns {void}
	 */
	constructor() {
		let errorMessage = "It looks like you have already added this site to your My Yoast account.";
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
