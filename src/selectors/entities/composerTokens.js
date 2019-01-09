/**
 * Returns the composer tokens state.
 *
 * @function
 *
 * @param {Object} state Application state.
 *
 * @returns {Array} All composer tokens.
 */
export function getComposerTokens( state ) {
	return Object.values( state.entities.composerTokens.byId );
}
