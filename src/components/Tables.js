import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

export const Zebra = styled.ul`
	margin: ${ props => props.hasHeaderLabels ? "60px" : "0" } 0 0 0;
 	padding: 0;
 	list-style: none;
 	position: relative;
 	width: 100%;

 	li:first-child {
		& span::before {
			left: auto;
		}
	}
`;

Zebra.propTypes = {
	children: React.PropTypes.any,
	hasHeaderLabels: React.PropTypes.bool,
};

Zebra.defaultProps = {
	hasHeaderLabels: true,
};

// The Rows are flex containers.
export const Row = styled.li`
	background: ${ props => props.background };
	min-height: 100px;
	display: flex;
	padding: 26px 40px;
	align-items: center;
	justify-content: space-between;

	@media screen and ( max-width: 1355px ) {
		padding: 26px 24px;
	}

	@media screen and ( max-width: 800px ) {
		padding: 16px 18px;
	}
`;

Row.propTypes = {
	background: React.PropTypes.string,
};

Row.defaultProps = {
	background: colors.$color_white,
};

/*
 * The "Columns" are flex-items, their "flex" property is the initial `0 1 auto`
 * that translates to: cannot grow, can shrink, initial width based on the content.
 * It can be changed on a case by case basis either wrapping the Columns in a
 * styled component or using className where applicable.
 */
export const Column = styled.span`
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

	@media screen and ( max-width: 1355px ) {
		padding-left: 20px;
		${ props => props.hideOnTablet ? "display: none;" : "" }
	}

	@media screen and ( max-width: 800px ) {
		${ props => props.hideOnMobile ? "display: none;" : "" }
	}
`;

Column.propTypes = {
	children: React.PropTypes.any,
	hideOnMobile: React.PropTypes.bool,
	hideOnTablet: React.PropTypes.bool,
	separator: React.PropTypes.bool,
	headerLabel: React.PropTypes.string,
};

Column.defaultProps = {
	hideOnMobile: false,
	hideOnTable: false,
	separator: false,
};

export const ColumnText = styled( Column )`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const ColumnIcon = styled( Column )`
	flex: 0 0 auto;
	height: 60px;

	@media screen and ( max-width: 800px ) {
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

	@media screen and ( max-width: 1355px ) {
		&::after {
			padding-right: 24px;
		}
	}

	@media screen and ( max-width: 800px ) {
		&::after {
			height: 48px;
			padding-right: 18px;
		}
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
