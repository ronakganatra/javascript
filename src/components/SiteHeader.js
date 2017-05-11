import React from "react";
import { LargeButtonLink } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { FormattedMessage } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";

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
	padding: 0 40px 26px;

	@media screen and ( max-width: 800px ) {
		height: auto;
		min-height: 144px;
		padding: 0 24px 16px;
	}

	.visit-wp-admin {
		flex: 0 0 auto;
		margin-top: 1em;

		@media screen and ( max-width: 800px ) {
			min-width: 100%;
		}
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

	@media screen and ( max-width: 800px ) {
		text-align: center;
	}
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
			<LargeButtonLink to={ `${ props.url }/wp-admin` } className="visit-wp-admin" target="_blank">
				<FormattedMessage id="sites.buttons.visit-wp" defaultMessage="Visit WP admin" />
				<NewTabMessage />
			</LargeButtonLink>
		</SiteHeaderContainer>
	);
}

SiteHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
};
