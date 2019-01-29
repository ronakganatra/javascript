import Cookies from "js-cookie";

/**
 * Creates a set cookie function.
 *
 * @param   {string}       key       The key/name for the cookie to set.
 * @param   {number|Date} expiresIn (Optional) The time to expiry in days (or expiry date as a date object).
 * @returns {Function}               A set cookie function.
 */
export function makeSetCookie( key, expiresIn = false ) {
	return ( value ) => {
		if ( expiresIn ) {
			console.log( expiresIn );
			Cookies.set( key, value, {
				expires: expiresIn,
			} );
		} else {
			Cookies.set( key, value );
		}
	};
}

/**
 * Creates a get cookie function.
 *
 * @param   {string}   key The key/name for the cookie to get the value of.
 * @returns {Function}     A get cookie function.
 */
export function makeGetCookie( key ) {
	return () => {
		return Cookies.get( key );
	};
}

/**
 * Creates a has cookie function.
 *
 * @param   {string}   key The key/name for the cookie to test the presence of.
 * @returns {Function}     A has cookie function.
 */
export function makeHasCookie( key ) {
	return () => {
		return !! Cookies.get( key );
	};
}
