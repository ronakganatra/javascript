import React  from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";

import check from "../icons/check.svg";

const CheckboxWrapper = styled.div`
	position: relative;
	
	/* Checks our custom check mark. */
	input:checked ~ .checkmark {
		/* Dark pink background and white check mark */ 
		background-color: ${ colors.$color_pink_dark };
		background-image: url( ${ check } );
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75%;
	}

	/* Adds an outline to the check mark on focus. */
	input:focus ~ .checkmark {
		outline: -webkit-focus-ring-color auto 5px;
	}
`;

const Label = styled.label`
	display: block;
	position: relative;
	cursor: pointer;

	padding-left: 35px;
	
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

`;

const CheckboxInput = styled.input`
	position: absolute;
	opacity: 0;
	cursor: pointer;
`;

const Checkmark = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	
	:hover {
		background-color: ${ colors.$color_grey_hover }
	};
		
	box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3);
	background-color: ${ colors.$color_background_light };
`;

/**
 * Custom Yoast-styled checkbox input component.
 * (Since default checkbox element cannot be easily styled with CSS).
 */
class Checkbox extends React.Component {
	render() {
		return (
			<CheckboxWrapper>
				<Label htmlFor={ this.props.id }>
					{ this.props.children }
				</Label>
				<CheckboxInput id={ this.props.id }
				               onChange={ this.props.onCheck }
				               checked={ this.props.checked }
				               type="checkbox"/>
				<Checkmark className="checkmark"/>
			</CheckboxWrapper>
		);
	}
}

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.any,
	onCheck: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	labelMessage: PropTypes.object,
};

Checkbox.defaultProps = {
	children: [],
};

export default Checkbox;
