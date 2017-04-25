import React from "react";
import Order from "./Order";
import { ListTable } from "./Tables";
import Paper from "./Paper";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";

const messages = defineMessages( {
	ordersPageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account orders page loaded",
	},
} );

/**
 * Creates Page Order container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
class Orders extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.ordersPageLoaded );
		a11ySpeak( message );
	}

	render() {
		return (
			<Paper>
				<ListTable hasHeaderLabels={ true }>
					{ this.props.orders.map( ( order ) => {
						let onInvoiceManager = () => {
							this.props.onClickInvoice( order.id );
						};

						return <Order { ...order }
									  key={ order.productId }
									  onClickInvoice={ onInvoiceManager }
						/>;
					} ) }
				</ListTable>
			</Paper>
		);
	}
}

export default injectIntl( Orders );

Orders.propTypes = {
	onClickInvoice: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
	intl: intlShape.isRequired,
};

Orders.defaultProps = {
	orders: [],
};
