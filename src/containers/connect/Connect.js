import { connect } from "react-redux";
import * as queryString from "query-string";
import {
	getConnectParams,
	setConnectParams,
} from "../../functions/connect";
import ConnectComponent from "../../components/connect/Connect";

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
	const hasClientId = connectParams.hasOwnProperty( "clientId" );
	const hasUrl = connectParams.hasOwnProperty( "url" );
	const hasPluginSlug = connectParams.hasOwnProperty( "pluginSlug" );

	let clientId, url, pluginSlug;
	if ( hasClientId && hasUrl && hasPluginSlug ) {
		clientId = connectParams.clientId;
		url = connectParams.url;
		pluginSlug = connectParams.pluginSlug;

		// Save to a cookie, now that we have the data.
		setConnectParams( {
			clientId,
			url,
			pluginSlug,
		} );
	} else {
		// Retrieve from a cookie, verify each field and return, or return false.
		const connectCookie = getConnectParams();
		clientId = verifyObjectAndField( connectCookie, "clientId" ) && connectCookie.clientId;
		url = verifyObjectAndField( connectCookie, "url" ) && connectCookie.url;
		pluginSlug = verifyObjectAndField( connectCookie, "pluginSlug" ) && connectCookie.pluginSlug;
	}

	// If any of the params is still false, dataMissing is true;
	const dataMissing = ! ( clientId && url && pluginSlug );

	return {
		clientId,
		url,
		pluginSlug,
		dataMissing,
	};
};

export const mapDispatchToProps = () => {
	return {
		onAuthorize: () => {
		},
		onDeny: () => {
		},
	};
};

/* eslint-enable require-jsdoc */
const Connect = connect(
	mapStateToProps,
	mapDispatchToProps,
)( ConnectComponent );

export default Connect;
