import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import defaults from "../config/defaults.json";

export const Zebra = styled.ul`
	margin: 0;
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
	children: React.PropTypes.any,
};

// The Rows are flex containers.
export const Row = styled.li`
	background: ${ props => props.background };
	min-height: 100px;
	display: flex;
	padding: 24px 40px;
	align-items: center;
	justify-content: space-between;

	&:first-child {
		margin-top: ${ props => props.hasHeaderLabels ? "60px" : "0" };
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding: 24px;
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding: 16px;
	}
`;

Row.propTypes = {
	background: React.PropTypes.string,
	hasHeaderLabels: React.PropTypes.bool,
};

Row.defaultProps = {
	background: colors.$color_white,
	hasHeaderLabels: true,
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

/*
 * The "Columns" are flex-items, their "flex" property is the initial `0 1 auto`
 * that translates to: cannot grow, can shrink, initial width based on the content.
 * A column can be changed on a case by case basis wrapping the Columns in a
 * styled component.
 */
const ColumnBase = styled.span`
	font-size: 14px;
	padding-left: 40px;

	&:first-child {
		padding-left: 0;
	}

	&::before {
 		position: absolute;
 		left: -9999em;
 		top: -30px;
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
	children: React.PropTypes.any,
	hideOnMobile: React.PropTypes.bool,
	hideOnTablet: React.PropTypes.bool,
	separator: React.PropTypes.bool,
	headerLabel: React.PropTypes.string,
	ellipsis: React.PropTypes.bool,
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
`;

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
	height: 60px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		height: 48px;
	}
`;

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
			padding-right: 40px;
			height: 60px;
			content: "";
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
			&::after {
				padding-right: 24px;
			}
		}

		@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
			&::after {
				height: 48px;
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
			padding: 0;
		}
	`;
}

/**
 * Returns the rendered ListTable component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ListTable component.
 * @constructor
 */
export function ListTable( props ) {
	let zebraProps = Object.assign( {}, props );
	let children = props.children;

	// Children could be one object or a list of objects.
	if ( ! children.map ) {
		children = [ children ];
	}

	// Don't output an empty list.
	if ( ! children.length ) {
		return null;
	}

	// Do zebra striping background if props.doZebra is true (default).
	if ( props.doZebra ) {
		zebraProps.children = children.map( ( child, index ) => {
			return React.cloneElement( child, {
				background: ( index % 2 === 1 ) ? colors.$color_white : colors.$color_grey_light,
			} );
		} );
	}

	return (
		<Zebra role="list" { ...zebraProps }/>
	);
}

ListTable.propTypes = {
	children: React.PropTypes.oneOfType( [
		React.PropTypes.arrayOf( React.PropTypes.node ),
		React.PropTypes.node,
	] ),
	doZebra: React.PropTypes.bool,
};

ListTable.defaultProps = {
	doZebra: true,
};
