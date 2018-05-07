import { prepareInternalRequest, doRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const DOWNLOAD_PROFILE_REQUEST = "DOWNLOAD_PROFILE_REQUEST";
export const DOWNLOAD_PROFILE_SUCCESS = "DOWNLOAD_PROFILE_SUCCESS";
export const DOWNLOAD_PROFILE_FAILURE = "DOWNLOAD_PROFILE_FAILURE";

/**
 *
 * @param {Object} profile the profile data retrieved from the server
 * @returns {{type: string, data: Object}} A download profile success action
 */
export function downloadProfileSuccess( profile ) {
	console.warn( profile );
	return {
		type: DOWNLOAD_PROFILE_SUCCESS,
		data: profile.profile,
	};
}

/**
 *
 * @param {Object} error the error
 * @returns {{type: string, error: {message: string}}} A download profile failure action
 */
export function downloadProfileFailure( error ) {
	return {
		type: DOWNLOAD_PROFILE_FAILURE,
		error: error,
	};
}

/**
 *
 * @returns {{type: string}} a download profile status action
 */
export function downloadProfileRequest() {
	return {
		type: DOWNLOAD_PROFILE_REQUEST,
	};
}

/**
 *
 * @returns {Object} A subscribe newsletter status action.
 */
export function downloadProfile() {
	return ( dispatch ) => {
		dispatch( downloadProfileRequest() );

		let userId = getUserId();
		let request = prepareInternalRequest( `Customers/${userId}/profile/` );

		return doRequest( request )
			.then( json => dispatch( downloadProfileSuccess( json ) ) )
			.catch( error => dispatch( downloadProfileFailure( error ) ) );
	};
}
