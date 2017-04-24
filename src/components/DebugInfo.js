import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import React from "react";
import { getUserId, getAccessToken } from "../functions/auth";

let Info = styled.div`
	margin: 4em 1em 1em 1.5em;
	background: white;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	padding: 2.5em 0 0;
	width: 250px;
	position: relative;
`;

let InfoContent = styled.div`
	overflow: auto;
	padding: 1em;
`;

let InfoTitle = styled.div`
	padding: 0.5em 1em;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	background-color: ${ colors.$color_purple_dark };
	color: white;
	font-weight: 500;
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
		<InfoTitle>DEBUG</InfoTitle>
		<InfoContent>
		User ID: {getUserId()}
		<br />
		Access Token: {getAccessToken()}
		</InfoContent>
	</Info>;
}
