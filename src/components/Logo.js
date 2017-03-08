import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";

/**
 * Random.
 *
 * @param {Object} props Array size of the logo.
 * @returns {XML} Logo
 * @constructor
 */
export default function Logo( props ) {
	return (
		<header role="banner" >
			<LogoImage src={logo} size={props.size}/>
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
	margin: 10px auto;
`;

LogoImage.propTypes = {
	size: React.PropTypes.string,
};

LogoImage.defaultProps = {
	size: "200px",
};
