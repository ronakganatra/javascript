import React from "react";
import { WhiteButton } from "../components/Button";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const SiteHeaderContainer = styled.div`
	width:100%;
	height: 200px;
	background-image: linear-gradient(transparent, ${colors.$color_pink_dark}), url(http://placehold.it/1000x150);
	background-repeat: no-repeat;
	background-size: 100%;
`;

const SiteHeaderSitename = styled.h1`
	float: left;
	padding: 5px;
	margin: 0px;
	color: #FFF;
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
		<SiteHeaderContainer>
			<WhiteButton>
				Visit site
			</WhiteButton>
			<SiteHeaderSitename>
				Placehold.it/
			</SiteHeaderSitename>
		</SiteHeaderContainer>
	);
}

SiteHeader.propTypes = {
	name: React.PropTypes.string,
	url: React.PropTypes.string,
	imageUrl: React.PropTypes.string,
};
