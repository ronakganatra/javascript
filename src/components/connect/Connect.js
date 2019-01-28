import React from "react";
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

/* eslint-disable */
const mapStateToProps = ( state, ownProps ) => {
	const connectParams = queryString.parse( ownProps.location.search );

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

class ConnectComponent extends React.Component {
	constructor( props ) {
		super( props );
		console.log( this.props );
	}

	render() {
		if ( this.props.dataMissing ) {
			return (
				<div>
					<h1>OH NOES WE ARE MISSING RELEVANT DATA</h1>
				</div>
			)
		}
		return (
			<div>
				<h1>Authorize dis</h1>
				<p>
					{ "Table with authorizations" }
				</p>
				<button>
					{ "Authorize" }
				</button>
			</div>
		);
	}
}
/* eslint-enable */
const Connect = connect(
	mapStateToProps,
)( ConnectComponent );

export default Connect;
