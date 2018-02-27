import colors from "yoast-components/style-guide/colors.json";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaults from "../config/defaults.json";
import dropDownChevron from "../icons/drop-down-chevron.svg";

export const InputField = styled.input`
	box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3);
	background: ${ colors.$color_white };
	border: 0;
	padding: 0 0 0 10px;
	font-size: 1em;
	font-family: "Open Sans", sans-serif;
	height: ${ defaults.css.inputField.height };
	width: ${ props => props.width };
`;

InputField.propTypes = {
	width: PropTypes.string,
};

InputField.defaultProps = {
	width: "100%",
};

export const DropDown = styled.select`
	width: 100%;
	padding: 16px;
	border: none;
	box-shadow: none;
	background: transparent;
	background-image: none;
	appearance: none;

	&:focus {
		outline: none;
	}
`;

export const YoastSelect = styled.span`
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	width: 100%;
	border-radius: 0;
	overflow: hidden;
	background: ${ colors.$color_white } url( ${ dropDownChevron } ) no-repeat 99% 50%;
`;
