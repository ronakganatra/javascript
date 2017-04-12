import { LINK_SITE_POPUP_OPEN, LINK_SITE_POPUP_CLOSE, UPDATE_SITE_URL, LINK_SITE_SUCCESS, LINK_SITE_FAILURE, LINK_SITE_REQUEST } from "../actions/sites";

/**
 * Initial state
 */

const rootState = {
	entities: {
		sites: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		sites: {
			// Whether or not we are currently adding a new site.
			addSitePopupOpen: false,

			// Whether or not we are currently doing a request to the server to add/link a new site.
			linkingSite: false,

			// The URL that is currently trying to be linked.
			linkingSiteUrl: "",

			// Whether or not linking of a site has failed.
			linkSiteFailed: false,

			// The error message we retrieved from the server about why the linking of the server failed.
			linkSiteError: "",
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the pop-up actions within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated sites object.
 */
function popupReducer( state, action ) {
	switch ( action.type ) {
		case LINK_SITE_POPUP_OPEN:
			return Object.assign( {}, state, {
				addSitePopupOpen: true,
			} );
		case LINK_SITE_POPUP_CLOSE:
			return Object.assign( {}, state, {
				addSitePopupOpen: false,
				linkSiteFailed: false,
				linkSiteError: "",
				linkingSiteUrl: "",
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the link site actions within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated sites object.
 */
function linkReducer( state, action ) {
	switch ( action.type ) {
		case UPDATE_SITE_URL:
			return Object.assign( {}, state, {
				linkingSiteUrl: action.url,
			} );
		case LINK_SITE_REQUEST:
			return Object.assign( {}, state, {
				linkingSite: true,
			} );
		case LINK_SITE_SUCCESS:
			return Object.assign( {}, state, {
				linkSiteFailed: false,
				addSitePopupOpen: false,
				linkingSiteUrl: "",
				linkingSite: false,
			} );
		case LINK_SITE_FAILURE:
			return Object.assign( {}, state, {
				linkSiteFailed: true,
				linkSiteError: action.linkSiteError,
				linkingSiteUrl: "",
				linkingSite: false,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
export function uiSitesReducer( state = rootState.ui.sites, action ) {
	return linkReducer( popupReducer( state, action ), action );
}

/**
 * A reducer for the byId object.
 *
 * @param {Object} state The current state of the byId object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated byId object.
 */
export function byIdReducer( state = rootState.entities.sites.byId, action ) {
	switch ( action.type ) {
		case LINK_SITE_SUCCESS:
			return Object.assign( {}, state, {
				[ action.site.id ]: action.site,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the allIds array.
 *
 * @param {Array} state The current state of the allIds array.
 * @param {Object} action The current action received.
 *
 * @returns {Array} The updated allIds array.
 */
export function allIdsReducer( state = rootState.entities.sites.allIds, action ) {
	switch ( action.type ) {
		case LINK_SITE_SUCCESS:
			return [ ...state, action.site.id ];
		default:
			return state;
	}
}
