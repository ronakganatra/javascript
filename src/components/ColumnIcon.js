import React from "react";
import styled from "styled-components";
import { Column } from "./Tables";

const ColumnIconStyle = styled(Column)`
	height: 60px;
	line-height: 60px;
	display: inline-flex;
	align-items: center;
	flex: 1 0 300px;
	
	@media screen and ( max-width: 1355px ) {
		display: none;
	}
`;

/**
 * Returns the rendered ColumnIcon component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ColumnIcon component.
 * @constructor
 */
export default function ColumnIcon( props ) {
	return (
		<ColumnIconStyle>
			{props.icon}
		</ColumnIconStyle>
	);
}

ColumnIcon.propTypes = {
	icon: React.PropTypes.object.isRequired,
};
