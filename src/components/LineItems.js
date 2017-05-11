import React from "react";
import styled from "styled-components";

const Block = styled.span`
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
`;

/**
 * LineItems.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of LineItems.
 */
function LineItems( props ) {
	let items = props.items.map( ( item ) => {
		return <Block key={ item.id }>{ item.productName }</Block>;
	} );
	return <Block>{ items }</Block>;
}

LineItems.propTypes = {
	items: React.PropTypes.array,
};

LineItems.defaultProps = {
	items: "",
};

export default LineItems;
