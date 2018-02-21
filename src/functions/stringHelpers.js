/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string The string to have its first letter capitalized.
 * @returns {string} The string with the first letter capitalized.
 */
export function capitalizeFirstLetter( string ) {
	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}
