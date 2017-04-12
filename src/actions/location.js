import { retrieveSites } from "./sites";
import { getSiteSubscriptions } from "./subscriptions";

/**
 * An action creator for a location change. Calls other action creators to actually create the actions.
 *
 * @param {Object} location The react router location object.
 * @returns {Object} A valid action.
 */
export default function locationChange( location ) {
	let matches;

	console.log( location );
	switch ( location.pathname ) {
		case "/":
		case "/sites":
			return retrieveSites();
		default:

			matches = location.pathname.match( /\/sites\/([^/]+)/ );

			console.log( matches );

			if ( null !== matches ) {
				let siteId = matches[ 1 ];

				return ( dispatch ) => {
					retrieveSites()( dispatch );
					getSiteSubscriptions( siteId )( dispatch );
				};
			}

			return false;
	}
}
