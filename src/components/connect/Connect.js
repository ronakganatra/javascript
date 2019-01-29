import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

class ConnectComponent extends React.Component {
	render() {
		return (
			<div>
				<h1>Authorize dis</h1>
				<p>
					{ this.props.dataMissing ? "Oh noes we are missing some data" : "Connected with the following data" }
				</p>
				<ul>
					<li>
						<p><strong>dataMissing</strong></p>
						{ this.props.dataMissing.toString() }
					</li>
					<li>
						<p><strong>clientId</strong></p>
						{ this.props.clientId }
					</li>
					<li>
						<p><strong>url</strong></p>
						{ this.props.url }
					</li>
					<li>
						<p><strong>pluginSlug</strong></p>
						{ this.props.pluginSlug }
					</li>
				</ul>
				<button>
					{ "Authorize" }
				</button>
			</div>
		);
	}
}


ConnectComponent.propTypes = {
	dataMissing: PropTypes.bool.isRequired,
	clientId: PropTypes.string,
	url: PropTypes.string,
	pluginSlug: PropTypes.string,
};

ConnectComponent.defaultProps = {
	clientId: "MISSING!",
	url: "MISSING!",
	pluginSlug: "MISSING!",
};

export default injectIntl( ConnectComponent );
