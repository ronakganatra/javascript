import { zeroPad } from "./helpers";

function currencyString( value ) {
	let cents = zeroPad( value % 100 );
	let rest  = Math.floor( value / 100 );
	let amounts = [];

	console.log( value, rest );

	while ( rest > 1000 ) {
		amounts.push( rest % 1000 );
		rest = Math.floor( rest / 1000 );
	}
	amounts.unshift( rest );

	return amounts.join( "." ) + "," + cents;
}

/**
 * Presents a numerical value as a euro currency string.
 *
 * @param {number} value The amount in cents.
 *
 * @returns {string} A currency string.
 */
export function euroPresenter( value ) {
	if ( value === null ) {
		return "";
	}

	return `€ ${ currencyString( value ) }`;
}

/**
 * Presents a numerical value as a dollar currency string.
 *
 * @param {number} value The amount in cents.
 *
 * @returns {string} A currency string.
 */
export function dollarPresenter( value ) {
	if ( value === null ) {
		return "";
	}

	return `$ ${ currencyString( value ) }`;
}

/**
 * Presents a value that can be turned into a Date as that date's localeString.
 *
 * @param {string|number|Date} value The date, passed to the Date constructor.
 *
 * @returns {string} That date's localeString.
 */
export function datePresenter( value ) {
	if ( value === null ) {
		return "";
	}

	let date = new Date(value);

	return date.toLocaleString();
}
