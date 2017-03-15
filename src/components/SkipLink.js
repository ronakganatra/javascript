import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const SkipLink = styled.a`
	position: absolute;
	top: -1000em;
	left: 10px;
	z-index: 100000;
	display: block;
	height: 48px;
	min-width: 150px;
	padding: 0 15px;
	font-size: 14px;
	line-height: 48px;
	background: ${colors.$color_white};
	color: ${colors.$color_blue};
	border-radius: 3px;
	box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
	text-decoration: underline;
	text-align: center;
	outline: none;

	&:focus {
		top: 10px;
	}
`;

SkipLink.propTypes = {
	href: React.PropTypes.string.isRequired,
};

SkipLink.defaultProps = {
	href: "#content",
};

export default SkipLink;
