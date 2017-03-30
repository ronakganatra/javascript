import React from "react";
import styled from "styled-components";
import { Column } from "./Tables";
import colors from "yoast-components/style-guide/colors.json";

const ColumnIconStyle = styled( Column )`
	height: 60px;
	border-right: 2px solid ${colors.$color_grey};
	padding-right: 1em;
	margin-right: 1em;
	
	@media screen and ( max-width: 1355px ) {
		flex: 0 0 68px;
	}
`;

/**
 * Returns the rendered ColumnIconStyle component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ColumnIconStyle component.
 * @constructor
 */
export default function ColumnIcon( props ) {
	return (
		<ColumnIconStyle>
			{props.subscriptionLogo}
		</ColumnIconStyle>
	);
}

ColumnIcon.propTypes = {
	subscriptionLogo: React.PropTypes.object.isRequired,
};
