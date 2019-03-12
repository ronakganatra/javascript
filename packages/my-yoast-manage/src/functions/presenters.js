import { zeroPad } from "./helpers";

function currencyString( value ) {
	let negative = value < 0;
	value = Math.abs( value );
	let cents = zeroPad( value % 100 );
	let rest  = Math.floor( value / 100 );
	let amounts = [];

	while ( rest > 1000 ) {
		amounts.unshift( zeroPad( rest % 1000, 3 ) );
		rest = Math.floor( rest / 1000 );
	}
	amounts.unshift( rest );

	return ( negative ? "-" : "" ) + amounts.join( "." ) + "," + cents;
}

export function currencyPresenter( currency, value ) {
	let currencySymbol;
	switch( currency ) {
		case "EUR":
			currencySymbol = "€";
			break;
		case "GBP":
			currencySymbol = "£";
			break;
		default:
			currencySymbol = "$";
	}

	return `${ currencySymbol } ${ currencyString( value ) }`;
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
