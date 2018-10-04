import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const FETCH_CONFIGURATION_SERVICE_REQUESTS_REQUEST = "FETCH_CONFIGURATION_SERVICE_REQUESTS_REQUEST";
export const FETCH_CONFIGURATION_SERVICE_REQUESTS_FAILURE = "FETCH_CONFIGURATION_SERVICE_REQUESTS_FAILURE";
export const FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS = "FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS";

export const UPDATE_CONFIGURATION_SERVICE_REQUEST_REQUEST = "UPDATE_CONFIGURATION_SERVICE_REQUEST_REQUEST";
export const UPDATE_CONFIGURATION_SERVICE_REQUEST_FAILURE = "UPDATE_CONFIGURATION_SERVICE_REQUEST_FAILURE";
export const UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS = "UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS";

export const CONFIGURATION_SERVICE_REQUEST_MODAL_OPEN  = "CONFIGURATION_SERVICE_REQUEST_MODAL_OPEN";
export const CONFIGURATION_SERVICE_REQUEST_MODAL_CLOSE = "CONFIGURATION_SERVICE_REQUEST_MODAL_CLOSE";

/**
 * An action creator for the configuration service request modal open action.
 *
 * @param {string} siteId The id of the site that a request modal is opened for.
 *
 * @returns {Object} The configuration service request modal open action.
 */
export function configurationServiceRequestModalOpen( siteId ) {
	return {
		type: CONFIGURATION_SERVICE_REQUEST_MODAL_OPEN,
		siteId,
	};
}

/**
 * An action creator for the configuration request modal close action.
 *
 * @returns {Object} The configuration request modal close action.
 */
export function configurationServiceRequestModalClose() {
	return {
		type: CONFIGURATION_SERVICE_REQUEST_MODAL_CLOSE,
	};
}

/**
 * An action creator for the fetch configuration services request action.
 *
 * @returns {Object} The fetch configuration services request action.
 */
export function fetchConfigurationServiceRequests() {
	return {
		type: FETCH_CONFIGURATION_SERVICE_REQUESTS_REQUEST,
	};
}

/**
 * An action creator for the fetch configuration services failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The fetch configuration services failure action.
 */
export function fetchConfigurationServiceRequestsFailure( error ) {
	return {
		type: FETCH_CONFIGURATION_SERVICE_REQUESTS_FAILURE,
		error,
	};
}

/**
 * An action creator for the fetch configuration services success action.
 *
 * @param {Array} configurationServiceRequests The configuration services after a successful fetch configuration services.
 *
 * @returns {Object} The fetch configuration services success action.
 */
export function fetchConfigurationServiceRequestsSuccess( configurationServiceRequests ) {
	return {
		type: FETCH_CONFIGURATION_SERVICE_REQUESTS_SUCCESS,
		configurationServiceRequests,
	};
}

/**
 * An action creator for the update configuration services request action.
 *
 * @returns {Object} The update configuration services request action.
 */
export function updateConfigurationServiceRequest() {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_REQUEST_REQUEST,
	};
}

/**
 * An action creator for the update configuration services failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The update configuration services failure action.
 */
export function updateConfigurationServiceRequestFailure( error ) {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_REQUEST_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the update configuration services success action.
 *
 * @param {Array} configurationService The configuration service updated after a successful update configuration services.
 * @returns {Object} The update configuration services success action.
 */
export function updateConfigurationServiceRequestSuccess( configurationService ) {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_REQUEST_SUCCESS,
		configurationService,
	};
}

/**
 * A helper function to fetch the configuration services of the user.
 *
 * @returns {Function} A function that fetches a user's configuration services.
 */
export function loadConfigurationServiceRequests() {
	return ( dispatch ) => {
		dispatch( fetchConfigurationServiceRequests() );

		const userId = getUserId();
		const request = prepareInternalRequest( `Customers/${userId}/ConfigurationServiceRequests/`, "GET" );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( fetchConfigurationServiceRequestsSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( fetchConfigurationServiceRequestsFailure( error ) ) );
	};
}

/**
 * A helper function to update the configuration services of the user.
 *
 * @param {string} id   The ID of the configuration service request.
 * @param {Object} data Data to use to update the configuration service.
 *
 * @returns {Function} A function that updates a user's configuration services.
 */
export function configureConfigurationServiceRequest( id, data ) {
	return ( dispatch ) => {
		dispatch( updateConfigurationServiceRequest() );

		const request = prepareInternalRequest( `/ConfigurationServiceRequests/${id}/configure/`, "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( updateConfigurationServiceRequestSuccess( response ) );
			} )
			.then( () => {
				dispatch( configurationServiceRequestModalClose() );
			} )
			.catch( ( error ) => dispatch( updateConfigurationServiceRequestFailure( error ) ) );
	};
}
