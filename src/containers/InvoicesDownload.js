/* External dependencies */
import { connect } from "react-redux";
import _filter from "lodash/filter";
import _sortBy from "lodash/sortBy";

/* Internal dependencies */
import { closeInvoicesModal, openInvoicesModal } from "../actions/invoices";
import InvoiceButtonArea from "../components/account/orders/InvoiceButtonArea";
import { getOrdersById } from "../selectors/entities/orders";
import { getRefundsById } from "../selectors/entities/refunds";
import { getInvoicesModalError, getInvoicesModalOrderId, isInvoicesModalOpen } from "../selectors/ui/invoicesModal";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state, ownProps ) => {
	const orderId = ownProps.orderId;

	// Filter orders for the orderId passed to the container.
	const order = getOrdersById( state )[ orderId ];
	const refundsForThisOrder = _filter( getRefundsById( state ), refund => refund.orderId === orderId );

	let invoices = [ {
		orderId: order.id,
		refundId: "",
		date: order.date,
		type: "Invoice",
		totalAmount: order.totalAmount,
		currency: order.currency,
		invoiceNumber: order.invoiceNumber,
	} ];

	invoices = invoices.concat( refundsForThisOrder.map( ( refund ) => ( {
		orderId: refund.orderId,
		refundId: refund.id,
		date: refund.date,
		type: "Credit note",
		totalAmount: refund.amount,
		currency: order.currency,
		invoiceLink: "",
	} ) ) );

	invoices = _sortBy( invoices, "date" );

	const hasMultipleInvoices = invoices.length > 1;

	// Only show invoices for completed orders and refunds??? May not be needed depending on final data structure.
	const invoiceModalProps = {
		invoicesModalIsOpen: isInvoicesModalOpen( state ),
		invoicesModalOrderId: getInvoicesModalOrderId( state ),
		error: getInvoicesModalError( state ),
	};

	// The ownProps parameter is also returned, implicitly. So the props contain orderId, for example.
	return {
		invoices,
		hasMultipleInvoices,
		invoiceModalProps,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onInvoicesClick: ( orderId ) => {
			dispatch( openInvoicesModal( orderId ) );
		},
		onInvoicesClose: () => {
			dispatch( closeInvoicesModal() );
		},
	};
};

const InvoicesDownloadContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( InvoiceButtonArea );

export default InvoicesDownloadContainer;
