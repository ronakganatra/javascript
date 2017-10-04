/**
 * Pads a string or number with zeroes, for use with currencies.
 *
 * @param {string|number} value
 *
 * @returns {string}
 */
export function zeroPad( value ) {
	return value.toString().padStart( 2, '0' );
}

/**
 * Capitalizes a string.
 *
 * @param {string} string The string to capitalize.
 *
 * @returns {string} The capitalized string.
 */
export function capitalize (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getMyYoastHost() {
	if ( window.location.host.indexOf( "localhost" ) !== -1 ) {
		return "http://localhost:3000";
	} else {
		return "https://my.yoast.com";
	}
}

export function getWooCommerceHost() {
	if ( window.location.host.indexOf( "localhost" ) !== -1 ) {
		return "http://yoast.dev";
	} else {
		return "https://www.yoast.com";
	}
}

export function getOrderUrl( orderId, shopId ) {
	let host = getWooCommerceHost();

	if ( shopId === 2 ) {
		return `${ host }/eu/wp-admin/post.php?post=${ orderId }&action=edit`;
	}
	return `${ host }/wp/wp-admin/post.php?post=${ orderId }&action=edit`;
}
