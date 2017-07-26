import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

export const GeneralMessage = styled.div`
	padding: 0.5em;
	padding-left: ${ props => props.iconPadding ? "0" : "0.5em" };
	background-color: ${ colors.$color_yellow };
	margin: 0.5em 0;
	overflow: auto;
	display: flex;
	align-items: center;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		flex-direction: column;
		text-align: left;
	}
`;

export const WarningMessage = styled.div`
	background-color: ${ colors.$color_yellow };
`;

export const ErrorMessage = styled.div`
	background-color: ${ colors.$color_red };
`;

export const NoActiveProductIcon = styled.img`
	width: 15%;
	height: 10%;
	padding: 20px;
	min-width: 75px;
	display: flex;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		padding: 10px;
	}
`;

export const WarningText = styled.span`
	font-size: 1em;
`;

export const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

