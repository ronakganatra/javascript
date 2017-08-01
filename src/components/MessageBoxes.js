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
	justify-content: flex-start;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		flex-direction: column;
		text-align: left;
	}
`;

export const WarningMessage = styled( GeneralMessage )`
	background-color: ${ colors.$color_yellow };
`;

export const ErrorMessage = styled( GeneralMessage )`
	background-color: ${ colors.$color_error };
`;

export const MessageIcon = styled.img`
	// Added min-height and width to make sure the images are always the same size.
	min-width: 80px;
	min-height: 80px;
	max-width: 15%;
	max-height: 10%;
	padding: 20px;
	min-width: 75px;
	display: flex;
	fill: red;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		padding: 10px;
	}
`;

export const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

