import { retrieveSites } from "./sites";
import { getAllSubscriptions } from "./subscriptions";
import { getOrders } from "./orders";

let locations = {
	"/": retrieveSites(),
	"/sites": retrieveSites(),
	"/account/orders": getOrders(),
	"/account": getAllSubscriptions(),
	"/account/": getAllSubscriptions(),
	"/account/subscriptions": getAllSubscriptions(),
};

let matchingLocations = [
	{
		matcher: /\/sites\/([^/]+)/,
		action: ( dispatch ) => {
			dispatch( retrieveSites() );
			dispatch( getAllSubscriptions() );
		},
	},
];

/**
 * An action creator for a location change. Calls other action creators to actually create the actions.
 *
 * @param {Object} location The react router location object.
 * @returns {Object} A valid action.
 */
export default function locationChange( location ) {
	if ( locations.hasOwnProperty( location.pathname ) ) {
		return locations[ location.pathname ];
	}

	let action = () => {};

	matchingLocations.forEach( ( matchingLocation ) => {
		if ( location.pathname.match( matchingLocation.matcher ) ) {
			action = matchingLocation.action;
		}
	} );

	return action;
}
