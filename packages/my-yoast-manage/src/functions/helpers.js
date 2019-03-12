/**
 * Pads a string or number with zeroes, for use with currencies.
 *
 * @param {string|number} value
 * @param {number}        zeroes
 *
 * @returns {string}
 */
export function zeroPad( value, zeroes = 2 ) {
	return value.toString().padStart( zeroes, '0' );
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

let isLocalEnv = function () {
	return window.location.host.indexOf( "my.yoast.test" ) !== -1;
};

export function getMyYoastHost() {
	if ( isLocalEnv() ) {
		return "http://my.yoast.test:3000";
	} else {
		return "https://my.yoast.com";
	}
}

export function getWooCommerceHost() {
	if ( isLocalEnv() ) {
		return "http://yoast.test";
	} else {
		return "https://yoast.com";
	}
}

export function getLearndashHost() {
	if ( isLocalEnv() ) {
		return "http://academy.yoast.test";
	} else {
		return "https://academy.yoast.com";
	}
}

export function getOrderUrl( orderId, shopId ) {
	let host = getWooCommerceHost();

	if ( shopId === 2 ) {
		return `${ host }/eu/wp-admin/post.php?post=${ orderId }&action=edit`;
	}
	if ( shopId === 7 ) {
		return `${ host }/uk/wp-admin/post.php?post=${ orderId }&action=edit`;
	}

	return `${ host }/wp/wp-admin/post.php?post=${ orderId }&action=edit`;
}

export function getPathPrefix() {
	return isLocalEnv() ? "" : "/manage";
}

export function path( path ) {
	return getPathPrefix() + path;
}
