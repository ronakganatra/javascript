/**
 * Returns the create token modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The create composer token modal state.
 */
export function getCreateModalIsOpen( state ) {
	return state.ui.composerTokens.createTokenModalIsOpen;
}

/**
 * Returns the manage token modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The manage composer token modal state.
 */
export function getManageModalIsOpen( state ) {
	return state.ui.composerTokens.manageTokenModalIsOpen;
}

/**
 * Returns the selected composer token state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The selected composer token state.
 */
export function getManageTokenData( state ) {
	return state.ui.composerTokens.manageTokenData;
}

/**
 * Returns the token error state if present.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The composer token error state.
 */
export function getTokenError( state ) {
	return state.ui.composerTokens.tokenError;
}

/**
 * Returns the token deleted state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The composer token deleted state.
 */
export function getTokenDeleted( state ) {
	return state.ui.composerTokens.tokenDeleted;
}


