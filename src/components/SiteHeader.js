import React from "react";
import { LargeButtonLink } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";

const SiteHeaderContainer = styled.div`
	max-width: 1480px;
	height: 380px;
	background-image: linear-gradient(transparent, ${ colors.$color_pink_dark }), url( ${ props => props.imageUrl } )
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	position: relative;
	margin: auto;

	.visit-wp-admin {
		position: absolute;
		right: 40px;
		bottom: 26px;
	}
`;

SiteHeaderContainer.propTypes = {
	imageUrl: React.PropTypes.string.isRequired,
};

const SiteHeaderSitename = styled.h1`
	color: ${colors.$color_white};
	font-weight: 300;
	margin: 0;
	position: absolute;
	bottom: 26px;
	left: 40px;
`;

/**
 * The SiteHeader component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered component
 * @constructor
 */
export default function SiteHeader( props ) {
	return (
		<SiteHeaderContainer imageUrl={ props.imageUrl }>
			<SiteHeaderSitename>
				{ props.name }
			</SiteHeaderSitename>
			<LargeButtonLink to={ props.url } className="visit-wp-admin" target="_blank">
				<FormattedMessage id="sites.buttons.visit-wp" defaultMessage="Visit WP admin" />
			</LargeButtonLink>
		</SiteHeaderContainer>
	);
}

SiteHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
};
