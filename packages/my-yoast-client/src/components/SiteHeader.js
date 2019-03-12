import PropTypes from "prop-types";
import React from "react";
import { IconRightButtonLink } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import angleRight from "../icons/angle-right.svg";
import { FormattedMessage, injectIntl } from "react-intl";
import { makeFullWidth } from "./Tables";
import defaults from "../config/defaults.json";
import { Heading } from "./Headings";

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
	imageUrl: PropTypes.string,
};

SiteHeaderContainer.defaultProps = {
	imageUrl: "",
};

const SiteHeaderSitename = styled( Heading )`
	flex: 1 1 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	color: ${colors.$color_white};
	font-weight: 300;
	margin: 0;
	min-height: 186px;
	word-wrap: break-word;
	overflow-wrap: break-word;
	-ms-word-break: break-all;
	word-break: break-word;
	// Firefox needs this for break word to work inside flex items.
	min-width: 0;
	text-align: center;
	padding-bottom: 10px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		text-align: center;
	}
`;


const ButtonSection = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: flex-end;
	align-content: flex-end;
	height: 100px;
`;

const WPAdminButton = makeFullWidth( IconRightButtonLink );

/**
 * The SiteHeader component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered component
 * @constructor
 */
function SiteHeader( props ) {
	return (
		<SiteHeaderContainer imageUrl={ props.imageUrl }>
			<SiteHeaderSitename>
				{ props.name }
			</SiteHeaderSitename>
			<ButtonSection>
				{ props.adminButton &&
					<WPAdminButton iconSource={ angleRight } to={ `${ props.url }/wp-admin` } linkTarget="_blank">
						<FormattedMessage id="sites.buttons.visitWp" defaultMessage="Open WordPress admin" />
					</WPAdminButton>
				}
			</ButtonSection>
		</SiteHeaderContainer>
	);
}

export default injectIntl( SiteHeader );

SiteHeader.defaultProps = {
	imageUrl: "",
};
SiteHeader.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	adminButton: PropTypes.bool.isRequired,
	imageUrl: PropTypes.string,
};
