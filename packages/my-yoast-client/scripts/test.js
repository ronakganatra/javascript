process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
process.env.REACT_APP_API_URL = 'https://my.yoast.com/api';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require( 'dotenv' ).config( { silent: true } );

const jest = require( 'jest' );
const argv = process.argv.slice( 2 );


const interactive = process.env.NOT_INTERACTIVE !== "true";

// Watch unless on CI, nonInteractive or in coverage mode
if ( interactive && ! process.env.CI && argv.indexOf( '--coverage' ) < 0 ) {
	argv.push( '--watch' );
}

if ( ! interactive || process.env.CI ) {
	argv.push( '--runInBand' );
}

jest.run( argv );