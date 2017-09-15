/**
 * Pads a string or number with zeroes, for use with currencies.
 *
 * @param {string|number} value
 *
 * @returns {string}
 */
export function zeroPad( value ) {
	return value.toString().padStart( 2, '0' );
}

/**
 * Capitalizes a string.
 *
 * @param {string} string The string to capitalize.
 *
 * @returns {string} The capitalized string.
 */
export function capitalize (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
