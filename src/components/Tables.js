import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

/**
 * Returns the rendered Column component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Column component.
 * @constructor
 */
export const Column = styled.span`
	font-size: 14px;
	padding-left: 40px;
	
	text-align: ${ props => props.textAlign };

	&::before {
 		position: absolute;
 		left: -9999em;
 		top: -30px;
 		font-size: 1.286em;
 		line-height: 0;
 		content: "${ props => props.label }";
 	}
 	
 	${ props => props.separator ? separatify() : "" }
	
	flex: 0 0 ${ props => props.ColumnWidth };
	@media screen and ( max-width: 1355px ) {
		padding-left: 20px;
		flex: 1 0 ${ props => props.ColumnWidth };
		${ props => props.hideOnTablet ? "display: none;" : "" }
	}
	@media screen and ( max-width: 800px ) {
		&:first-child {
			padding-left: 20px;
 	    }
 	    padding-left: 10px;
		flex: 1 1 ${ props => props.ColumnWidth };
		${ props => props.hideOnMobile ? "display: none;" : "" }
	}
`;

Column.propTypes = {
	children: React.PropTypes.any,
	ColumnWidth: React.PropTypes.string,
	label: React.PropTypes.string,
	hideOnMobile: React.PropTypes.bool,
	hideOnTablet: React.PropTypes.bool,
	textAlign: React.PropTypes.string,
	separator: React.PropTypes.bool,
};

Column.defaultProps = {
	ColumnWidth: "auto",
	label: "",
	hideOnMobile: false,
	hideOnTable: false,
	textAlign: "left",
	separator: false,
};


/**
 * Separatifies an element
 *
 * @returns {String} CSS
 */
export function separatify() {
	return `
	&::after {
		position:relative;
		display: inline-block;
		border-right: 2px solid ${colors.$color_grey};
		padding-right: 40px;
		height: 60px;
		content: "";
	}
	

	@media screen and ( max-width: 800px ) {
		&::after {
			padding-right: 10px;
			height: 48px;
		}
	}
	`;
}

export const ColumnText = styled( Column )`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

/**
 * Returns the rendered Row component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Row component.
 * @constructor
 */
export const Row = styled.li`
	background: ${ props => props.background };
	
	min-height: 100px;
	display: flex;
	padding-right: 40px;
	align-items: center;
	justify-content: space-around;
	
	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
		padding-right: 20px;
	}
`;

Row.propTypes = {
	background: React.PropTypes.string,
};

Row.defaultProps = {
	background: "none",
};

/**
 * Returns the rendered Table component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Table component.
 * @constructor
 */
export const Table = styled.ul`
	margin: ${ props => props.headings ? "60px" : "0" } 0 0 0;
 	padding: 0;
 	list-style: none;
 	position: relative;
 	width: 100%;
 	
 	li:first-child {
        & *::before {
            left: auto;
        }
    }
`;

Table.propTypes = {
	children: React.PropTypes.any,
	headings: React.PropTypes.bool,
};

Table.defaultProps = {
	headings: true,
};

/**
 * Returns the rendered Zebra component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Zebra component.
 * @constructor
 */
export function Zebra( props ) {
	let zebraProps = Object.assign( {}, props );
	let children = props.children;

	// Children could be one object or a list of objects.
	if ( ! children.map ) {
		children = [ children ];
	}

	zebraProps.children = children.map( ( child, key ) => {
		return React.cloneElement( child, {
			background: ( key % 2 === 0 ) ? colors.$palette_white : colors.$palette_grey_light,
		} );
	} );

	return (
		<span { ...zebraProps }/>
	);
}

Zebra.propTypes = {
	children: React.PropTypes.oneOfType( [
		React.PropTypes.arrayOf( React.PropTypes.node ),
		React.PropTypes.node,
	] ),
};
