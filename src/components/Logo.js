import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";

export const Logo = styled.div`
	height: ${props => props.divHeight};
	width: ${props => props.divWidth};
	background: url( ${logo} ) center center no-repeat;
	background-size: ${props => props.logoSize};
`;

Logo.propTypes = {
	logoSize: React.PropTypes.string,
	divWidth: React.PropTypes.string,
	divHeight: React.PropTypes.string,
};

Logo.defaultProps = {
	logoSize: "175px",
	divHeight: "90px",
	divWidth: "300px",
};

export default Logo;
