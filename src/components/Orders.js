import PropTypes from "prop-types";
import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import styled from "styled-components";
import Paper from "./Paper";
import { getInvoiceUrl } from "../functions/api";

const ListTableOrder = styled( ListTable )`

	@media screen and ( max-width: 800px ) {
		
	}
`;

/**
 * Returns the rendered Orders component.
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
export default function Orders( props ) {
	let ordersTable = <ListTableOrder { ...props }>
		{ props.orders.map( ( order ) => {
			let invoiceURI = getInvoiceUrl( order.id );

			return <Order
				{ ...order }
				key={ order.id }
				invoiceLink={ invoiceURI }
			/>;
		} ) }
	</ListTableOrder>;

	if ( props.hasPaper ) {
		return <Paper>{ ordersTable }</Paper>;
	}

	return ordersTable;
}

Orders.propTypes = {
	orders: PropTypes.array,
	hasPaper: PropTypes.bool,
};

Orders.defaultProps = {
	orders: [],
	hasPaper: true,
};
