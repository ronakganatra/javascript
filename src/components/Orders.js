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
	return (
		<Paper>
			<ListTable hasHeaderLabels={ true }>
				{ props.orders.map( ( order ) => {
					let invoiceURI = props.getInvoiceURI( order.id );

					return <Order { ...order }
								  key={ order.id }
								  invoiceLink={ invoiceURI }
					/>;
				} ) }
			</ListTable>
		</Paper>
	);
}

Orders.propTypes = {
	getInvoiceURI: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
};

Orders.defaultProps = {
	orders: [],
};
