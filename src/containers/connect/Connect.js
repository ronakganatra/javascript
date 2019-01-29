import { connect } from "react-redux";
import * as queryString from "query-string";
import {
	getConnectClientId, getConnectPluginSlug,
	getConnectUrl,
	hasConnectClientId,
	hasConnectPluginSlug,
	hasConnectUrl,
	setConnectClientId,
	setConnectPluginSlug,
	setConnectUrl,
} from "../../functions/connect";
import ConnectComponent from "../../components/connect/Connect";

/* eslint-disable require-jsdoc*/
const mapStateToProps = ( state, ownProps ) => {
	const connectParams = queryString.parse( ownProps.location.search );

	/*
	Note: for queryString to properly parse the url parameter for URLs that may contain a querystring themselves,
	the url in the parameter has to be encoded with uriEncodeComponent().
	 */

	const hasClientId = Object.prototype.hasOwnProperty.call( connectParams, "clientId" );
	const hasUrl = Object.prototype.hasOwnProperty.call( connectParams, "url" );
	const hasPluginSlug = Object.prototype.hasOwnProperty.call( connectParams, "pluginSlug" );

	let clientId, url, pluginSlug;
	if ( hasClientId && hasUrl && hasPluginSlug ) {
		clientId = connectParams.clientId;
		url = connectParams.url;
		pluginSlug = connectParams.pluginSlug;

		// Save to a cookie, now that we have the data.
		setConnectClientId( clientId );
		setConnectUrl( url );
		setConnectPluginSlug( pluginSlug );
	} else {
		// Retrieve from a cookie, or return false.
		clientId = hasConnectClientId() && getConnectClientId();
		url = hasConnectUrl() && getConnectUrl();
		pluginSlug = hasConnectPluginSlug() && getConnectPluginSlug();
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

/* eslint-enable require-jsdoc */
const Connect = connect(
	mapStateToProps,
)( ConnectComponent );

export default Connect;
