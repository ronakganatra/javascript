import { createSelector } from "reselect";

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

/**
 * Returns the first enabled composer token.
 *
 * @param {Object} state Application state.
 *
 * @returns {string|undefined} The first enabled composer token or undefined if not available.
 */
export const getFirstEnabledComposerToken = createSelector(
	[ getComposerTokens ],
	composerTokens => {
		const token = composerTokens.find( composerToken => composerToken.enabled );
		return token ? token : null;
	}
);
