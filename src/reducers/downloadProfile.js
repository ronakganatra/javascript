import {
	DOWNLOAD_PROFILE_REQUEST, DOWNLOAD_PROFILE_SUCCESS, DOWNLOAD_PROFILE_FAILURE,
} from "../actions/downloadProfile";


/**
 * Initial state
 */
const rootState = {
	ui: {
		downloadedProfile: {
			loading: false,
			data: {},
			error: "",
		},
	},
};

/**
 * Reducers
 */

/* eslint-disable complexity */
/**
 * A reducer for the orders object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Orders object.
 */
export function downloadProfileReducer( state = rootState.ui.downloadedProfile, action ) {
	switch ( action.type ) {
		case DOWNLOAD_PROFILE_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: "",
			} );
		case DOWNLOAD_PROFILE_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				data: action.data,
			} );
		case DOWNLOAD_PROFILE_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
			} );
		default:
			return state;
	}
}
/* eslint-enable complexity */
