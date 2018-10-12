/**
 * A reducer for fetching a user's composer tokens.
 *
 * @param {Object} state The previous state of the store.
 * @param {Object} action The action that just occurred.
 * @returns {Object} The new state of the store.
 */
import {
	CREATE_COMPOSER_TOKEN_FAILURE,
	CREATE_COMPOSER_TOKEN_REQUEST,
	CREATE_COMPOSER_TOKEN_SUCCESS,
	FETCH_COMPOSER_TOKENS_FAILURE,
	FETCH_COMPOSER_TOKENS_REQUEST,
	FETCH_COMPOSER_TOKENS_SUCCESS,
	RENAME_COMPOSER_TOKEN_FAILURE,
	RENAME_COMPOSER_TOKEN_REQUEST,
	RENAME_COMPOSER_TOKEN_SUCCESS,
	DELETE_COMPOSER_TOKEN_FAILURE,
	DELETE_COMPOSER_TOKEN_REQUEST,
	DELETE_COMPOSER_TOKEN_SUCCESS,
	CREATE_TOKEN_MODAL_OPEN,
	CREATE_TOKEN_MODAL_CLOSED,
	MANAGE_TOKEN_MODAL_CLOSED,
	MANAGE_TOKEN_MODAL_OPEN,
	COMPOSER_HELP_MODAL_OPEN,
	COMPOSER_HELP_MODAL_CLOSED,
} from "../actions/composerTokens";
import _union from "lodash/union";
import reduceReducers from "reduce-reducers";

/**
 * Initial state
 */
