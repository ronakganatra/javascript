import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import defaults from "../config/defaults.json";

const ItemsContainer = styled.ul`
	padding: 0;
	list-style: none;
	flex-shrink: 0;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		overflow: hidden;
	}
`;

/**
 * LineItems.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of LineItems.
 */
function LineItems( props ) {
	const items = props.items.map( ( item ) => {
		return <li key={ item.id }>{ item.quantity }<span aria-hidden="true">&times;</span> { item.productName }</li>;
	} );
	return <ItemsContainer>{ items }</ItemsContainer>;
}

LineItems.propTypes = {
	items: PropTypes.array,
};

LineItems.defaultProps = {
	items: [],
};

export default LineItems;
