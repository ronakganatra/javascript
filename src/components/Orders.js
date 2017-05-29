import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import Paper from "./Paper";
import { getInvoiceUrl } from "../functions/api";

/**
 * Returns the rendered Orders component.
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
export default function Orders( props ) {
	let ordersTable = <ListTable { ...props }>
		{ props.orders.map( ( order ) => {
			let invoiceURI = getInvoiceUrl( order.id );

			return <Order
				{ ...order }
				key={ order.id }
				invoiceLink={ invoiceURI }
			/>;
		} ) }
	</ListTable>;

	if ( props.hasPaper ) {
		return <Paper>{ ordersTable }</Paper>;
	}

	return ordersTable;
}

Orders.propTypes = {
	orders: React.PropTypes.array,
	hasPaper: React.PropTypes.bool,
};

Orders.defaultProps = {
	orders: [],
	hasPaper: true,
};