const rootState = {
	entities: {
		composerTokens: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		composerTokens: {
			retrievingComposerTokens: false,
			creatingComposerToken: false,
			renamingComposerToken: false,
			disablingComposerToken: false,
			composerHelpModalIsOpen: false,
			composerHelpProductName: "",
			composerHelpProductGlNumber: "0",
			composerHelpComposerToken: null,
			createTokenModalIsOpen: false,
			manageTokenModalIsOpen: false,
			manageTokenData: null,
			tokenError: null,
			tokenDeleted: false,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the composerTokens object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ComposerTokens object.
 */
export function uiFetchComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	switch ( action.type ) {
		case FETCH_COMPOSER_TOKENS_REQUEST:
			return Object.assign( {}, state, {
				retrievingComposerTokens: true,
				tokenError: null,
			} );
		case FETCH_COMPOSER_TOKENS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingComposerTokens: false,
				tokenError: null,
			} );
		case FETCH_COMPOSER_TOKENS_FAILURE:
			return Object.assign( {}, state, {
				retrievingComposerTokens: false,
				tokenError: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the composerTokens object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ComposerTokens object.
 */
export function uiCreateComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	switch ( action.type ) {
		case CREATE_COMPOSER_TOKEN_REQUEST:
			return Object.assign( {}, state, {
				creatingComposerToken: true,
				tokenError: null,
			} );
		case CREATE_COMPOSER_TOKEN_SUCCESS:
			return Object.assign( {}, state, {
				creatingComposerToken: false,
			} );
		case CREATE_COMPOSER_TOKEN_FAILURE:
			return Object.assign( {}, state, {
				creatingComposerToken: false,
				tokenError: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the composerTokens object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ComposerTokens object.
 */
export function uiRenameComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	switch ( action.type ) {
		case RENAME_COMPOSER_TOKEN_REQUEST:
			return Object.assign( {}, state, {
				renamingComposerToken: true,
				tokenError: null,
			} );
		case RENAME_COMPOSER_TOKEN_SUCCESS:
			return Object.assign( {}, state, {
				renamingComposerToken: false,
			} );
		case RENAME_COMPOSER_TOKEN_FAILURE:
			return Object.assign( {}, state, {
				renamingComposerToken: false,
				tokenError: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the composerTokens object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ComposerTokens object.
 */
export function uiDeleteComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	switch ( action.type ) {
		case DELETE_COMPOSER_TOKEN_REQUEST:
			return Object.assign( {}, state, {
				disablingComposerToken: true,
				tokenError: null,
				tokenDeleted: false,
			} );
		case DELETE_COMPOSER_TOKEN_SUCCESS:
			return Object.assign( {}, state, {
				disablingComposerToken: false,
				tokenDeleted: true,
			} );
		case DELETE_COMPOSER_TOKEN_FAILURE:
			return Object.assign( {}, state, {
				disablingComposerToken: false,
				tokenError: action.error,
				tokenDeleted: false,
			} );
		default:
			return state;
	}
}

/* eslint-disable complexity */
/**
 * A reducer for the composerTokens object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ComposerTokens object.
 */
export function uiModalsComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	switch ( action.type ) {
		case CREATE_TOKEN_MODAL_OPEN:
			return Object.assign( {}, state, {
				createTokenModalIsOpen: true,
				tokenDeleted: false,
			} );
		case CREATE_TOKEN_MODAL_CLOSED:
			return Object.assign( {}, state, {
				createTokenModalIsOpen: false,
				tokenError: null,
			} );
		case MANAGE_TOKEN_MODAL_OPEN:
			return Object.assign( {}, state, {
				manageTokenModalIsOpen: true,
				manageTokenData: action.data,
				tokenDeleted: false,
			} );
		case MANAGE_TOKEN_MODAL_CLOSED:
			return Object.assign( {}, state, {
				manageTokenModalIsOpen: false,
				manageTokenData: null,
				tokenError: null,
			} );
		case COMPOSER_HELP_MODAL_OPEN:
			return Object.assign( {}, state, {
				composerHelpModalIsOpen: true,
				composerHelpProductName: action.productName,
				composerHelpProductGlNumber: action.glNumber,
				composerHelpComposerToken: action.composerToken,
			} );
		case COMPOSER_HELP_MODAL_CLOSED:
			return Object.assign( {}, state, {
				composerHelpModalIsOpen: false,
				composerHelpProductName: "",
				composerHelpProductGlNumber: "0",
				composerHelpComposerToken: null,
				tokenError: null,
			} );
		case CREATE_COMPOSER_TOKEN_SUCCESS:
			if ( state.composerHelpModalIsOpen ) {
				return Object.assign( {}, state, {
					composerHelpComposerToken: action.composerToken,
				} );
			}
			return state;
		default:
			return state;
	}
}

const uiComposerTokensState = reduceReducers(
	uiFetchComposerTokensReducer,
	uiCreateComposerTokensReducer,
	uiRenameComposerTokensReducer,
	uiDeleteComposerTokensReducer,
	uiModalsComposerTokensReducer
);
/* eslint-enable complexity */

/**
 * A combineReducer for the user object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated email string.
 */
export function uiComposerTokensReducer( state = rootState.ui.composerTokens, action ) {
	return uiComposerTokensState( state, action );
}

/**
 * A reducer for the byIdComposerTokensReducer list.
 *
 * @param {Object} state The current state of the byIdComposerTokensReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdComposerTokensReducer object.
 */
export function byIdComposerTokensReducer( state = rootState.entities.composerTokens.byId, action ) {
	let composerTokens;

	switch ( action.type ) {
		case FETCH_COMPOSER_TOKENS_SUCCESS:
			composerTokens = Object.assign( {}, state );

			action.composerTokens.forEach( ( order ) => {
				composerTokens[ order.id ] = order;
			} );

			return composerTokens;
		case CREATE_COMPOSER_TOKEN_SUCCESS:
		case RENAME_COMPOSER_TOKEN_SUCCESS:
		case DELETE_COMPOSER_TOKEN_SUCCESS:
			composerTokens = Object.assign( {}, state );

			composerTokens[ action.composerToken.id ] = action.composerToken;

			return composerTokens;
		default:
			return state;
	}
}

/**
 * A reducer for the allIdsComposerTokensReducer list.
 *
 * @param {Array} state The current state of the allIdsComposerTokensReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsComposerTokensReducer array.
 */
export function allIdsComposerTokensReducer( state = rootState.entities.composerTokens.allIds, action ) {
	switch ( action.type ) {
		case FETCH_COMPOSER_TOKENS_SUCCESS:
			return _union( state, action.composerTokens.map( order => order.id ) );
		case CREATE_COMPOSER_TOKEN_SUCCESS:
		case RENAME_COMPOSER_TOKEN_SUCCESS:
		case DELETE_COMPOSER_TOKEN_SUCCESS:
			return _union( state, [ action.composerToken.id ] );
		default:
			return state;
	}
}
