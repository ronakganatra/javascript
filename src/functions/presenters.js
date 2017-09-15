import { zeroPad } from "./helpers";

/**
 * Presents a numerical value as a euro currency string.
 *
 * @param {number} value The amount in cents.
 *
 * @returns {string} A currency string.
 */
export function euroPresenter( value ) {
	if ( value === null ) {
		return;
	}

	return `€ ${ Math.floor( value / 100 ) },${ zeroPad( value % 100 ) }`;
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
		return;
	}

	return `$ ${ Math.floor( value / 100 ) },${ zeroPad( value % 100 ) }`;
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
		return;
	}

	let date = new Date(value);

	return date.toLocaleString();
}
