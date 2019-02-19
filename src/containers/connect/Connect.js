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
	const hasUrl = connectParams.hasOwnProperty( "url" );
	const hasClientId = connectParams.hasOwnProperty( "client_id" );
	const hasExtensions = connectParams.hasOwnProperty( "extensions" );
	const hasRedirectUrl = connectParams.hasOwnProperty( "redirect_url" );
	const hasType = connectParams.hasOwnProperty( "type" );

	let clientId, url, extensions, redirectUrl, type;
	if ( hasClientId && hasUrl && hasExtensions && hasRedirectUrl && hasType ) {
		url = connectParams.url;
		clientId = connectParams.client_id;
		extensions = Array.isArray( connectParams.extensions ) ? connectParams.extensions : [ connectParams.extensions ];
		redirectUrl = connectParams.redirect_url;
		type = connectParams.type;

		// Save to a cookie, now that we have the data.
		setConnectParams( {
			clientId,
			url,
			redirectUrl,
			extensions,
			type,
		} );
	} else {
		// Retrieve from a cookie, verify each field and return, or return false.
		const connectCookie = getConnectParams();
		clientId = verifyObjectAndField( connectCookie, "clientId" ) && connectCookie.clientId;
		url = verifyObjectAndField( connectCookie, "url" ) && connectCookie.url;
		redirectUrl = verifyObjectAndField( connectCookie, "url" ) && connectCookie.redirectUrl;
		extensions = verifyObjectAndField( connectCookie, "extensions" ) && connectCookie.extensions;
		type = verifyObjectAndField( connectCookie, "type" ) && connectCookie.type;
	}

	// If any of the params is still false, dataMissing is true;
	const dataMissing = ! ( clientId && url && extensions && redirectUrl && type );

	return {
		url,
		clientId,
		extensions,
		redirectUrl,
		type,
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
