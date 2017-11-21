import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Determines if a certain URL is an external URL.
 *
 * @param {string} url The URL to test.
 * @returns {boolean} Whether or not the URL is an external URL.
 */
function isExternal( url ) {
	return url.startsWith( "http" );
}

/**
 * Link that also works for external URL's, see https://github.com/ReactTraining/react-router/issues/1147 for more information.
 */
export default class Link extends Component {
	render() {
		const internalProps = Object.assign( {}, this.props );
		delete internalProps.linkTarget;

		return isExternal( this.props.to )
			? <a
				href={ this.props.to }
				className={ this.props.className }
				aria-label={ this.props.ariaLabel }
				target={ this.props.linkTarget }
				rel={ this.props.linkTarget === "_blank" ? "noopener noreferrer" : this.props.linkRel }
				>
				{ this.props.children }
			</a>
			: <RouterLink { ...internalProps } />;
	}
}

Link.propTypes = {
	to: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.any,
	ariaLabel: PropTypes.string,
	linkTarget: PropTypes.string,
	linkRel: PropTypes.string,
};
