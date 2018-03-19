import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const FETCH_CONFIGURATION_SERVICES_REQUEST = "FETCH_CONFIGURATION_SERVICES_REQUEST";
export const FETCH_CONFIGURATION_SERVICES_FAILURE = "FETCH_CONFIGURATION_SERVICES_FAILURE";
export const FETCH_CONFIGURATION_SERVICES_SUCCESS = "FETCH_CONFIGURATION_SERVICES_SUCCESS";

export const UPDATE_CONFIGURATION_SERVICE_REQUEST = "UPDATE_CONFIGURATION_SERVICE_REQUEST";
export const UPDATE_CONFIGURATION_SERVICE_FAILURE = "UPDATE_CONFIGURATION_SERVICE_FAILURE";
export const UPDATE_CONFIGURATION_SERVICE_SUCCESS = "UPDATE_CONFIGURATION_SERVICE_SUCCESS";

export const CONFIGURATION_REQUEST_MODAL_OPEN = "CONFIGURATION_REQUEST_MODAL_OPEN";
export const CONFIGURATION_REQUEST_MODAL_CLOSE = "CONFIGURATION_REQUEST_MODAL_CLOSE";

/**
 * An action creator for the configuration request modal open action.
 *
 * @param {string} siteId The id of the site that a request modal is opened for.
 *
 * @returns {Object} The configuration request modal open action.
 */
export function configurationRequestModalOpen( siteId ) {
	return {
		type: CONFIGURATION_REQUEST_MODAL_OPEN,
		siteId: siteId,
	};
}

/**
 * An action creator for the configuration request modal close action.
 *
 * @returns {Object} The configuration request modal close action.
 */
export function configurationRequestModalClose() {
	return {
		type: CONFIGURATION_REQUEST_MODAL_CLOSE,
	};
}

/**
 * An action creator for the fetch configuration services request action.
 *
 * @returns {Object} The fetch configuration services request action.
 */
export function fetchConfigurationServicesRequest() {
	return {
		type: FETCH_CONFIGURATION_SERVICES_REQUEST,
	};
}

/**
 * An action creator for the fetch configuration services failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The fetch configuration services failure action.
 */
export function fetchConfigurationServicesFailure( error ) {
	return {
		type: FETCH_CONFIGURATION_SERVICES_FAILURE,
		error,
	};
}

/**
 * An action creator for the fetch configuration services success action.
 *
 * @param {Array} configurationServices The configuration services after a successful fetch configuration services.
 * @returns {Object} The fetch configuration services success action.
 */
export function fetchConfigurationServicesSuccess( configurationServices ) {
	return {
		type: FETCH_CONFIGURATION_SERVICES_SUCCESS,
		configurationServices,
	};
}

/**
 * An action creator to fetch the configuration services of the user.
 *
 * @returns {Function} A function that fetches a user's configuration services.
 */
export function fetchConfigurationServices() {
	return ( dispatch ) => {
		dispatch( fetchConfigurationServicesRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/ConfigurationServices/`, "GET" );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( fetchConfigurationServicesSuccess( response ) );
			} )
			.catch( ( error ) => dispatch( fetchConfigurationServicesFailure( error ) ) );
	};
}

/**
 * An action creator for the update configuration services request action.
 *
 * @returns {Object} The update configuration services request action.
 */
export function updateConfigurationServiceRequest() {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_REQUEST,
	};
}

/**
 * An action creator for the update configuration services failure action.
 *
 * @param {Object} error The error that occurred.
 * @returns {Object} The update configuration services failure action.
 */
export function updateConfigurationServiceFailure( error ) {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_FAILURE,
		error: error,
	};
}

/**
 * An action creator for the update configuration services success action.
 *
 * @param {Array} configurationService The configuration service updated after a successful update configuration services.
 * @returns {Object} The update configuration services success action.
 */
export function updateConfigurationServiceSuccess( configurationService ) {
	return {
		type: UPDATE_CONFIGURATION_SERVICE_SUCCESS,
		configurationService,
	};
}

/**
 * An action creator to update the configuration services of the user.
 *
 * @param {Object} data Data to use to update the configuration service.
 * @param {string} data.name The name of the configuration service.
 *
 * @returns {Function} A function that updates a user's configuration services.
 */
export function updateConfigurationService( data ) {
	return ( dispatch ) => {
		dispatch( updateConfigurationServiceRequest() );

		let request = prepareInternalRequest( "/ConfigurationServices/generate/", "POST", data );

		return doRequest( request )
			.then( ( response ) => {
				dispatch( updateConfigurationServiceSuccess( response ) );
			} )
			.then( () => {
				dispatch( configurationRequestModalClose() );
			} )
			.catch( ( error ) => dispatch( updateConfigurationServiceFailure( error ) ) );
	};
}
