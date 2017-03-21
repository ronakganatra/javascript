import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

export const Button = styled.button`
	height: 48px;
	padding: 0 15px;
	border: 0;
	background-color: ${colors.$color_blue};
	color: ${colors.$color_white};
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	font-size: 14px;
	text-transform: uppercase;
	cursor: pointer;
`;

Button.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
};

Button.defaultProps = {
	type: "button",
};

export const LargeButton = styled( Button )`
	min-width: 150px;
`;

export const GreenButton = styled( Button )`
	background-color: ${colors.$color_green};
`;

export const TextButton = styled( Button )`
	width: ${ props => props.buttonWidth };
	height: 40px;
	margin: 5px 0px 5px 10px;
	border-radius: 8px;
`;

TextButton.PropTypes = {
	buttonWidth: React.PropTypes.string,
};

TextButton.defaultProps = {
	buttonWidth: "auto",
};

export const WhiteButton = styled( Button )`
	color: ${colors.$color_blue};
	background-color: ${colors.$color_white};
`;
