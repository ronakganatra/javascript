import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

import angleRight from "../icons/angle-right.svg";

/**
 * Default object for rendering a button.
 *
 * @param {Object}   props         The properties to use.
 * @param {string}   props.type    The button type.
 * @param {function} props.onClick The onclick event.
 * @param {string}   props.value   The button value.
 * @returns {XML} The rendered button.
 * @constructor
 */
export default function DefaultButton( props ) {
	return <button type={props.type} onClick={props.onClick}>{props.value}</button>;
}

DefaultButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
	value: React.PropTypes.string.isRequired
};

DefaultButton.defaultProps = {
	type: "button",
	onClick: () => {},
};

export const Button = styled(DefaultButton)`
	background-color: ${colors.$color_blue};
	color: ${colors.$color_white};
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	font-size: 14px;
	text-transform: uppercase;
	padding: 15px;
	border: 0;
`;

export const LargeButton = styled(Button)`
	font-size: 16px;
	padding: 20px 40px 20px 20px;
	background-image: url( ${angleRight} );
	background-size: 40px;
	background-position: center right;
	background-repeat: no-repeat;
`;

export const GreenButton = styled(Button)`
	background-color: ${colors.$color_green};
`;
