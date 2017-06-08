import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Link from "./Link";
import angleLeft from "../icons/angle-left.svg";
import chevronRight from "../icons/chevron-right.svg";
import questionCircle from "../icons/question-circle.svg";
import defaults from "../config/defaults.json";

let buttonAnimations = `
	transition: background 150ms ease-out;

	&:focus,
	&:hover {
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 100px rgba( 0, 0, 0, 0.1 );
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

export const Button = styled.button`
	height: 48px;
	margin: 0;
	// Buttons don't need vertical padding.
	padding: 0 16px;
	border: 0;
	background-color: ${ props => props.enabledStyle ? colors.$color_green_medium_light : colors.$color_grey_disabled };
	color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	font: 400 14px/24px "Open Sans", sans-serif;
	text-transform: uppercase;
	cursor: pointer;

	${ buttonAnimations };
`;

Button.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
	enabledStyle: React.PropTypes.bool,
};

Button.defaultProps = {
	type: "button",
	enabledStyle: true,
};

export const LargeButton = styled( Button )`
	min-width: 152px;
`;

export const LargeSecondaryButton = styled( LargeButton )`
	color: ${ colors.$color_black };
	box-shadow: none;
	background-color: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_black };
	
	&:focus,
	&:hover {
		background-color: ${ colors.$color_green_medium_light };
		color: ${ colors.$color_white };
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
		border: none;
	}
`;

export const TextButton = styled( Button )`
	width: ${ props => props.buttonWidth };
`;

TextButton.PropTypes = {
	buttonWidth: React.PropTypes.string,
	enabledStyle: React.PropTypes.bool,
};

TextButton.defaultProps = {
	buttonWidth: "auto",
	enabledStyle: true,
};

export const LogoutButton = styled( Button )`
	border-radius: 3px;
	height: 36px;
	width: 112px;
	padding: 0;
`;

export const IconButton = styled( Button )`
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-position: 16px 50%;
	background-size: ${ props => props.iconSize };
	padding-left: 56px;
`;

IconButton.PropTypes = {
	iconSource: React.PropTypes.string.isRequired,
	iconSize: React.PropTypes.string,
	enabledStyle: React.PropTypes.bool,
};

IconButton.defaultProps = {
	iconSize: "24px",
	enabledStyle: true,
};

export const MobileHeaderButton = styled( IconButton )`
	background-color: transparent;
	box-shadow: none;
	display: block;
	position: fixed;

	&:hover {
		box-shadow: none;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		text-indent: -9999em;
		box-shadow: none;
	}
`;

export const LargeIconButton = styled( IconButton )`
	min-width: 152px;
`;

export const IconButtonTransparent = styled( IconButton )`
	background-color: transparent;
	background-position: 0.5em 50%;
	color: ${ colors.$color_blue };
	box-shadow: none;
	text-transform: none;
	height: 32px;
	padding-left: 2em;

	transition: background 150ms ease-out;

	&:focus,
	&:hover {
		box-shadow: none;
		background-color: ${ colors.$color_grey_light };
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

export const WhiteButton = styled( LargeButton )`
	color: ${ colors.$color_blue };
	background-color: ${ colors.$color_white };
`;

export const RedButton = styled( LargeButton )`
	background-color: ${ colors.$color_red };
`;

export const ButtonLink = styled( Link )`
	display: inline-block;
	height: 48px;
	padding: 12px 16px;
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	// line height 24 + padding 12 + 12 = 48
	font: 400 14px/24px "Open Sans", sans-serif;
	text-transform: uppercase;
	text-decoration: none;
	text-align: center;

	${ buttonAnimations }
`;

ButtonLink.PropTypes = {
	to: React.PropTypes.string.isRequired,
};

export const LargeButtonLink = styled( ButtonLink )`
	min-width: 152px;
`;

export const IconButtonLink = styled( ButtonLink )`
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-position: 8px 50%;
	background-size: ${ props => props.iconSize };
	padding-left: 36px;
`;

IconButtonLink.PropTypes = {
	iconSource: React.PropTypes.string.isRequired,
	iconSize: React.PropTypes.string,
	enabledStyle: React.PropTypes.bool,
};

IconButtonLink.defaultProps = {
	iconSize: "24px",
	enabledStyle: true,
};

export const LargeIconButtonLink = styled( IconButtonLink )`
	min-width: 152px;
`;

export const BackButtonLink = styled( LargeIconButtonLink )`
	background-image: url( ${ angleLeft } );
`;

export const TextButtonLink = styled( ButtonLink )`
	width: ${ props => props.buttonWidth };
`;

TextButtonLink.PropTypes = {
	buttonWidth: React.PropTypes.string,
};

TextButtonLink.defaultProps = {
	buttonWidth: "auto",
};

export const ChevronButton = styled( Button )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${ chevronRight } );
	background-position: center;
	background-size: 32px;
	width:  48px;
	height: 48px;
	cursor: pointer;
	box-shadow: none;
