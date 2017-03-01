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
`;

export const RoundBackButton = styled(RoundButton)`
	background-image: url( ${angleLeft} );
	background-position: 4px center;
	background-size: 30px;
	border-radius: 40px;
	width:  40px;
	height: 40px;
`;

export const RoundAddButton = styled(RoundButton)`
	background-image: url( ${plus} );
	background-position: center;
	background-size: 25px;
	border-radius: 60px;
	width:  60px;
	height: 60px;
`;

RoundButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
};

RoundButton.defaultProps = {
	type: "button",
};