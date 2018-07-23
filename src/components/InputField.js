import colors from "yoast-components/style-guide/colors.json";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaults from "../config/defaults.json";

export const InputField = styled.input`
	box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3);
	background: ${ colors.$color_white };
	border: 0;
	padding: 0 0 0 10px;
	font-size: 1em;
	font-family: "Open Sans", sans-serif;
	height: ${ defaults.css.inputField.height };
	width: ${ props => props.inputWidth };
`;

InputField.propTypes = {
	inputWidth: PropTypes.string,
};

InputField.defaultProps = {
	inputWidth: "100%",
};
