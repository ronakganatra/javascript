import { retrieveSites } from "./sites";
import { getAllSubscriptions } from "./subscriptions";
import { getOrders } from "./orders";

/**
 * An action creator for a location change. Calls other action creators to actually create the actions.
 *
 * @param {Object} location The react router location object.
 * @returns {Object} A valid action.
 */
export default function locationChange( location ) {
	let matches;

	switch ( location.pathname ) {
		case "/":
		case "/sites":
			return retrieveSites();
		case "/account/subscriptions":
			return getAllSubscriptions();
		case "/account/orders":
			return getOrders();
		default:
			matches = location.pathname.match( /\/sites\/([^/]+)/ );

			if ( null !== matches ) {
				return ( dispatch ) => {
					dispatch( retrieveSites() );
					dispatch( getAllSubscriptions() );
				};
			}

			return false;
	}
}
