import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

// Remove image element below threshold.
let responsiveWidthThreshold = "800px";

const SubscriptionHeaderContainer = styled.div`
	width: 100%;
	min-height: 180px;
	background-color: ${colors.$palette_purple_dark}
	display: flex;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold } ) {
		min-height: 0;
	}
`;

// Places the description at the bottom of the container.
const HeaderContext = styled.div`
	padding: 1em 2em 1.5em;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	
	@media screen and ( max-width: ${ responsiveWidthThreshold } ) {
		padding: 0.5em 1em 1em;
	}
`;

// Keeps the header and by-line together.
const HeaderContainer = styled.div`
`;

const HeaderTitle = styled.h1` 
	color: ${colors.$color_white};
	font-size: 2em;
	font-weight: 400;
	margin: 0;
`;

const HeaderByline = styled.div`
	color: ${colors.$color_white};
	font-style: italic;
	font-weight: 400;
	font-size: 1.1em;
`;

// Provides air around the image and provides background color.
const HeaderImageContainer = styled.div`
	background-color: rgba( 255, 255, 255, 0.2 );
	padding: 1em;
	width: 370px;
	display: block;

	@media screen and ( max-width: ${ responsiveWidthThreshold } ) {
		display: none;
	}
`;

const HeaderImage = styled.div`
	background: url( ${props => props.src} ) no-repeat center center;
	background-size: contain;
	width: 100%;
	height: 100%;
`;

const HeaderDescription = styled.p`
	margin-top: 1em;
	margin-bottom: 0;
	font-size: 1em;
	font-weight: 200;
	letter-spacing: 0.05em;
	color: ${colors.$color_white};
`;

/**
 * Creates the Subscription Header component
 *
 * @param {Object} props Passed properties.
 * @returns {ReactElement} The rendered component.
 * @constructor
 */
export default function SubscriptionHeader( props ) {
	// Only add the image and container if provided.
	let image = props.image ? <HeaderImageContainer><HeaderImage src={ props.image }/></HeaderImageContainer> : "";
	let byline = props.byline ? <HeaderByline>{ props.byline }</HeaderByline> : "";

	return (
		<SubscriptionHeaderContainer>
			{ image }
			<HeaderContext>
				<HeaderContainer>
					<HeaderTitle>{ props.name }</HeaderTitle>
					{ byline }
				</HeaderContainer>
				<HeaderDescription>{ props.description }</HeaderDescription>
			</HeaderContext>
		</SubscriptionHeaderContainer>
	);
}

SubscriptionHeader.propTypes = {
	name: React.PropTypes.string.isRequired,
	image: React.PropTypes.string,
	byline: React.PropTypes.string,
	description: React.PropTypes.string,
};

SubscriptionHeader.defaultProps = {
	image: "",
	byline: "",
	desciption: "",
};
