import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";

/**
 * @param {Object} props Component props.
 * @param {String} props.size The width of the prop, and therefore the size.
 * @param {String} props.alt The alternative text to show for the logo.
 * @returns {ReactElement} A react component describing the logo component for the header
 * @constructor
 */
export function HeaderLogo( props ) {
	return (
		<header role="banner">
			<Logo size={ props.size } alt={ props.alt }/>
		</header>
	);
}

HeaderLogo.propTypes = {
	size: React.PropTypes.string,
	alt: React.PropTypes.string,
};

HeaderLogo.defaultProps = {
	size: "200px",
	alt: "My Yoast home",
};

/**
 * @param {Object} props Component props.
 * @param {String} props.size The width of the prop.
 * @param {String} props.alt The alternative text to show for the logo.
 * @returns {ReactElement} A react component describing the logo component.
 * @constructor
 */
export function Logo( props ) {
	return (
		<LogoImage src={ logo } size={ props.size } alt={ props.alt }/>
	);
}

Logo.propTypes = {
	size: React.PropTypes.string,
	alt: React.PropTypes.string,
};

Logo.defaultProps = {
	size: "200px",
	alt: "My Yoast home",
};

const LogoImage = styled.img`
	width: ${ props => props.size };
	display: block;
	margin: 30px auto 25px auto;
`;

LogoImage.propTypes = {
	size: React.PropTypes.string,
};

LogoImage.defaultProps = {
	size: "200px",
};
