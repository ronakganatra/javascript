import { HELP_BEACON_POPUP_OPEN, HELP_BEACON_POPUP_CLOSE } from "../actions/helpBeacon";

/*
 * Initial state
 */

const rootState = {
	entities: {
		subscriptions: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		subscriptions: {
			requesting: false,
			error: "",
		},
		addSubscriptionModal: {
			id: null,
			popupOpen: false,
		},
		helpBeaconModal: {
			popUpOpen: false,
		},
	},
};

/*
 * Reducers
 */

/**
 * A reducer for the ui helpBeaconModal object.
 *
 * @param {Object} state The current state of the ui helpBeaconModal object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui helpBeaconModal object.
 */
export function uiHelpBeaconModalReducer( state = rootState.ui.helpBeaconModal, action ) {
	switch ( action.type ) {
		case HELP_BEACON_POPUP_OPEN:
			return Object.assign( {}, state, {
				popupOpen: true,
			} );
		case HELP_BEACON_POPUP_CLOSE:
			return Object.assign( {}, state, {
				popupOpen: false,
			} );
		default:
			return state;
	}
}
