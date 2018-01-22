import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const FETCH_COMPOSER_TOKENS_REQUEST = "FETCH_COMPOSER_TOKENS_REQUEST";
export const FETCH_COMPOSER_TOKENS_FAILURE = "FETCH_COMPOSER_TOKENS_FAILURE";
export const FETCH_COMPOSER_TOKENS_SUCCESS = "FETCH_COMPOSER_TOKENS_SUCCESS";

export const CREATE_COMPOSER_TOKEN_REQUEST = "CREATE_COMPOSER_TOKEN_REQUEST";
export const CREATE_COMPOSER_TOKEN_FAILURE = "CREATE_COMPOSER_TOKEN_FAILURE";
export const CREATE_COMPOSER_TOKEN_SUCCESS = "CREATE_COMPOSER_TOKEN_SUCCESS";

export const RENAME_COMPOSER_TOKEN_REQUEST = "RENAME_COMPOSER_TOKEN_REQUEST";
export const RENAME_COMPOSER_TOKEN_FAILURE = "RENAME_COMPOSER_TOKEN_FAILURE";
export const RENAME_COMPOSER_TOKEN_SUCCESS = "RENAME_COMPOSER_TOKEN_SUCCESS";

export const DISABLE_COMPOSER_TOKEN_REQUEST = "DISABLE_COMPOSER_TOKEN_REQUEST";
export const DISABLE_COMPOSER_TOKEN_FAILURE = "DISABLE_COMPOSER_TOKEN_FAILURE";
export const DISABLE_COMPOSER_TOKEN_SUCCESS = "DISABLE_COMPOSER_TOKEN_SUCCESS";

export const CREATE_TOKEN_MODAL_OPEN = "CREATE_TOKEN_MODAL_OPEN";
export const CREATE_TOKEN_MODAL_CLOSED = "CREATE_TOKEN_MODAL_CLOSED";

/**
 * An action creator for the create token modal open action.
 *
 * @returns {Object} The create token modal open action.
 */
export function createTokenModalOpen() {
	return {
		type: CREATE_TOKEN_MODAL_OPEN,
	};
}

/**
 * An action creator for the create token modal open action.
 *
 * @returns {Object} The create token modal open action.
 */
export function createTokenModalClosed() {
	return {
		type: CREATE_TOKEN_MODAL_CLOSED,
	};
}

/**
 * An action creator for the fetch composer tokens request action.
 *
 * @returns {Object} The fetch composer tokens request action.
 */
export function fetchComposerTokensRequest() {
	return {
		type: FETCH_COMPOSER_TOKENS_REQUEST,
	};
}

/**
 * An action creator for the fetch composer tokens failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The fetch composer tokens failure action.
 */
export function fetchComposerTokensFailure( error ) {
	return {
		type: FETCH_COMPOSER_TOKENS_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the fetch composer tokens success action.
 *
 * @param {Array} composerTokens The composer tokens after a successful fetch composer tokens.
 * @returns {Object} The fetch composer tokens success action.
 */
export function fetchComposerTokensSuccess( composerTokens ) {
	return {
		type: FETCH_COMPOSER_TOKENS_SUCCESS,
		composerTokens: composerTokens,
	};
}

/**
 * An action creator to fetch the composer tokens of the user.
 *
 * @returns {Function} A function that fetches a user's composer tokens.
 */
export function fetchComposerTokens() {
	return ( dispatch ) => {
		dispatch( fetchComposerTokensRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/ComposerTokens/`, "GET" );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( fetchComposerTokensSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( fetchComposerTokensFailure( error ) ) );
	};
}

/**
 * An action creator for the create composer tokens request action.
 *
 * @returns {Object} The create composer tokens request action.
 */
export function createComposerTokenRequest() {
	return {
		type: CREATE_COMPOSER_TOKEN_REQUEST,
	};
}

/**
 * An action creator for the create composer tokens failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The create composer tokens failure action.
 */
export function createComposerTokenFailure( error ) {
	return {
		type: CREATE_COMPOSER_TOKEN_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the create composer tokens success action.
 *
 * @param {Array} composerToken The composer token created after a successful create composer tokens.
 * @returns {Object} The create composer tokens success action.
 */
export function createComposerTokenSuccess( composerToken ) {
	return {
		type: CREATE_COMPOSER_TOKEN_SUCCESS,
		composerToken: composerToken,
	};
}

/**
 * An action creator to create the composer tokens of the user.
 *
 * @param {Object} data Data to use to create the composer token.
 * @param {string} data.name The name of the composer token.
 *
 * @returns {Function} A function that creates a user's composer tokens.
 */
export function createComposerToken( data ) {
	return ( dispatch ) => {
		dispatch( createComposerTokenRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/ComposerTokens/`, "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( createComposerTokenSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( createComposerTokenFailure( error ) ) );
	};
}

/**
 * An action creator for the rename composer tokens request action.
 *
 * @returns {Object} The rename composer tokens request action.
 */
export function renameComposerTokenRequest() {
	return {
		type: RENAME_COMPOSER_TOKEN_REQUEST,
	};
}

/**
 * An action creator for the rename composer tokens failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The rename composer tokens failure action.
 */
export function renameComposerTokenFailure( error ) {
	return {
		type: RENAME_COMPOSER_TOKEN_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the rename composer tokens success action.
 *
 * @param {Array} composerToken The composer token renamed after a successful rename composer tokens.
 * @returns {Object} The rename composer tokens success action.
 */
export function renameComposerTokenSuccess( composerToken ) {
	return {
		type: RENAME_COMPOSER_TOKEN_SUCCESS,
		composerToken: composerToken,
	};
}

/**
 * An action creator to rename the composer tokens of the user.
 *
 * @param {string} id The id of the composer token to rename.
 * @param {Object} data Data to use to rename the composer token.
 * @param {string} data.name The name of the composer token.
 *
 * @returns {Function} A function that renames a user's composer tokens.
 */
export function renameComposerToken( id, data ) {
	return ( dispatch ) => {
		dispatch( renameComposerTokenRequest() );

		let request = prepareInternalRequest( `ComposerTokens/${id}/rename/`, "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( renameComposerTokenSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( renameComposerTokenFailure( error ) ) );
	};
}

/**
 * An action creator for the disable composer tokens request action.
 *
 * @returns {Object} The disable composer tokens request action.
 */
export function disableComposerTokenRequest() {
	return {
		type: DISABLE_COMPOSER_TOKEN_REQUEST,
	};
}

/**
 * An action creator for the disable composer tokens failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The disable composer tokens failure action.
 */
export function disableComposerTokenFailure( error ) {
	return {
		type: DISABLE_COMPOSER_TOKEN_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the disable composer tokens success action.
 *
 * @param {Array} composerToken The composer token disabled after a successful disable composer tokens.
 * @returns {Object} The disable composer tokens success action.
 */
export function disableComposerTokenSuccess( composerToken ) {
	return {
		type: DISABLE_COMPOSER_TOKEN_SUCCESS,
		composerToken: composerToken,
	};
}

/**
 * An action creator to disable the composer tokens of the user.
 *
 * @param {string} id The id of the composer token to disable.
 *
 * @returns {Function} A function that disables a user's composer tokens.
 */
export function disableComposerToken( id ) {
	return ( dispatch ) => {
		dispatch( disableComposerTokenRequest() );

		let request = prepareInternalRequest( `ComposerTokens/${id}/disable/`, "POST" );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( disableComposerTokenSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( disableComposerTokenFailure( error ) ) );
	};
}
