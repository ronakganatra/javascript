import React from "react";
import { LargeButtonLink } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import { makeFullWidth } from "./Tables";
import defaults from "../config/defaults.json";

const SiteHeaderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: flex-end;
	align-content: flex-end;
	max-width: 1480px;
	height: 380px;
	background-image: linear-gradient(transparent, ${ colors.$color_pink_dark }), url( ${ props => props.imageUrl } )
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	position: relative;
	margin: 0 auto;
	padding: 0 32px 24px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.medium }px ) {
		padding: 0 24px 26px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.small }px ) {
		height: auto;
		min-height: 144px;
		padding: 0 18px 16px;
	}
`;

SiteHeaderContainer.propTypes = {
	imageUrl: React.PropTypes.string.isRequired,
};

const SiteHeaderSitename = styled.h1`
	flex: 1 1 auto;
	color: ${colors.$color_white};
	font-weight: 300;
	margin: 0;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-ms-word-break: break-all;
	word-break: break-word;
	// Firefox needs this for break word to work inside flex items.
	min-width: 0;

	@media screen and ( max-width: ${ defaults.css.breakpoint.small }px ) {
		text-align: center;
	}
`;

let LargeButtonLinkResponsive = makeFullWidth( LargeButtonLink );

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
			<LargeButtonLinkResponsive to={ `${ props.url }/wp-admin` } target="_blank">
				<FormattedMessage id="sites.buttons.visit-wp" defaultMessage="Open WordPress admin" />
				<NewTabMessage />
			</LargeButtonLinkResponsive>
		</SiteHeaderContainer>
	);
}

SiteHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
};
