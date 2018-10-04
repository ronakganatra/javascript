import PropTypes from "prop-types";
import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";

/**
 * Returns the rendered Orders component.
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
export default function Orders( props ) {
	const ordersTable = <ListTable { ...props }>
		{ props.orders.map( ( order ) => {
			return <Order
				{ ...order }
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
	hasPaper: PropTypes.bool,
};

Orders.defaultProps = {
	orders: [],
	hasPaper: true,
};
