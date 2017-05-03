import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

export const Button = styled.button`
	height: 48px;
	padding: 0 15px;
	border: 0;
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	font-size: 14px;
	font-family: "Open Sans";
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
	background-color: ${ colors.$color_green_medium_light };
`;

export const TextButton = styled( Button )`
	width: ${ props => props.buttonWidth };
	height: 40px;
	margin: 5px 0px 5px 10px;
`;

TextButton.PropTypes = {
	buttonWidth: React.PropTypes.string,
};

TextButton.defaultProps = {
	buttonWidth: "auto",
};

export const LogoutButton = styled( Button )`
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
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
	border-radius: 3px;
	color: ${ colors.$color_white };
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
	color: ${ colors.$color_white };
	background-color: ${ colors.$color_red };
`;

export const ButtonLink = styled.a`
	display: inline-block;
	height: 48px;
	line-height: 48px;
	padding: 0 15px;
	background-color: ${ colors.$color_green_medium_light };
	color: ${ colors.$color_white };
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	font-size: 14px;
	font-family: "Open Sans";
	text-transform: uppercase;
	text-decoration: none;
	text-align: center;
`;

ButtonLink.PropTypes = {
	href: React.PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {
	href: "/",
};

export const LargeButtonLink = styled( ButtonLink )`
	min-width: 150px;
`;

export const GreenButtonLink = styled( ButtonLink )`
	background-color: ${ colors.$color_green_medium_light };
`;

export const TextButtonLink = styled( ButtonLink )`
	width: ${ props => props.buttonWidth };
	height: 40px;
	line-height: 40px;
	margin: 5px 0px 5px 10px;
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
	border-radius: 3px;
	color: ${ colors.$color_white };
	padding: 0 20px 0 64px;
`;

IconButtonLink.PropTypes = {
	iconSource: React.PropTypes.string.isRequired,
};

export const WhiteButtonLink = styled( LargeButtonLink )`
	color: ${ colors.$color_blue };
	background-color: ${ colors.$color_white };
`;

/**
 * Returns a disabled button component for the given component.
 *
 * @param {React.Component} Button The button.
 * @returns {React.Component} The disabled button.
 */
export function disable( Button ) {
	let StyledDisabledButton = styled( Button )`
		background-color: ${ colors.$color_grey_disabled }
	`;

	return class DisabledButton extends Component {
		render() {
			return <StyledDisabledButton disabled="disabled" {...this.props} />;
		}
	};
}
