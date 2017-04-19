import React from "react";
import CollapsibleHeader from "./CollapsibleHeader";
import Order from "./Order";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { Table, Zebra } from "./Tables";
import Paper from "./Paper";

const messages = defineMessages( {
	manageOrder: {
		id: "order.overview.title",
		defaultMessage: "Manage orders",
	},
} );

/**
 * Creates Page Order container element
 *
 * @param {object} props Properties for this element.
 * @returns {ReactElement} PageOrderList element.
 * @constructor
 */
function Orders( props ) {
	return (
		<CollapsibleHeader title={ props.intl.formatMessage( messages.manageOrder ) } items={ props.orders } isOpen={ true }>
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
		</CollapsibleHeader>
	);
}

Orders.propTypes = {
	orders: React.PropTypes.array,
	onClickInvoice: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

Orders.defaultProps = {
	orders: [],
};

export default injectIntl( Orders );
