import { CONFIGURATION_REQUEST_MODAL_CLOSE, CONFIGURATION_REQUEST_MODAL_OPEN } from "../actions/configurationRequest";

/**
 * Initial state
 */
const rootState = {
	entities: {
		configurations: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		configurations: {
			configRequestModalOpen: false,
			configRequestModalSiteId: "",
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
export function uiConfigurationRequestReducer( state = rootState.ui.configurations, action ) {
	switch ( action.type ) {
		case CONFIGURATION_REQUEST_MODAL_OPEN:
			return Object.assign( {}, state, {
				configRequestModalOpen: true,
			} );
		case CONFIGURATION_REQUEST_MODAL_CLOSE:
			return Object.assign( {}, state, {
				configRequestModalOpen: false,
			} );
		default:
			return state;
	}
}
