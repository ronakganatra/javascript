import styled from "styled-components";
import React from "react";
import { getUserId, getAccessToken } from "../functions/auth";

let Info = styled.div`
	position: fixed;
	top: 10px;
	right: 10px;
	background: white;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	padding: 10px;
`;

/**
 * Some info to help debugging
 *
 * @returns {ReactElement} The element.
 */
export default function DebugInfo() {
	if ( process.env.NODE_ENV !== "development" ) {
		return null;
	}

	return <Info>
		Some helpful information
		<br />
		User ID: {getUserId()}
		<br />
		Access Token: {getAccessToken()}
	</Info>;
}
