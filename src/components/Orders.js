import React from "react";
import Order from "./Order";
import { Table, Zebra } from "./Tables";
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
		<Table headings={true} role="list">
			<Paper>
				<Zebra>
					{ props.orders.map( ( order ) => {
						let onInvoiceManager = () => {
							props.onClickInvoice( order.id );
						};

						return <Order { ...order }
									  key={ order.productId }
									  onClickInvoice={ onInvoiceManager }
						/>;
					} ) }
				</Zebra>
			</Paper>
		</Table>
	);
}

Orders.propTypes = {
	onClickInvoice: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
};

Orders.defaultProps = {
	orders: [],
};
