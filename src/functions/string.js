/**
 * @summary Sets the first letter of order status in capital
 *
 * @param {string} string The order status that is loaded
 * @returns {string} The order status that is loaded
 */
export function capitalizer( string ) {
	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

