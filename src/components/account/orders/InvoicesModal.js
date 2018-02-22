import PropTypes from "prop-types";
import React from "react";
import { ListTable } from "../../Tables";
import Paper from "../../Paper";
import { ModalHeading } from "../../Headings";
import { FormattedMessage } from "react-intl";
// import { capitalizeFirstLetter } from "../../../functions/stringHelpers";
// import formatAmount from "../../../../../shared/currency";

// const messages = defineMessages( {
// 	date: {
// 		id: "invoice.date",
// 		defaultMessage: "Date",
// 	},
// 	type: {
// 		id: "invoice.type",
// 		defaultMessage: "Order",
// 	},
// 	invoice: {
// 		id: "orders.overview.invoice",
// 		defaultMessage: "Invoice",
// 	},
// 	invoiceLabel: {
// 		id: "orders.overview.invoice.label",
// 		defaultMessage: "Download invoice",
// 	},
// } );

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

	// makeInvoiceRow( invoice ) {
	// 	return (
	// 		<RowMobileCollapse verticalAlign={ "baseline" } background={ props.background }>
	// 			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.date ) }>
	// 				<FormattedDate value={ props.date } day="numeric" month="long" year="numeric"/>
	// 			</ColumnMinWidthResponsive>
	// 			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true }
	// 							headerLabel={ props.intl.formatMessage( messages.orderNumber ) }>
	// 				{ props.orderNumber }
	// 			</ColumnMinWidth>
	// 			<ColumnPrimaryResponsive headerLabel={ props.intl.formatMessage( messages.items ) }>
	// 				<LineItems items={ props.items }/>
	// 			</ColumnPrimaryResponsive>
	// 			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.total ) }>
	// 				<FormattedNumber value={ formatAmount( props.total ) } style="currency" currency={ props.currency }/>
	// 			</ColumnMinWidthResponsive>
	// 			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.status ) }>
	// 				<span>{ capitalizeFirstLetter( props.status ) }</span>
	// 			</ColumnMinWidthResponsive>
	// 			<ColumnFixedWidthResponsive>
	// 				<InvoicesDownloadContainer orderId={ props.id } />
	// 			</ColumnFixedWidthResponsive>
	// 		</RowMobileCollapse>
	// 	);
	// }

	render() {
		console.log( this.props );
		let invoicesTable = <ListTable { ...this.props }>
			{ this.props.invoices.map( ( invoice ) => {
				let id = invoice.orderId ? invoice.orderId : invoice.refundId;
				return <div key={ id } >
					<p>{ id }</p>
				</div>;
			} ) }
		</ListTable>;

		if ( this.props.hasPaper ) {
			invoicesTable = <Paper>{ invoicesTable }</Paper>;
		}

		return(
			<div>
				<ModalHeading>
					<FormattedMessage
						id="invoice.modal.heading"
						defaultMessage={ "Invoices for order { invoiceNumber }" }
						values={ { invoiceNumber: this.props.invoices[ 0 ].invoiceNumber } }
					/>
				</ModalHeading>
				 { invoicesTable }
			</div>
		);
	}
}


InvoicesModal.propTypes = {
	invoices: PropTypes.array.isRequired,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoicesModalOrderId: PropTypes.string,
	hasPaper: PropTypes.bool,
};

InvoicesModal.defaultProps = {
	hasPaper: true,
};
