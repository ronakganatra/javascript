import React from "react";
import { connect } from "react-redux";

/* eslint-disable */
const mapStateToProps = ( state, ownProps ) => {
	// Are userId, URL, and pluginSlug defined?
	const requiredParams = [ "userId", "url", "pluginSlug" ];
	console.log( ownProps );
	if ( ! Object.keys( ownProps.match.params ).every( param => requiredParams.includes( param ) ) ) {
		// Is there a connect cookie?

	}



	//todo: 3 booleans:
	// hasSite (whether user has the site he comes from),
	// hasSubscription (whether the user has any of our stuff),
	// hasSiteSubscription (whether one such sub is active for that site).

	//todo: check param cookies, set param cookies (could also be in component).
	return {
	};
};

class ConnectComponent extends React.Component {
	constructor() {
		super();
	}

	render() {
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
