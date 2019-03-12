import _union from "lodash/union";
import {
	CONFIGURATION_SERVICE_REQUEST_MODAL_CLOSE,
	CONFIGURATION_SERVICE_REQUEST_MODAL_OPEN,
	FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS,
	UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS,
} from "../actions/configurationServiceRequest";

/**
 * Initial state
 */
const rootState = {
	entities: {
		configurationServiceRequests: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		configurationServiceRequest: {
			configurationServiceRequestModalOpen: false,
			configurationServiceRequestModalSiteId: "",
		},

	},
};

/**
 * Reducers
 */

/**
 * A reducer for the configurationServiceRequests object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ConfigurationServiceRequests object.
 */
export function uiConfigurationServiceRequestReducer( state = rootState.ui.configurationServiceRequest, action ) {
	switch ( action.type ) {
		case CONFIGURATION_SERVICE_REQUEST_MODAL_OPEN:
			return Object.assign( {}, state, {
				configurationServiceRequestModalOpen: true,
				configurationServiceRequestModalSiteId: action.siteId,
			} );
		case CONFIGURATION_SERVICE_REQUEST_MODAL_CLOSE:
			return Object.assign( {}, state, {
				configurationServiceRequestModalOpen: false,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdConfigurationServiceRequestsReducer list.
 *
 * @param {Object} state The current state of the byIdConfigurationServiceRequestsReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdConfigurationServiceRequestsReducer object.
 */
export function byIdConfigurationServiceRequestsReducer( state = rootState.entities.configurationServiceRequests.byId, action ) {
	let configurationServiceRequests;

	switch ( action.type ) {
		case FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS:
			configurationServiceRequests = Object.assign( {}, state );

			action.configurationServiceRequests.forEach( ( configurationServiceRequest ) => {
				configurationServiceRequests[ configurationServiceRequest.id ] = configurationServiceRequest;
			} );

			return configurationServiceRequests;
		case UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS:
			configurationServiceRequests = Object.assign( {}, state );

			configurationServiceRequests[ action.configurationService.id ] = action.configurationService;

			return configurationServiceRequests;
		default:
			return state;
	}
}

/**
 * A reducer for the allIdsConfigurationServiceRequestsReducer list.
 *
 * @param {Array} state The current state of the allIdsConfigurationServiceRequestsReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsConfigurationServiceRequestsReducer array.
 */
export function allIdsConfigurationServiceRequestsReducer( state = rootState.entities.configurationServiceRequests.allIds, action ) {
	switch ( action.type ) {
		case FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS:
			return _union( state, action.configurationServiceRequests.map( configurationServiceRequest => configurationServiceRequest.id ) );
		case UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS:
			return _union( state, [ action.configurationService.id ] );
		default:
			return state;
	}
}
