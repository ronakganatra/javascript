import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

import angleRight from "../icons/angle-right.svg";

export const Button = styled.button`
	background-color: ${colors.$color_blue};
	color: ${colors.$color_white};
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	font-size: 14px;
	text-transform: uppercase;
	padding: 15px;
	border: 0;
`;

Button.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
};

Button.defaultProps = {
	type: "button",
};

export const LargeButton = styled( Button )`
	font-size: 16px;
	padding: 20px 40px 20px 20px;
	background-image: url( ${angleRight} );
	background-size: 40px;
	background-position: center right;
	background-repeat: no-repeat;
`;

export const GreenButton = styled( Button )`
	background-color: ${colors.$color_green};
`;
