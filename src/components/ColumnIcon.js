import styled from "styled-components";
import { Column } from "./Tables";
import colors from "yoast-components/style-guide/colors.json";

/**
 * Returns the rendered ColumnIcon component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ColumnIcon component.
 * @constructor
 */
export const ColumnIcon = styled( Column )`
	height: 60px;
	border-right: 2px solid ${colors.$color_grey};
	text-align: center;
	padding-right: 40px;

	& img {
		margin: 0 auto;
	}

	box-sizing: border-box;
	
	@media screen and ( max-width: 1355px ) {
		padding-right: 20px;
	}
`;
