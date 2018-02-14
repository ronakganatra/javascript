import PropTypes from "prop-types";
import _filter from "lodash/filter";
import React from "react";
import { ListTable } from "../../Tables";
import Paper from "../../Paper";

/**
 * Returns the rendered InvoicesModal component.
 *
 * @returns {ReactElement} The rendered InvoicesModal component.
 */
export class InvoicesModal extends React.Component {
	/**
	 * Sets the InvoicesModal object.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}


	getRefunds( orderId, refunds ) {
		return _filter( refunds, { orderId: orderId } );
	}

	render() {
		let currentOrder = _filter( this.props.orders, { id: this.props.invoicesModalOrderId } );
		let invoicesTable = <ListTable { ...this.props }>
			{ currentOrder.map( () => {
				return <span>
					test
				</span>;
			} ) }
		</ListTable>;

		if ( this.props.hasPaper ) {
			return <Paper>{ invoicesTable }</Paper>;
		}

		return invoicesTable;
	}
}


InvoicesModal.propTypes = {
	orders: PropTypes.array,
	refunds: PropTypes.array,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoicesModalOrderId: PropTypes.string,
	hasPaper: PropTypes.bool,
};

InvoicesModal.defaultProps = {
	orders: [],
	refunds: [],
	hasPaper: true,
};
