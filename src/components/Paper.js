import styled from "styled-components";
import React from "react";
const PaperStyle = styled.div`
	box-shadow: 0 2px 0.8em 0 rgba(0,0,0,0.2);
`;

/**
 *
 * @param {Object} props The props to use.
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export default function Paper( props ) {
	return (
		<PaperStyle { ...props } />
	);
}
