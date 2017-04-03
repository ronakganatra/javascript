import styled from "styled-components";
import { Column } from "./Tables";

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
	text-align: center;

	& img {
		margin: 0 auto;
	}

	box-sizing: border-box;
	
	@media screen and ( max-width: 800px ) {
		height: 48px;
		flex: 0 0 ${ props => props.ColumnWidth };
	}
`;
