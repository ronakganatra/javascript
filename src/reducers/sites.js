/**
 * Initial state
 */
import {
	LINK_SITE_MODAL_OPEN,
	LINK_SITE_MODAL_CLOSE,
	UPDATE_SITE_URL,
	LINK_SITE_SUCCESS,
	LINK_SITE_FAILURE,
	RETRIEVE_SITES_REQUEST,
	RETRIEVE_SITES_FAILURE,
	RETRIEVE_SITES_SUCCESS,
	LINK_SITE_REQUEST,
} from "../actions/sites";
import {
	SITE_ADD_SUBSCRIPTION_SUCCESS,
	SITE_REMOVE_SUBSCRIPTION_SUCCESS,
	SITE_REMOVE_SUCCESS,
	SITE_CHANGE_PLATFORM_SUCCESS,
} from "../actions/site";
import {
	UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS,
} from "../actions/configurationServiceRequest";

import _isUndefined from "lodash/isUndefined";
import _pull from "lodash/pull";
import _remove from "lodash/remove";
import _union from "lodash/union";
import _unset from "lodash/unset";
import reduceReducers from "reduce-reducers";

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
			addSiteModalOpen: false,

			// Whether or not we are currently doing a request to the server to add/link a new site.
			linkingSite: false,

			// The URL that is currently trying to be linked.
			linkingSiteUrl: "",

			// Whether or not linking of a site has failed.
			linkSiteFailed: false,

			// The error object we retrieved from the server, which contains information on why the linking of the server failed.
			linkSiteError: null,

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
 * A reducer for the modal actions within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated sites object.
 */
function modalReducer( state = rootState.ui.sites, action ) {
	switch ( action.type ) {
		case LINK_SITE_MODAL_OPEN:
			return Object.assign( {}, state, {
				addSiteModalOpen: true,
			} );
		case LINK_SITE_MODAL_CLOSE:
			return Object.assign( {}, state, {
				addSiteModalOpen: false,
				linkSiteFailed: false,
				linkSiteError: null,
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
				addSiteModalOpen: false,
				linkingSiteUrl: "",
				linkSiteError: null,
				linkingSite: false,
			} );
		case LINK_SITE_FAILURE:
			return Object.assign( {}, state, {
				linkSiteFailed: true,
				linkSiteError: action.linkSiteError,
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
				retrievingSitesError: null,
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

const uiSites = reduceReducers( linkReducer, retrieveSitesReducer, modalReducer );

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
		return Object.assign( {}, site, { subscriptions: [] } );
	}

	return Object.assign( {}, site, { subscriptions: site.subscriptions.map( subscription => subscription.id ) } );
}

/* eslint-disable complexity */
/**
 * A reducer for the byId object.
 *
 * @param {Object} state The current state of the byId object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated byId object.
 */
export function byIdReducer( state = rootState.entities.sites.byId, action ) {
	const sites = Object.assign( {}, state );

	switch ( action.type ) {
		case LINK_SITE_SUCCESS:
			sites[ action.site.id ] = pluckSubscriptionIds( action.site );
			break;

		case RETRIEVE_SITES_SUCCESS:
			action.sites.forEach( ( site ) => {
				sites[ site.id ] = pluckSubscriptionIds( site );
			} );
			break;

		case SITE_CHANGE_PLATFORM_SUCCESS:
			sites[ action.siteId ].type = action.siteType;
			break;

		case SITE_ADD_SUBSCRIPTION_SUCCESS:
			sites[ action.siteId ].subscriptions.push( action.subscriptionId );
			break;

		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			_remove( sites[ action.siteId ].subscriptions, subscriptionId => subscriptionId === action.subscriptionId );
			break;

		case SITE_REMOVE_SUCCESS:
			_unset( sites, action.siteId );
			break;

		case UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS:
			if ( action.configurationService.siteId && sites[ action.configurationService.siteId ] ) {
				sites[ action.configurationService.siteId ].configurationServiceRequest = action.configurationService;
			}
	}

	return sites;
}
/* eslint-enable complexity */

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
		case SITE_REMOVE_SUCCESS:
			sites = _pull( state, action.siteId );
			return sites;
		default:
			return state;
	}
}
