import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

import angleLeft from "../icons/angle-left.svg";
import plus from "../icons/plus.svg";

export const RoundButton = styled.button`
	background-color: ${colors.$color_green};
	background-repeat: no-repeat;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border: 0;
	border-radius: 100%;
	background-size: 30px;
	width:  40px;
	height: 40px;
`;

export const RoundBackButton = styled(RoundButton)`
	background-image: url( ${angleLeft} );
	background-position: 4px center;
`;

export const RoundAddButton = styled(RoundButton)`
	background-image: url( ${plus} );
	background-position: center;
	background-size: 20px;
`;

RoundButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
};

RoundButton.defaultProps = {
	type: "button",
};