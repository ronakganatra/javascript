import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";

/**
 * @param {Object} props Component props.
 * @param {String} props.size The width of the prop, and therefore the size.
 * @returns {ReactElement} A react component describing the logo component.
 * @constructor
 */
export default function Logo( props ) {
	return (
		<header role="banner">
			<LogoImage src={ logo } size={ props.size } alt="My Yoast"/>
		</header>
	);
}

Logo.propTypes = {
	size: React.PropTypes.string,
};

Logo.defaultProps = {
	size: "200px",
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
