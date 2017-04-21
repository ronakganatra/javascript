/**
 * Initial state
 */
import { LINK_SITE_POPUP_OPEN, LINK_SITE_POPUP_CLOSE, UPDATE_SITE_URL, LINK_SITE_SUCCESS, LINK_SITE_FAILURE,
	RETRIEVE_SITES_REQUEST, RETRIEVE_SITES_FAILURE, RETRIEVE_SITES_SUCCESS, LINK_SITE_REQUEST } from "../actions/sites";
import { SITE_ADD_SUBSCRIPTION_SUCCESS, SITE_REMOVE_SUBSCRIPTION_SUCCESS } from "../actions/site";

import _union from "lodash/union";
import _isUndefined from "lodash/isUndefined";
import _remove from "lodash/remove";
import reducerReducers from "reduce-reducers";

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

			// Whether or not we are currently doing a request to the server to retrieve the sites.
			retrievingSites: false,

			// Whether or not the retrieving of the site has failed.
			retrievingSitesFailed: false,

			// The error message we retrieved from the server about why the retrieving of the sites failed.
			retrievingSitesError: "",

			// Whether or not the connected sites have been retrieved from the server.
			sitesRetrieved: false,
		},
	},
};

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
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
export function linkReducer( state = rootState.ui.sites, action ) {
	switch ( action.type ) {
		case UPDATE_SITE_URL:
			return Object.assign( {}, state, {
				linkingSite: true,
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
function retrieveSitesReducer( state = rootState.ui.sites, action ) {
	switch ( action.type ) {
		case RETRIEVE_SITES_REQUEST:
			return Object.assign( {}, state, {
				retrievingSites: true,
			} );
		case RETRIEVE_SITES_SUCCESS:
			return Object.assign( {}, state, {
				retrievingSites: false,
				retrievingSitesFailed: false,
				sitesRetrieved: true,
			} );
		case RETRIEVE_SITES_FAILURE:
			return Object.assign( {}, state, {
				retrievingSites: false,
				retrievingSitesFailed: true,
				retrievingSitesError: action.retrieveSitesError,
			} );
		default:
			return state;
	}
}

let uiSites = reducerReducers( linkReducer, retrieveSitesReducer, popupReducer );

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
export function uiSitesReducer( state = rootState.ui.sites, action ) {
	return uiSites( state, action );
}

/**
 * Returns a new site object with only subscription ids.
 *
 * @param {Object} site The site to pluck.
 * @returns {Object} New sites object with only subscription ids.
 */
function pluckSubscriptionIds( site ) {
	if ( _isUndefined( site.subscriptions ) ) {
		return site;
	}

	return Object.assign( {}, site, { subscriptions: site.subscriptions.map( subscription => subscription.id ) } );
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
	let sites = Object.assign( {}, state );

	switch ( action.type ) {
		case LINK_SITE_SUCCESS:
			sites[ action.site.id ] = pluckSubscriptionIds( action.site );
			break;

		case RETRIEVE_SITES_SUCCESS:
			action.sites.forEach( ( site ) => {
				sites[ site.id ] = pluckSubscriptionIds( site );
			} );
			break;

		case SITE_ADD_SUBSCRIPTION_SUCCESS:
			sites[ action.siteId ].subscriptions.push( action.subscriptionId );
			break;

		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			_remove( sites[ action.siteId ].subscriptions, subscriptionId => subscriptionId === action.subscriptionId );
			break;
	}
	return sites;
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
	let sites;
	switch ( action.type ) {
		case LINK_SITE_SUCCESS:
			return [ ...state, action.site.id ];
		case RETRIEVE_SITES_SUCCESS:
			sites = _union( state, action.sites.map( site => site.id ) );
			return sites;
		default:
			return state;
	}
}
