/**
 * Capitalizes the first word of a sentence or a single word.
 *
 * @param {text} text The sentence or single word that has to be capitalized.
 * @returns {string} The capitalized sentence or single word.
 */
export function capitalizer( text ) {
	return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
}

