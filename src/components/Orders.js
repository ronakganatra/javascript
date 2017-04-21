import React from "react";
import Order from "./Order";
import { Table } from "./Tables";
import Paper from "./Paper";

/**
 * Creates Page Order container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
export default function Orders( props ) {
	return (
		<Paper>
			<Table hasHeaderLabels={ true }>
				{ props.orders.map( ( order ) => {
					return <Order { ...order }
								  key={ order.productId }
								  onClickInvoice={ props.onClickInvoice }
					/>;
				} ) }
			</Table>
		</Paper>
	);
}

Orders.propTypes = {
	onClickInvoice: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
};

Orders.defaultProps = {
	orders: [],
};
