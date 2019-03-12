import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

/**
 * Separatifies an element.
 *
 * @returns {String} CSS
 */
export function separatify() {
	return `
		&::after {
			position:relative;
			display: inline-block;
			border-right: 2px solid ${ colors.$color_grey };
			padding-right: 24px;
			height: 48px;
			content: "";
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			&::after {
				padding-right: 16px;
			}
		}
	`;
}

/**
 * Make an element text nowrap and add ellipsis.
 *
 * @returns {String} CSS
 */
export function ellipsify() {
	return `
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	`;
}

/**
 * Makes an element full-width in the mobile responsive view.
 *
 * @param {ReactElement} component The original element.
 * @returns {ReactElement} The element with full width responsive style.
 */
export function makeFullWidth( component ) {
	return styled( component )`
		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			min-width: 100%;
			margin-top: 1em;
			padding-right: 0;
			padding-left: 0;

			&:first-child {
				margin-top: 0px;
			}
		}
	`;
}

/**
 * Makes columns use headers as bold labels with a colon in the mobile responsive view.
 *
 * @param {ReactElement} column The original column.
 * @returns {ReactElement} The column with transformed headers.
 */
export function responsiveHeaders( column ) {
	return styled( column )`
		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			&::before {
				float: left;
				min-width: 60px;
				line-height: inherit;
				font-weight: 700;
				${ props => props.headerLabel ? `content: "${props.headerLabel}:";` : "content: none;" }
			}

			> span {
				line-height: inherit;
			}
		}
	`;
}

export const Zebra = styled.ul`
 	padding: 0;
 	list-style: none;
 	position: relative;
 	width: 100%;

 	li:first-child {
		& > span::before {
			left: auto;
		}
	}
`;

Zebra.propTypes = {
	children: PropTypes.any,
};

// The Rows are flex containers.
export const Row = styled.li`
	background: ${ props => props.background };
	display: flex;
	padding: 16px 24px;
	align-items: ${ props => props.verticalAlign };
	justify-content: space-between;

	&:first-child {
		margin-top: ${ props => props.hasHeaderLabels ? "64px" : "0" };
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 16px;
	}
`;

Row.propTypes = {
	background: PropTypes.string,
	hasHeaderLabels: PropTypes.bool,
	verticalAlign: PropTypes.string,
};

Row.defaultProps = {
	background: colors.$color_white,
	hasHeaderLabels: true,
	verticalAlign: "center",
};

/*
 * A responsive row allows children to wrap in new lines in the responsive view.
 * If the columns have headers, they're displayed as labels inside the column
 * content.
 */
export const RowMobileCollapse = styled( Row )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		flex-wrap: wrap;
		align-items: flex-start;

		&:first-child {
			margin-top: ${ props => props.hasHeaderLabels ? "24px" : "0" };
		}

		// Use the column headers (if any) as labels.
		& > span::before {
			position: static;
			display: inline-block;
			padding-right: 0.5em;
			font-size: inherit;
		}
	}
`;

export const CompactRow = styled( RowMobileCollapse )`
	min-height: 0;
	padding-top: 8px;
	padding-bottom: 8px;
`;

/*
 * The "Columns" are flex-items, their "flex" property is the initial `0 1 auto`
 * that translates to: cannot grow, can shrink, initial width based on the content.
 * A column can be changed on a case by case basis wrapping the Columns in a
 * styled component.
 */
const ColumnBase = styled.span`
	${ props => props.minWidth && "min-width: " + props.minWidth };
	font-size: 14px;
	padding-left: 40px;

	&:first-child {
		padding-left: 0;
	}

	&::before {
 		position: absolute;
 		left: -9999em;
 		top: -24px;
 		font-size: 1.286em;
 		line-height: 0;
 		${ props => props.headerLabel ? `content: "${props.headerLabel}";` : "content: none;" }
 	}

 	${ props => props.separator ? separatify() : "" }

	${ props => props.ellipsis ? ellipsify() : "" }

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding-left: 20px;
		${ props => props.hideOnTablet ? "display: none;" : "" }
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		${ props => props.hideOnMobile ? "display: none;" : "" }
	}
`;

ColumnBase.propTypes = {
	children: PropTypes.any,
	hideOnMobile: PropTypes.bool,
	hideOnTablet: PropTypes.bool,
	separator: PropTypes.bool,
	headerLabel: PropTypes.string,
	ellipsis: PropTypes.bool,
	minWidth: PropTypes.string,
};

ColumnBase.defaultProps = {
	hideOnMobile: false,
	hideOnTable: false,
	separator: false,
	ellipsis: false,
};

/*
 * Primary column, the largest one in a row: can grow, cannot shrink, and the
 * initial width is 200 pixels. In the responsive view, can shrink.
 */
export const ColumnPrimary = styled( ColumnBase )`
	flex: 1 0 200px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		flex-shrink: 1;
	}
`;

/*
 * Column with fixed width: cannot grow, cannot shrink, and the width based on
 * its content.
 */
export const ColumnFixedWidth = styled( ColumnBase )`
	flex: 0 0 auto;
	
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		${ props => props.paddingLeft && "padding-left: 0px;" }
	}
`;

ColumnFixedWidth.propTypes = {
	paddingLeft: PropTypes.string,
};

/*
 * Column with a minimum width: can grow, cannot shrink, and the initial width
 * is 100 pixels.
 */
export const ColumnMinWidth = styled( ColumnBase )`
	flex: 1 0 100px;
`;

/*
 * Column with icon: cannot grow, cannot shrink, and the width is fixed based on
 * its content. The height is smaller in the responsive view because icons are
 * smaller.
 */
export const ColumnIcon = styled( ColumnFixedWidth )`
	height: 48px;
`;

/**
 * Returns the rendered ListTable component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ListTable component.
 * @constructor
 */
export function ListTable( props ) {
	const zebraProps = Object.assign( {}, props );
	let children = props.children;

	// Children could be one object or a list of objects.
	if ( ! children.map ) {
		children = [ children ];
	}

	// Don't output an empty list.
	if ( ! children.length ) {
		return null;
	}

	let firstColor = colors.$color_white;
	let secondColor = colors.$color_background_light;
	if ( props.invertZebra ) {
		firstColor = secondColor;
		secondColor = colors.$color_white;
	}

	// Do zebra striping background if props.doZebra is true (default).
	if ( props.doZebra ) {
		zebraProps.children = children.map( ( child, index ) => {
			return React.cloneElement( child, {
				background: ( index % 2 === 1 ) ? secondColor : firstColor,
			} );
		} );
	}

	return (
		<Zebra role="list" { ...zebraProps } />
	);
}

ListTable.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node,
	] ),
	doZebra: PropTypes.bool,
	invertZebra: PropTypes.bool,
};

ListTable.defaultProps = {
	doZebra: true,
	invertZebra: false,
	children: [],
};
