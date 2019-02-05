import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import SiteAuthenticationForm from "./SiteAuthenticationForm";

/**
 * The connect/authorization component.
 */
class ConnectComponent extends React.Component {
	/**
	 * Renders the connect component.
	 *
	 * @returns {JSXElement} The rendered connect component.
	 */
	render() {
		return (
			<SiteAuthenticationForm
				forUrl={ typeof( this.props.url ) === "string" ? this.props.url : "your website" }
				onAuthorize={ this.props.onAuthorize }
				onDeny={ this.props.onDeny }
				siteAuthorizations={ this.props.siteAuthorizations }
				myYoastAuthorizations={ this.props.myYoastAuthorizations }

			/>
		);
	}
}


ConnectComponent.propTypes = {
	dataMissing: PropTypes.bool.isRequired,
	clientId: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	url: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	pluginSlug: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	siteAuthorizations: PropTypes.array,
	myYoastAuthorizations: PropTypes.array,
	onAuthorize: PropTypes.func,
	onDeny: PropTypes.func,
};

ConnectComponent.defaultProps = {
	clientId: "MISSING!",
	url: "MISSING!",
	pluginSlug: "MISSING!",
};

export default injectIntl( ConnectComponent );
