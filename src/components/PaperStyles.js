import styled from "styled-components";
import defaults from "../config/defaults.json";
import colors from "yoast-components/style-guide/colors.json";

export const Paper = styled.div`
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
`;

export const Page = styled.div`
	padding: 2em;
	background-color: ${ colors.$color_white };
	display: flex;
	justify-content: space-between;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}
`;
