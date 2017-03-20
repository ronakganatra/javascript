import { getAuthUrl, removeCookies as removeAuthCookies } from "./auth";

/**
 * Returns the API URL that should be used to do AJAX requests to.
 *
 * @returns {string} The URL of the API.
 */
export function getApiUrl() {
	if ( typeof process.env.REACT_APP_API_URL !== "undefined" ) {
		return process.env.REACT_APP_API_URL;
	}

	return "http://localhost:3000/api";
}

/**
 * Checks a response for a 401 status code and redirects if present.
 *
 * @param {Object} response The response that needs to be checked for a 401.
 * @returns {Object} Returns the same object as given if no 401 is present.
 */
export function handle401( response ) {
	if ( response.status === 401 ) {
		removeAuthCookies();
		document.location.href = getAuthUrl();
	}

	return response;
}
