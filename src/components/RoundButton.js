import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import angleLeft from "../icons/angle-left.svg";
import chevronRight from "../icons/chevron-right.svg";
import plus from "../icons/plus.svg";
import Link from "./Link";

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

const RoundButtonFeedback = styled( RoundButton )`
	transition: background 150ms ease-out;

	&:focus,
	&:hover {
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 100px rgba( 255, 255, 255, 0.1 );
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

export const RoundBackButton = styled( RoundButtonFeedback )`
	background-image: url( ${angleLeft} );
	background-position: 3px 4px;
`;

RoundBackButton.defaultProps = {
	"aria-label": "Back",
};

export const RoundAddButton = styled( RoundButtonFeedback )`
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

// Standard button links.
export const RoundButtonLink = styled( Link )`
	display: inline-block;
	background-color: ${colors.$color_green_medium_light};
	background-repeat: no-repeat;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 100%;
	background-size: 30px;
	width:  40px;
	height: 40px;
	line-height: 40px;
	text-decoration: none;
`;

RoundButtonLink.propTypes = {
	href: React.PropTypes.string.isRequired,
};

RoundButtonLink.defaultProps = {
	href: "/",
};

const RoundButtonLinkFeedback = styled( RoundButtonLink )`
	transition: background 150ms ease-out;

	&:focus,
	&:hover {
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 100px rgba( 255, 255, 255, 0.1 );
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

export const RoundBackButtonLink = styled( RoundButtonLinkFeedback )`
	background-image: url( ${angleLeft} );
	background-position: 3px 4px;
`;

export const ChevronButtonLink = styled( RoundButtonLink )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${chevronRight} );
	background-position: center;
	background-size: 24px;
	box-shadow: none;
`;

// React Router button links.
export const RoundButtonRouteLink = styled( Link )`
	display: inline-block;
	background-color: ${colors.$color_green_medium_light};
	background-repeat: no-repeat;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	border-radius: 100%;
	background-size: 30px;
	width:  40px;
	height: 40px;
	line-height: 40px;
	text-decoration: none;
`;

RoundButtonRouteLink.propTypes = {
	to: React.PropTypes.string,
};

export const RoundBackButtonRouteLink = styled( RoundButtonRouteLink )`
	background-image: url( ${angleLeft} );
	background-position: 3px 4px;
`;

export const ChevronButtonRouteLink = styled( RoundButtonRouteLink )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${chevronRight} );
	background-position: center;
	background-size: 24px;
	box-shadow: none;
`;
