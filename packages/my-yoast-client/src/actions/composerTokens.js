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

export const DELETE_COMPOSER_TOKEN_REQUEST = "DELETE_COMPOSER_TOKEN_REQUEST";
export const DELETE_COMPOSER_TOKEN_FAILURE = "DELETE_COMPOSER_TOKEN_FAILURE";
export const DELETE_COMPOSER_TOKEN_SUCCESS = "DELETE_COMPOSER_TOKEN_SUCCESS";

export const CREATE_TOKEN_MODAL_OPEN = "CREATE_TOKEN_MODAL_OPEN";
export const CREATE_TOKEN_MODAL_CLOSED = "CREATE_TOKEN_MODAL_CLOSED";

export const MANAGE_TOKEN_MODAL_OPEN = "MANAGE_TOKEN_MODAL_OPEN";
export const MANAGE_TOKEN_MODAL_CLOSED = "MANAGE_TOKEN_MODAL_CLOSED";

export const COMPOSER_HELP_MODAL_OPEN = "COMPOSER_HELP_MODAL_OPEN";
export const COMPOSER_HELP_MODAL_CLOSED = "COMPOSER_HELP_MODAL_CLOSED";

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
 * An action creator for the manage token modal open action.
 *
 * @param {Object} data The data object of the token that should be managed in the modal.
 * @param {string} data.id The id of the composer token.
 * @param {string} data.name The name of the composer token.
 * @returns {Object} The manage token modal open action.
 */
export function manageTokenModalOpen( data ) {
	return {
		type: MANAGE_TOKEN_MODAL_OPEN,
		data: data,
	};
}

/**
 * An action creator for the manage token modal closed action.
 *
 * @returns {Object} The manage token modal closed action.
 */
export function manageTokenModalClosed() {
	return {
		type: MANAGE_TOKEN_MODAL_CLOSED,
	};
}

/**
 * An action creator for the composer help modal open action.
 *
 * @param {string} productName A string that contains the name of the product for which composer help is requested.
 * @param {string} glNumber Unique bookkeeping number of the product.
 * @param {object} [composerToken] A composer token to display for instructions if it exists.
 *
 * @returns {Object} The composer help modal open action.
 */
export function composerHelpModalOpen( productName, glNumber, composerToken ) {
	return {
		type: COMPOSER_HELP_MODAL_OPEN,
		productName,
		glNumber,
		composerToken,
	};
}

/**
 * An action creator for the composer help modal closed action.
 *
 * @returns {Object} The composer help modal closed action.
 */
export function composerHelpModalClosed() {
	return {
		type: COMPOSER_HELP_MODAL_CLOSED,
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
		error,
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
		composerTokens,
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

		const userId = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/ComposerTokens/`, "GET" );

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
		error,
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
		composerToken,
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

		const request = prepareInternalRequest( "/ComposerTokens/generate/", "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( createComposerTokenSuccess( response ) );
			} )
			.then( () => {
				dispatch( createTokenModalClosed() );
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
 * @param {Object} data Data to use to rename the composer token.
 * @param {string} data.id The id of the composer token to rename.
 * @param {string} data.name The name of the composer token.
 *
 * @returns {Function} A function that renames a user's composer tokens.
 */
export function renameComposerToken( data ) {
	return ( dispatch ) => {
		dispatch( renameComposerTokenRequest() );

		const request = prepareInternalRequest( `ComposerTokens/${data.id}/rename/`, "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( renameComposerTokenSuccess( response ) );
			} )
			.then( () => {
				dispatch( manageTokenModalClosed() );
				dispatch( fetchComposerTokens() );
			} )
			.catch( ( error ) => dispatch( renameComposerTokenFailure( error ) ) );
	};
}

/**
 * An action creator for the delete composer tokens request action.
 *
 * @returns {Object} The delete composer tokens request action.
 */
export function deleteComposerTokenRequest() {
	return {
		type: DELETE_COMPOSER_TOKEN_REQUEST,
	};
}

/**
 * An action creator for the delete composer tokens failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The delete composer tokens failure action.
 */
export function deleteComposerTokenFailure( error ) {
	return {
		type: DELETE_COMPOSER_TOKEN_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the delete composer tokens success action.
 *
 * @param {Array} composerToken The composer token deleted after a successful delete composer tokens.
 * @returns {Object} The delete composer tokens success action.
 */
export function deleteComposerTokenSuccess( composerToken ) {
	return {
		type: DELETE_COMPOSER_TOKEN_SUCCESS,
		composerToken: composerToken,
	};
}

/**
 * An action creator to delete the composer tokens of the user.
 *
 * @param {string} id The id of the composer token to delete.
 *
 * @returns {Function} A function that deletes a user's composer tokens.
 */
export function deleteComposerToken( id ) {
	return ( dispatch ) => {
		dispatch( deleteComposerTokenRequest() );

		const request = prepareInternalRequest( `ComposerTokens/${id}/delete/`, "POST" );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( deleteComposerTokenSuccess( response ) );
			} )
			.then( () => {
				dispatch( manageTokenModalClosed() );
				dispatch( fetchComposerTokens() );
			} )
			.catch( ( error ) => dispatch( deleteComposerTokenFailure( error ) ) );
	};
}
