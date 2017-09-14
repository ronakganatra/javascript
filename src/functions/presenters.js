function zeroPad( value ) {
	return value.toString().padStart( 2, '0' );
}

export function euroPresenter( value ) {
	if ( value === null ) {
		return;
	}

	return `€ ${ zeroPad( value / 100 ) },${ zeroPad( value % 100 ) }`;
}

export function dollarPresenter( value ) {
	if ( value === null ) {
		return;
	}

	return `$ ${ zeroPad( value / 100 ) },${ zeroPad( value % 100 ) }`;
}

export function datePresenter( value ) {
	if ( value === null ) {
		return;
	}

	let date = new Date(value);

	return date.toLocaleString();
}
