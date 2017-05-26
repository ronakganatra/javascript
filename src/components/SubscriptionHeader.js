import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

const SubscriptionHeaderContainer = styled.div`
	width: 100%;
	min-height: 180px;
	background-color: ${ colors.$palette_pink_dark }
	display: flex;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		min-height: 0;
	}
`;

// Places the description at the bottom of the container.
const HeaderContext = styled.div`
	padding: 2em 1.5em 2em 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 1em;
	}
`;

const HeaderTitle = styled.h1`
	color: ${ colors.$color_white };
	font-size: 2em;
	line-height: 1.25;
	font-weight: 400;
	margin: 0;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		font-size: 1em;
	}
`;

const HeaderByline = styled.p`
	margin: 0;
	color: ${ colors.$color_white };
	font-style: italic;
	font-weight: 400;
	font-size: 1.1em;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		margin-top: 0.5em;
		font-size: 0.875em;
	}
`;

// Provides air around the image and provides background color.
const HeaderImageContainer = styled.div`
	padding: 2em 1.5em;
	width: 180px;
	display: block;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
`;

const HeaderImage = styled.div`
	background: url( ${ props => props.src } ) no-repeat center center;
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
	color: ${ colors.$color_white };
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: none;
	}
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
				<HeaderTitle>{ props.name }</HeaderTitle>
				{ byline }
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
