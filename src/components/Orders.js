import React from "react";
import Order from "./Order";
import { injectIntl, intlShape } from "react-intl";
import { Table, Zebra } from "./Tables";
import Paper from "./Paper";

/**
 * Creates Page Order container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
function Orders( props ) {
	return (
		<Table headings={true} role="list">
			<Paper>
				<Zebra>
					{ props.orders.map( ( order ) => {
						return <Order { ...order }
									  key={ order.productId }
									  onClickInvoice={ props.onClickInvoice }
						/>;
					} ) }
				</Zebra>
			</Paper>
		</Table>
	);
}

Orders.propTypes = {
	onClickInvoice: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	orders: React.PropTypes.array,
};

Orders.defaultProps = {
	orders: [],
};

export default injectIntl( Orders );
