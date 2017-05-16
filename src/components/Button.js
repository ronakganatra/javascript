import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Link from "./Link";
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
	height: 46px;
	padding: 12px 16px;
	border: 0;
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	font-size: 14px;
	font-family: "Open Sans", sans-serif;
	text-transform: uppercase;
	cursor: pointer;

	transition: background 150ms ease-out;

	${ buttonAnimations }
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

export const GreenButton = styled( Button )``;

export const TextButton = styled( Button )`
	width: ${ props => props.buttonWidth };
	margin: 0;
	background-color: ${ props => props.enabledStyle ? colors.$color_green_medium_light : colors.$color_grey_disabled };
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
	background-position: 20px 50%;
	background-size: ${ props => props.iconSize };
	margin: 0;
	padding: 0 20px 0 64px;
`;

IconButton.PropTypes = {
	iconSource: React.PropTypes.string.isRequired,
	iconSize: React.PropTypes.string,
};

IconButton.defaultProps = {
	iconSize: "24px",
};

export const WhiteButton = styled( LargeButton )`
	color: ${ colors.$color_blue };
	background-color: ${ colors.$color_white };
`;

export const RedButton = styled( LargeButton )`
	background-color: ${ colors.$color_red };
`;

export const ButtonLink = styled( Link )`
	display: inline-block;
	height: 46px;
	padding: 12px 16px;
	margin: 0;
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	font-size: 14px;
	font-family: "Open Sans", sans-serif;
	text-transform: uppercase;
	text-decoration: none;
	text-align: center;

	${ buttonAnimations }
`;

ButtonLink.PropTypes = {
	to: React.PropTypes.string.isRequired,
};

export const LargeButtonLink = styled( ButtonLink )`
	min-width: 150px;
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

export const IconButtonLink = styled( ButtonLink )`
	background-repeat: no-repeat;
	background-image: url( ${ props => props.iconSource } );
	background-position: 20px 50%;
	background-size: 24px;
	padding: 0 20px 0 64px;
`;

IconButtonLink.PropTypes = {
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
 * Makes a button full width in the small responsive view.
 *
 * @param {ReactElement} component The original button.
 * @returns {ReactElement} The button with full width responsive style.
 */
export function makeButtonFullWidth( component ) {
	return styled( component )`
		// Take into account buttons with icons and preserve other buttons that have their own min-width.
		@media screen and ( max-width: ${ defaults.css.breakpoint.medium }px ) {
			${ props => props.iconSource ? "padding: 0 20px; min-width: 64px;" : "" }
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.small }px ) {
			width: 100%;
			margin: 0;
			padding: 0 15px;
			background-image: none;
		}
	`;
}
