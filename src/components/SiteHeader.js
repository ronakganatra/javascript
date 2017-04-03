import React from "react";
import { WhiteButton } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const SiteHeaderContainer = styled.div`
	max-width: 1480px;
	height: 380px;
	background-image: linear-gradient(transparent, ${colors.$color_pink_dark}), url( ${ props => props.imageUrl } ) 
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	position: relative;
	margin: auto;
	
	& button {
		position: absolute;
		right: 30px;
		bottom: 26px;
	}
`;

SiteHeaderContainer.propTypes = {
	imageUrl: React.PropTypes.string.isRequired,
};

const SiteHeaderSitename = styled.h1`
	color: ${colors.$color_white};
	font-weight: 300;
	float: left;
	padding: 5px;
	margin: 0px;
	position: absolute;
	bottom: 26px;
	left: 30px;
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
			<WhiteButton onClick={ () => window.open(  props.url, "_blank" ) }>
				Visit site
			</WhiteButton>
		</SiteHeaderContainer>
	);
}

SiteHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
};
