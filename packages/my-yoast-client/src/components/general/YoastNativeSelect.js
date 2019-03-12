import React from "react";
import PropTypes from "prop-types";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";

const SelectContainer = styled.span`
	display: inline-flex;
	align-items: center;
	position: relative;
	width: 100%;

	&::after,
	&::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		pointer-events: none;
	}

	&::before {
		width: 32px;
		right: 0;
	}

	&::after {
		width: 0;
		height: 0;
		border: 5px solid transparent;
		border-top: 5px solid ${ colors.$color_grey_dark };
		border-bottom-width: 0;
		margin: auto;
		right: 11px;
		z-index: 1;
	}
`;

const StyledSelect = styled.select`
	width: 100%;
	height: 48px;
	box-sizing: border-box;
	padding: 8px 32px 8px 8px;
	max-width: 100%;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
	appearance: none;
	background: transparent;
	border: 1px solid ${ colors.$color_grey_medium };
	border-radius: 0;
	line-height: 1;
	color: ${ colors.$color_grey_dark };

	&:focus {
		outline: none;
		border-color: ${ colors.$color_green_medium_light };
	}

	/* Reset Firefox selected option inner outline */
	&:-moz-focusring {
		color: transparent;
		text-shadow: 0 0 0 ${ colors.$color_grey_dark };
	}

	&[disabled] {
		opacity: .75;
	}

	/* Remove background focus style from IE11 while keeping focus style available on option elements. */
	&::-ms-value {
		background: transparent;
	}

	/* Remove the default down arrow in IE/Edge. */
	&::-ms-expand {
		display: none;
	}
`;

/**
 * Returns the rendered YoastNativeSelect component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered YoastNativeSelect component.
 */
function YoastNativeSelect( props ) {
	return (
		<SelectContainer>
			<StyledSelect
				id={ props.selectId }
				name={ props.selectName }
				defaultValue={ props.selectDefaultValue }
				onBlur={ props.selectOnBlur }
				disabled={ props.selectDisabled }
			>
				{ props.children }
			</StyledSelect>
		</SelectContainer>
	);
}

YoastNativeSelect.propTypes = {
	selectId: PropTypes.string.isRequired,
	selectName: PropTypes.string.isRequired,
	selectDefaultValue: PropTypes.string,
	selectOnBlur: PropTypes.func.isRequired,
	selectDisabled: PropTypes.bool,
	children: PropTypes.any.isRequired,
};

YoastNativeSelect.defaultProps = {
	selectDefaultValue: "",
	selectDisabled: false,
};

export default YoastNativeSelect;
