import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

export const ListHeading = styled.span`
	display: block;
	font-size: 1em;
	padding: 24px 40px;
	font-weight: 400;
	margin: 0;
	border-bottom: 1px solid ${ colors.$color_grey_medium };

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 16px;
	}
`;

export const Heading = styled.h1`
	font-weight: 700;
	font-size: 2em;
`;

export const ModalHeading = styled.h1`
	font-weight: 300;
	font-size: 1.5em;
	margin: 0;
`;

export const SubHeading = styled.h2`
	font-weight: 300;
	font-size: 1.3em;
	margin: 0;
`;
