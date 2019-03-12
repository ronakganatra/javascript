import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import NewTabMessage from "./NewTabMessage";

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
 * Determines if a certain URL points to Yoast.
 *
 * @param {string} url The URL to test.
 * @returns {boolean} Whether or not the URL points to Yoast.
 */
function isYoastLink( url ) {
	return /yoast\.com|yoast\.test|yoa\.st/.test( url );
}

/**
 * Link that also works for external URL's, see https://github.com/ReactTraining/react-router/issues/1147
 * for more information.
 *
 * When an external link has a `target="_blank"` attribute, it will automatically
 * add the accessibility visually hidden message "(Opens in a new browser tab)"
 * by using the `NewTabMessage` component.
 *
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

		/*
		 * When a link has a target _blank attribute and it doesn't point to Yoast,
		 * we always want a default "noopener" rel attribute value.
		 */
		let relValueForTargetBlank = "noopener";

		/*
		 * When a link has a target _blank attribute and it does point to Yoast,
		 * we use the linkRel prop which defaults to `null` so it doesn't render
		 * the rel attribute. This way, it can be overridden setting the prop, if necessary.
		 */
		if ( isYoastLink( this.props.to ) ) {
			relValueForTargetBlank = this.props.linkRel;
		}

		const hasTargetBlank = this.props.linkTarget === "_blank";

		const externalProps = {
			href: this.props.to,
			className: this.props.className,
			"aria-label": this.props.ariaLabel,
			target: this.props.linkTarget,
			rel: hasTargetBlank ? relValueForTargetBlank : this.props.linkRel,
			onClick: this.props.onClick,
		};

		return isExternal( this.props.to )
			? <a { ...externalProps }>
				{ this.props.children }
				{ hasTargetBlank && <NewTabMessage /> }
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
