import { connect } from "react-redux";
import { closeInvoicesModal, openInvoicesModal } from "../actions/invoices";
import _filter from "lodash/filter";
import _sortBy from "lodash/sortBy";
import InvoiceButtonArea from "../components/account/orders/InvoiceButtonArea";

export const mapStateToProps = ( state, ownProps ) => {
	// Filter orders for the orderId passed to the container.
	const order = state.entities.orders.byId[ ownProps.orderId ];

	const refundsForThisOrder = _filter( state.entities.refunds.byId, ( refund ) => {
		return refund.orderId === ownProps.orderId;
	} );

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
		invoicesModalIsOpen: state.ui.invoiceModal.invoicesModalIsOpen,
		invoicesModalOrderId: state.ui.invoiceModal.invoicesModalOrderId,
		error: state.ui.invoiceModal.error,
	};

	// The ownProps parameter is also returned, implicitly. So the props contain orderId, for example.
	return {
		invoices,
		hasMultipleInvoices,
		invoiceModalProps,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
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
