import { retrieveSites } from "./sites";

/**
 * An action creator for a location change. Calls other action creators to actually create the actions.
 *
 * @param {Object} location The react router location object.
 * @returns {Object} A valid action.
 */
export default function locationChange( location ) {
	switch ( location.pathname ) {
		case "/":
		case "/sites":
			return retrieveSites();
		default:
			return false;
	}
}
