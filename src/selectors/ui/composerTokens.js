/**
 * Returns the create token modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The create token modal state.
 */
export function getCreateModalIsOpen( state ) {
	return state.ui.composerTokens.createTokenModalIsOpen;
}

/**
 * Returns the manage token modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The manage token modal state.
 */
export function getManageModalIsOpen( state ) {
	return state.ui.composerTokens.manageTokenModalIsOpen;
}

/**
 * Returns a selected composer token to manage.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The manage composer token state.
 */
export function getManageTokenData( state ) {
	return state.ui.composerTokens.manageTokenData;
}

/**
 * Returns token error if present.
 *
 * @param {Object} state Application state.
 *
 * @returns {String} The token error state.
 */
export function getTokenError( state ) {
	return state.ui.composerTokens.tokenError;
}

/**
 * Returns the manage token modal state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The manage token modal state.
 */
export function getTokenDeleted( state ) {
	return state.ui.composerTokens.tokenDeleted;
}


