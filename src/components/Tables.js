import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

const TableStyle = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	padding: 0;
	margin: 0;

	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
	}
`;

/**
 * Returns the rendered Table component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Table component.
 * @constructor
 */
export function Table( props ) {
	return (
		<TableStyle>
			{props.children}
		</TableStyle>
	);
}

Table.propTypes = {
	children: React.PropTypes.array || React.PropTypes.objectOf( Row ),
};

const RowStyle = styled.li`
	background: ${props => props.background};
	padding: 1em 0;
`;

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export function Row( props ) {
	return (
		<RowStyle { ...props }>
			{props.children}
		</RowStyle>
	);
}

RowStyle.propTypes = {
	background: React.PropTypes.string,
};

RowStyle.defaultProps = {
	background: "none",
};

Row.propTypes = {
	children: React.PropTypes.objectOf( Columns ).isRequired,
};

const ColumnsStyle = styled.ul`
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: stretch;
	list-style: none;
	padding: 0;
	margin: 0;
`;

/**
 * Returns the rendered Columns component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Columns component.
 * @constructor
 */
export function Columns( props ) {
	return (
		<ColumnsStyle>
			{props.children}
		</ColumnsStyle>
	);
}

Columns.propTypes = {
	children: React.PropTypes.array.isRequired,
};

const ColumnStyle = styled.li`
	padding: 1em 2em;
	flex: 1 ${ props => props.ColumnWidth };
	height: 60px;
	display: inline-flex;
	align-items: center;
	}
`;

ColumnStyle.defaultProps = {
	children: [],
};

	/**
 * Returns the rendered ColumnIcon component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Column component.
 * @constructor
 */
export function Column( props ) {
	return (
		<ColumnStyle {...props} >
			{props.children}
		</ColumnStyle>
	);
}

Column.propTypes = {
	children: React.PropTypes.array,
};

Column.defaultProps = {
	children: [],
};

const DescriptiveColumnStyle = styled( ColumnStyle )`
	font-weight: 700;
	padding: 0.5em 2em;
`;

/**
 * Returns the rendered DescriptiveRow component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export function HeadingColumn( props ) {
	return (
		<DescriptiveColumnStyle>
			{props.children}
		</DescriptiveColumnStyle>
	);
}

HeadingColumn.propTypes = {
	children: React.PropTypes.any,
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
	let zebraProps = Object.assign( {}, ...props );
	let children = props.children;

	children = typeof ( children ) === "object" ? [ children ] : children;

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
	children: React.PropTypes.array || React.PropTypes.object,
};
