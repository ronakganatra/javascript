import {
	SITE_TOGGLE_SUBSCRIPTION_REQUEST,
	SITE_ADD_SUBSCRIPTION_SUCCESS,
	SITE_REMOVE_SUBSCRIPTION_SUCCESS,
	SITE_TOGGLE_SUBSCRIPTION_FAILURE,
	SITE_REMOVE_START, SITE_REMOVE_SUCCESS,
	SITE_REMOVE_FAILURE,
	DOWNLOAD_MODAL_OPEN,
	DOWNLOAD_MODAL_CLOSE,
} from "../actions/site";
import reduceReducers from "reduce-reducers";

/**
 * Initial state
 */

const rootState = {
	ui: {
		site: {
			removing: false,
			subscriptions: {
				error: "",
				toggling: false,
			},
			downloadModalOpen: false,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the modal actions within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated sites object.
 */
function uiModalReducer( state = rootState.ui.sites, action ) {
	switch ( action.type ) {
		case DOWNLOAD_MODAL_OPEN:
			return Object.assign( {}, state, {
				downloadModalOpen: true,
			} );
		case DOWNLOAD_MODAL_CLOSE:
			return Object.assign( {}, state, {
				downloadModalOpen: false,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the site add subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated state.
 */
export function uiSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case SITE_TOGGLE_SUBSCRIPTION_REQUEST:
			return Object.assign( {}, state, {
				toggling: true,
				error: "",
			} );
		case SITE_ADD_SUBSCRIPTION_SUCCESS:
		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			return Object.assign( {}, state, {
				toggling: false,
			} );
		case SITE_TOGGLE_SUBSCRIPTION_FAILURE:
			return Object.assign( {}, state, {
				toggling: false,
				error: action.addingSubscriptionError,
			} );
		default:
			return state;
	}
}

export function uiSiteRemoveReducer( state = rootState.ui.site, action ) {
	const site = Object.assign( {}, state );
	switch ( action.type ) {
		case SITE_REMOVE_START:
			site.removing = true;
			break;
		case SITE_REMOVE_SUCCESS:
			site.removing = false;
			break;
		case SITE_REMOVE_FAILURE:
			site.removing = false;
			break;
	}
	site.subscriptions = uiSiteSubscriptionsReducer( state.subscriptions, action );
	return site;
}

const uiSite = reduceReducers( uiSiteRemoveReducer, uiModalReducer );

/**
 * A reducer for the site object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Site object.
 */
export function uiSiteReducer( state = rootState.ui.site, action ) {
	return uiSite( state, action );
}
