import React from "react";

import styled from "styled-components";

import colors from "yoast-components/style-guide/colors.json";

import angleLeft from "../icons/angle-left.svg";
import chevronRight from "../icons/chevron-right.svg";
import plus from "../icons/plus.svg";

export const RoundButton = styled.button`
	background-color: ${colors.$color_green_medium_light};
	background-repeat: no-repeat;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border: 0;
	border-radius: 100%;
	background-size: 30px;
	width:  40px;
	height: 40px;
	cursor: pointer;
`;

RoundButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
	"aria-label": React.PropTypes.string,
};

RoundButton.defaultProps = {
	type: "button",
	"aria-label": "",
};

export const RoundBackButton = styled( RoundButton )`
	background-image: url( ${angleLeft} );
	background-position: 4px center;
`;

RoundBackButton.defaultProps = {
	"aria-label": "Back",
};

export const RoundAddButton = styled( RoundButton )`
	background-image: url( ${plus} );
	background-position: center;
	background-size: 20px;
`;

RoundAddButton.defaultProps = {
	"aria-label": "Add",
};

export const ChevronButton = styled( RoundButton )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${chevronRight} );
	background-position: center;
	background-size: 24px;
	box-shadow: none;
`;
