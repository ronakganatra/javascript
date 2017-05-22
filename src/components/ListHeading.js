import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

export const ListHeading = styled.h2`
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
