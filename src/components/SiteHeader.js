import React from "react";
import { IconRightButtonLink, IconButtonLink } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import angleRight from "../icons/angle-right.svg";
import angleLeft from "../icons/angle-left.svg";
import { FormattedMessage } from "react-intl";
import NewTabMessage from "../components/NewTabMessage";
import { makeFullWidth } from "./Tables";
import defaults from "../config/defaults.json";

const SiteHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1480px;
	height: 286px;
	background-color: ${ colors.$color_pink_dark };
	background-image: url( ${ props => props.imageUrl } );
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	position: relative;
	margin: 0 auto;
	padding: 0 32px 24px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 0 24px 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		height: auto;
		min-height: 144px;
		padding: 0 16px 16px;
	}
`;

SiteHeaderContainer.propTypes = {
	imageUrl: React.PropTypes.string.isRequired,
};

const SiteHeaderSitename = styled.h1`
	flex: 1 1 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	color: ${colors.$color_white};
	font-weight: 300;
	font-size: 2em;
	margin: 0;
	padding-top: 100px;
	height: 186px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-ms-word-break: break-all;
	word-break: break-word;
	// Firefox needs this for break word to work inside flex items.
	min-width: 0;
	text-align: center;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		text-align: center;
	}
`;


const ButtonSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-end;
	align-content: flex-end;
	height: 100px;
`;

let BackButton = makeFullWidth( IconButtonLink );
let WPAdminButton = makeFullWidth( IconRightButtonLink );
// let LargeButtonLinkResponsive = makeFullWidth( LargeButtonLink );

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
			<ButtonSection>
				<BackButton to={ "/sites" } iconSource={ angleLeft }>
					<FormattedMessage id="sites.buttons.back" defaultMessage="Back" />
				</BackButton>
				<WPAdminButton iconSource={ angleRight } to={ `${ props.url }/wp-admin` } target="_blank">
					<FormattedMessage id="sites.buttons.visit-wp" defaultMessage="Open WordPress admin" />
					<NewTabMessage />
				</WPAdminButton>
			</ButtonSection>
		</SiteHeaderContainer>
	);
}

SiteHeader.defaultProps = {
	imageUrl: "",
};
SiteHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
};