`;

ChevronButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
	"aria-label": React.PropTypes.string,
};

ChevronButton.defaultProps = {
	type: "button",
	"aria-label": "",
};

export const BeaconButton = styled( Button )`
	border-radius: 0;
	height: 36px;
	width: 152px;
	font-size: 16px;
	cursor: pointer;
	position: fixed;
	z-index: 1;
	left: -112px;
	top: 85%;
	color: ${ colors.$color_white };
	background-color: ${ colors.$color_green_medium_light };
	z-index: 1;
	padding-right: 40px;
	background-repeat: no-repeat;
	background-image: url( ${ questionCircle } );
	background-position: right 8px center;
	background-size: 24px;
	transition: left .5s ease-in;
	text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);

	&:focus,
	&:hover {
		left: 0;
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
	}

	@media screen and ( max-width: 1024px ) {
		display: none;
	}
`;

BeaconButton.propTypes = {
	onClick: React.PropTypes.func,
	type: React.PropTypes.string,
	"aria-label": React.PropTypes.string,
};

BeaconButton.defaultProps = {
	type: "button",
	"aria-label": "",
};

export const IconRightButtonLink = styled( ButtonLink )`
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-position: right 16px center;
	background-size: 24px;
	// 8px grid: 16 left background position + 24 icon size + 16 = 56
	padding-left: 16px;
	padding-right: 56px;
`;

IconRightButtonLink.PropTypes = {
	iconSource: React.PropTypes.string.isRequired,
};

export const WhiteButtonLink = styled( LargeButtonLink )`
	background-color: ${ colors.$color_white };
	color: ${ colors.$color_blue };
`;

/**
 * Returns a disabled button component for the given component.
 *
 * @param {React.Component} Button The button.
 * @returns {React.Component} The disabled button.
 */
export function disable( Button ) {
	let StyledDisabledButton = styled( Button )`
		background-color: ${ colors.$color_grey_disabled };
		cursor: default;

		&:focus,
		&:hover {
			box-shadow: none;
		}

		&:active {
			transform: none;
		}
	`;

	return class DisabledButton extends Component {
		render() {
			return <StyledDisabledButton disabled="disabled" { ...this.props } />;
		}
	};
}

/**
 * Makes a button full width in the mobile responsive view.
 *
 * @param {ReactElement} component The original button.
 * @returns {ReactElement} The button with full width responsive style.
 */
export function makeButtonFullWidth( component ) {
	return styled( component )`
		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			width: 100%;
			background-image: none;
			padding: 12px 16px;
		}
	`;
}

/**
 * Makes an icon button display only the icon in the intermdiate responsive view.
 *
 * @param {ReactElement} component The original button.
 * @returns {ReactElement} The button with icon only.
 */
export function makeResponsiveIconButton( component ) {
	return styled( component )`
		.screen-reader-text {
			position: static;
		}

		@media screen and (min-width: ${ defaults.css.breakpoint.mobile + 1 }px) and (max-width: ${ defaults.css.breakpoint.tablet }px) {
			padding-right: 0;
			padding-left: 42px;

			.screen-reader-text {
				position: absolute;
			}
		}
	`;
}
