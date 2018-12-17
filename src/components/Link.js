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
	return url.startsWith( "http" ) || url === "#" || url.startsWith( "mailto:" );
}

/**
 * Link that also works for external URL's, see https://github.com/ReactTraining/react-router/issues/1147 for more information.
 */
export default class Link extends Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const internalProps = Object.assign( {}, this.props );
		delete internalProps.linkTarget;
		delete internalProps.linkRel;
		delete internalProps.ariaLabel;
		delete internalProps.enabledStyle;
		delete internalProps.iconSource;
		delete internalProps.iconSize;

		const externalProps = {
			href: this.props.to,
			className: this.props.className,
			"aria-label": this.props.ariaLabel,
			target: this.props.linkTarget,
			rel: this.props.linkTarget === "_blank" ? "noopener" : this.props.linkRel,
			onClick: this.props.onClick,
		};

		return isExternal( this.props.to )
			? <a { ...externalProps }>
				{ this.props.children }
			</a>
			: <RouterLink { ...internalProps } />;
	}
}

Link.propTypes = {
	to: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.any.isRequired,
	ariaLabel: PropTypes.string,
	linkTarget: PropTypes.string,
	linkRel: PropTypes.string,
	onClick: PropTypes.func,
};

Link.defaultProps = {
	className: null,
	ariaLabel: null,
	linkTarget: null,
	linkRel: null,
	onClick: null,
};
