import React from "react";
import styled from "styled-components";

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

const RowStyle = styled.li`
	background: ${props => props.background};
`;

RowStyle.propTypes = {
	background: React.PropTypes.string,
};

RowStyle.defaultProps = {
	background: "none",
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

const ColumnStyle = styled.li`
	padding: 2em;
	flex: 1 100%;
`;

const DescriptiveColumnStyle = styled.li`
	font-weight: 700;
	padding: 0.5em 2em;
	flex: 1 100%;
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

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export function Row( props ) {
	console.log( props );
	return (
		<RowStyle { ...props }>
			{props.children}
		</RowStyle>
	);
}

Row.propTypes = {
	children: React.PropTypes.objectOf( Columns ).isRequired,
};

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

/**
 * Returns the rendered Column component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Column component.
 * @constructor
 */
export function Column( props ) {
	return (
		<ColumnStyle>
			test{props.children}
		</ColumnStyle>
	);
}

Column.propTypes = {
	children: React.PropTypes.array,
};

Column.defaultProps = {
	children: [],
};

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
