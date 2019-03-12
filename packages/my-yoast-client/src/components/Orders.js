import PropTypes from "prop-types";
import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";
import defaults from "../config/defaults.json";
import styled from "styled-components";

const OrdersPaper = styled( Paper )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		margin-top: 12px;
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
	const ordersTable = <ListTable { ...props }>
		{ props.orders.map( ( order ) => {
			return <Order
				{ ...order }
				key={ order.id }
			/>;
		} ) }
	</ListTable>;

	if ( props.hasPaper ) {
		return <OrdersPaper>{ ordersTable }</OrdersPaper>;
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
