import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import MyYoastColors from "../config/colors.json";
import Link from "./Link";
import angleLeft from "../icons/angle-left.svg";
import chevronRight from "../icons/chevron-right.svg";
import questionCircle from "../icons/question-circle.svg";
import closeCross from "../icons/times.svg";
import defaults from "../config/defaults.json";

const buttonAnimations = `
	transition: background-color 150ms ease-out;

	&:hover,
	&:focus {
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 100px rgba( 0, 0, 0, 0.1 );
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

// Button style archetypes.
const ButtonArchetype = styled.button`
	height: 48px;
	margin: 0;
	// Buttons don't need vertical padding.
	padding: 0 16px;
	border: 0;
	background-color: ${ props => props.enabledStyle ? colors.$color_green_medium_light : colors.$color_grey_disabled };
	color: ${ colors.$color_white };
	box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
	filter: drop-shadow(0 2px 4px rgb(0,0,0,0.2));
	border-radius: 4px;
	font: 700 14px/24px "Open Sans", sans-serif;
	cursor: pointer;
	vertical-align: top;

	${ buttonAnimations };
`;

ButtonArchetype.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.string,
	enabledStyle: PropTypes.bool,
};

ButtonArchetype.defaultProps = {
	type: "button",
	enabledStyle: true,
};

export const IconButtonArchetype = styled( ButtonArchetype )`
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-position: 8px 50%;
	background-size: ${ props => props.iconSize };
	padding-left: 36px;
`;

IconButtonArchetype.propTypes = {
	iconSource: PropTypes.string.isRequired,
	iconSize: PropTypes.string,
	enabledStyle: PropTypes.bool,
};

IconButtonArchetype.defaultProps = {
	iconSize: "24px",
	enabledStyle: true,
};

// Styled ButtonArchetypes.
export const Button = styled( ButtonArchetype )`
	text-shadow: 0px 0px 2px #000;
`;

export const RedButton = styled( ButtonArchetype )`
	background-color: ${ colors.$color_red };
	min-width: 152px;
`;

export const LargeSecondaryButton = styled( ButtonArchetype )`
	color: ${ colors.$color_black };
	background-color: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_black };
	min-width: 152px;
	box-shadow: none;
	filter: none;

	&:hover,
	&:focus {
		background-color: ${ colors.$color_green_medium_light };
		color: ${ colors.$color_white };
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		border: 0;
		text-shadow: 0px 0px 2px #000;
	}
`;

// Styled Buttons.
export const LargeButton = styled( Button )`
	min-width: 152px;
`;

export const SecondaryGreyButton = styled( Button )`
	text-shadow: none;
	color: ${ colors.$color_black };
	background-color: ${ colors.$color_grey_light };
	font: 100 13px "Open Sans",sans-serif;
`;

export const TextButton = styled( Button )`
	width: ${ props => props.buttonWidth };
`;

TextButton.propTypes = {
	buttonWidth: PropTypes.string,
	enabledStyle: PropTypes.bool,
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

	&:hover,
	&:focus {
		left: 0;
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
	}

	@media screen and ( max-width: 1024px ) {
		display: none;
	}
`;

BeaconButton.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.string,
	"aria-label": PropTypes.string,
};

BeaconButton.defaultProps = {
	type: "button",
};

export const ChevronButton = styled( Button )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${ chevronRight } );
	background-position: center;
	background-size: 24px;
	width:  48px;
	height: 48px;
	cursor: pointer;
	box-shadow: none;
	border: 0;
`;

ChevronButton.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.string,
	"aria-label": PropTypes.string,
};

ChevronButton.defaultProps = {
	type: "button",
};

// Styled IconButtonArchetypes.
export const IconButtonTransparent = styled( IconButtonArchetype )`
	background-color: transparent;
	background-position: 0.5em 50%;
	color: ${ colors.$color_blue };
	box-shadow: none;
	text-transform: none;
	height: 32px;
	padding-left: 2em;
	border: 0;
	font-weight: 400;
	filter:none;

	transition: background-color 150ms ease-out;

	&:hover,
	&:focus {
		box-shadow: none;
		background-color: ${ colors.$color_grey_light };
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

export const CloseButtonTopRight = styled( IconButtonArchetype )`
	background-color: transparent;
	background-position: 50%;
	padding-left: 0px;
	height: 32px;
	width: 32px;
	border-bottom: none;
	box-shadow: none;
	display: inline-block;

	&:hover,
	&:focus {
		box-shadow: none;
		background-color: transparent;
		opacity: .5;
	}
`;

CloseButtonTopRight.defaultProps = {
	iconSource: closeCross,
	iconSize: "24px",
};

export const MobileHeaderButton = styled( IconButtonArchetype )`
	background-color: transparent;
	box-shadow: none;
	display: block;
	position: fixed;
	border: 0;

	&:hover,
	&:focus {
		box-shadow: none;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		text-indent: -9999em;
		box-shadow: none;
	}
`;

export const IconButton = styled( IconButtonArchetype )`
	text-shadow: 0px 0px 2px #000;
`;

// Styled IconButtons.
export const LargeIconButton = styled( IconButton )`
	min-width: 152px;
`;

// Button styled as a link.
export const LinkButton = styled.button`
	background: none;
	border: 0px;
	padding: 0;

	color: ${ colors.$color_blue };
	text-decoration: underline;
	font-weight: bold;
	cursor: pointer;

	:hover {
		color: ${ colors.$color_pink_hover };
	}
`;

// Styled ButtonLinks.
export const ButtonLink = styled( Link )`
	display: inline-block;
	height: 48px;
	padding: 12px 16px;
	background-color: ${ props => props.enabledStyle ? colors.$color_green_medium_light : colors.$color_grey_disabled };
	color: ${ colors.$color_white };
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	vertical-align: top;
	// line height 24 + padding 12 + 12 = 48
	font: 700 14px/24px "Open Sans", sans-serif;
	text-decoration: none;
	text-align: center;
	text-shadow: 0px 0px 2px #000;
	border-bottom: 4px solid rgba(0,0,0,0.2);

	&:hover,
	&:focus {
		color: ${ colors.$color_white };
	}

	${ buttonAnimations }
`;

ButtonLink.propTypes = {
	to: PropTypes.string.isRequired,
	enabledStyle: PropTypes.bool,
};

ButtonLink.defaultProps = {
	enabledStyle: true,
};

export const LargeSecondaryButtonLink = styled( ButtonLink )`
	color: ${ colors.$color_black };
	background-color: ${ colors.$color_white };
	border: 1px solid ${ colors.$color_black };
	min-width: 152px;
	box-shadow: none;
	filter: none;

	text-shadow: none;

	&:hover,
	&:focus {
		background-color: ${ colors.$color_green_medium_light };
		color: ${ colors.$color_white };
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		border: 0;
		text-shadow: 0px 0px 2px #000;
	}
`;

export const ChevronButtonLink = styled( ButtonLink )`
	background-color: transparent;
	background-repeat: no-repeat;
	background-image: url( ${ chevronRight } );
	background-position: center;
	background-size: 24px;
	width:  48px;
	height: 48px;
	cursor: pointer;
	box-shadow: none;
	border: 0;
`;

ChevronButtonLink.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.string,
	"aria-label": PropTypes.string,
};

