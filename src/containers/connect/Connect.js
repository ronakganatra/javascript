import { connect } from "react-redux";
import * as queryString from "query-string";
import {
	getConnectParams,
	setConnectParams,
} from "../../functions/connect";
import ConnectComponent from "../../components/connect/Connect";
import { connectRequest } from "../../actions/connect";

/**
 * Verifies whether a certain variable is an object containing a certain field.
 *
 * @param {*}         object The "thing" to test whether it is an Object.
 * @param {string}    field  The field that should be on the object.
 *
 * @returns {boolean}        True when object is an Object that contains field as a key.
 */
function verifyObjectAndField( object, field ) {
	return object instanceof Object && object.hasOwnProperty( field );
}

/* eslint-disable require-jsdoc*/
export const mapStateToProps = ( state, ownProps ) => {
	/*
	Because the object returned by queryString was created with Object.create( null ), it's not an Object.prototype.
	We assign it to an actual Object.
	 */
	const connectParams = Object.assign( {}, queryString.parse( ownProps.location.search ) );

	/*
	Note: for queryString to properly parse the url parameter for URLs that may contain a querystring themselves,
	the url in the parameter has to be encoded with uriEncodeComponent().
	 */
	const requiredParams = [
		"url",
		"client_id",
		"extensions",
		"redirect_url",
		"type",
	];

	let connectProps = {};
	if ( requiredParams.every( param => connectParams.hasOwnProperty( param ) ) ) {
		connectProps = connectParams;

		// Save to a cookie, now that we have the data.
		setConnectParams( connectProps );
	} else {
		// Retrieve from a cookie, verify each field and return, or return false.
		const connectCookie = getConnectParams();
		requiredParams.forEach( ( param ) => {
			connectProps[ param ] = verifyObjectAndField( connectCookie, param ) && connectCookie[ param ];
		} );
	}

	// If any of the params is still false, dataMissing is true;
	const dataMissing = requiredParams.some( param => ! connectProps[ param ] );

	return {
		url: connectProps.url,
		clientId: connectProps.client_id,
		extensions: Array.isArray( connectProps.extensions ) || connectProps.extensions === false
			? connectProps.extensions
			: [ connectProps.extensions ],
		redirectUrl: connectProps.redirect_url,
		type: connectProps.type,
		dataMissing,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onAuthorize: ( connectParams ) => {
			dispatch( connectRequest( connectParams ) );
		},
		onDeny: () => {
			window.history.back();
		},
	};
};

/* eslint-enable require-jsdoc */
const Connect = connect(
	mapStateToProps,
	mapDispatchToProps,
)( ConnectComponent );

export default Connect;
