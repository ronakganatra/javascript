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
	flex: 0 0 ${ props => props.ColumnWidth };

	& img {
		margin: 0 auto;
	}

	// We need to make sure flex values are not overridden.
	@media screen and ( max-width: 1355px ) {
		flex: 0 0 ${ props => props.ColumnWidth };
	}

	@media screen and ( max-width: 800px ) {
		flex: 0 0 ${ props => props.ColumnWidth };
		height: 48px;
	}
`;