ChevronButtonLink.defaultProps = {
	type: "button",
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

IconButtonLink.propTypes = {
	iconSource: PropTypes.string.isRequired,
	iconSize: PropTypes.string,
	enabledStyle: PropTypes.bool,
};

IconButtonLink.defaultProps = {
	iconSize: "24px",
	enabledStyle: true,
};

export const LargeIconButtonLink = styled( IconButtonLink )`
	min-width: 152px;
`;

export const BackButtonLink = styled( LargeIconButtonLink )`
`;

BackButtonLink.defaultProps = {
	iconSource: angleLeft,
	enabledStyle: true,
	iconSize: "24px",
};

export const YellowCaretLink = styled( LargeIconButtonLink )`
	background-color: ${ MyYoastColors.$button_dark_yellow };
	color: #000;
	text-shadow: none;
	background-position: calc( 100% - 8px ) 50%;
	padding: 12px 36px 12px 16px;
	box-shadow: inset 0 -4px rgba(0,0,0,0.2);
	border: 0;

	&:hover, &:focus {
		background-color: ${ MyYoastColors.$button_dark_yellow_hover };
		color: #000;
	}
`;

export const TextButtonLink = styled( ButtonLink )`
	width: ${ props => props.buttonWidth };
`;

TextButtonLink.propTypes = {
	buttonWidth: PropTypes.string,
};

TextButtonLink.defaultProps = {
	buttonWidth: "auto",
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

IconRightButtonLink.propTypes = {
	iconSource: PropTypes.string.isRequired,
};

export const IconButtonTransparentLink = styled( IconButtonLink )`
	border: 0;
	cursor: pointer;
	background-color: transparent;
	background-position: 0.5em 50%;
	color: ${ colors.$color_blue };
	box-shadow: none;
	text-transform: none;
	padding-left: 2em;
	font: 400 14px/24px "Open Sans", sans-serif;
	text-shadow: none;
	height: 32px;
	padding: 4px 16px 0 2em;

	transition: background-color 150ms ease-out;

	&:hover,
	&:focus {
		box-shadow: none;
		background-color: ${ colors.$color_grey_light };
		color: ${ colors.$color_blue };
	}

	&:active {
		transform: translateY( 1px );
		box-shadow: none;
	}
`;

// Style related functions.

/**
 * Returns a disabled button component for the given component.
 *
 * @param {React.Component} Button The button.
 * @returns {React.Component} The disabled button.
 */
export function disable( Button ) {
	const StyledDisabledButton = styled( Button )`
		background-color: ${ colors.$color_grey_disabled };
		cursor: default;

		&:hover,
		&:focus {
			box-shadow: none;
		}

		&:active {
			transform: none;
		}
	`;

	return class DisabledButton extends Component {
		/**
		 * Renders the component.
		 *
		 * @returns {ReactElement} The rendered component.
		 */
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
 * Makes an icon button display only the icon in the intermediate responsive view.
 *
 * @param {ReactElement} component The original button.
 * @returns {ReactElement} The button with icon only.
 */
export function makeResponsiveIconButton( component ) {
	return styled( component )`
		.screen-reader-text {
			position: static;
			clip-path: none;
		}

		&& {
			@media screen and (min-width: ${ defaults.css.breakpoint.mobile + 1 }px) and (max-width: ${ defaults.css.breakpoint.tablet }px) {
				padding-right: 0;
				padding-left: 42px;
				min-width: 0;
				vertical-align: middle;
	
				.screen-reader-text {
					position: absolute;
					clip: rect(1px, 1px, 1px, 1px);
					clip-path: inset(50%);
				}
			}
		}
	`;
}
