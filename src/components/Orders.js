import PropTypes from "prop-types";
import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import Paper from "./Paper";

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
			return <Order
				{ ...order }
				refunds={ props.refunds }
				onInvoicesClick={ props.onInvoicesClick }
				onInvoicesClose={ props.onInvoicesClose }
				invoices={ props.invoices }
				key={ order.id }
			/>;
		} ) }
	</ListTable>;

	if ( props.hasPaper ) {
		return <Paper>{ ordersTable }</Paper>;
	}

	return ordersTable;
}

Orders.propTypes = {
	orders: PropTypes.array,
	refunds: PropTypes.array,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	hasPaper: PropTypes.bool,
	invoices: PropTypes.shape( {
		invoicesModalIsOpen: PropTypes.bool,
		invoicesModalOrderId: PropTypes.string,
		error: PropTypes.object,
	} ),
};

Orders.defaultProps = {
	orders: [],
	refunds: [],
	hasPaper: true,
};
