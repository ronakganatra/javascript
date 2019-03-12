import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";
import PropTypes from "prop-types";

export const GeneralMessage = styled.div`
	padding: 1em;
	background-color: ${ colors.$color_yellow };
	margin: 0.5em 0 0 0;
	overflow: auto;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile } ) {
		flex-direction: column;
		text-align: left;
	}
`;

export const WarningMessage = styled( GeneralMessage )`
	background-color: ${ colors.$color_yellow };
`;

export const ErrorMessage = styled( GeneralMessage )`
	background-color: ${ colors.$color_error_message };
`;

export const MessageIcon = styled.span`
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: ${ props => props.iconSize };
	background-image: url( ${ props => props.iconSource } );
	height: ${ props => props.iconSize };
	min-width: ${ props => props.iconSize };
	margin: 0 1em;
`;

MessageIcon.propTypes = {
	iconSource: PropTypes.string.isRequired,
	iconSize: PropTypes.string,
};

MessageIcon.defaultProps = {
	iconSize: "2em",
};

export const PurpleLink = styled.a`
	color: ${ colors.$color_purple };
`;

