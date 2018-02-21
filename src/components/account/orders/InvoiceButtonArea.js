import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { getInvoiceUrl } from "../../../functions/api";
import { LargeIconButton, LargeIconButtonLink, makeButtonFullWidth, makeResponsiveIconButton } from "../../Button";
import downloadIcon from "../../../icons/download.svg";
import PropTypes from "prop-types";
import { InvoicesModal } from "./InvoicesModal";
import MyYoastModal from "../../MyYoastModal";

const messages = defineMessages( {
	invoice: {
		id: "orders.overview.invoice",
		defaultMessage: "Invoice",
	},
	invoiceLabel: {
		id: "orders.overview.invoice.label",
		defaultMessage: "Download invoice",
	},
	invoiceModal: {
		id: "orders.overview.invoiceModal",
		defaultMessage: "Invoices",
	},
	invoicesModalLabel: {
		id: "orders.overview.invoices.modal.label",
		defaultMessage: "View and download invoices",
	},
} );

/**
 * A function that returns the InvoiceButtonArea component, containing a button that either downloads the invoice pdf, or opens a modal.
 *
 * @returns {ReactElement} The component that contains the button mentioned above.
 */
class InvoiceButtonArea extends React.Component {
	/**
	 * Sets the InvoiceButtonArea component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}

	getModal() {
		let theModal = (
			<MyYoastModal
				onClose={ this.props.onInvoicesClose }
				isOpen={ this.props.invoiceModalProps.invoicesModalOrderId === this.props.orderId }
				modalAriaLabel={ messages.invoicesModalLabel }
			>
				<InvoicesModal { ...this.props } />
			</MyYoastModal>
		);

		return this.props.invoiceModalProps.invoicesModalOrderId
			? theModal
			: null;
	}

	getButton() {
		let invoiceURI = getInvoiceUrl( this.props.orderId );

		let ResponsiveInvoiceLink = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButtonLink ) );
		let ResponsiveInvoiceButton = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButton ) );

		let invoiceMessage = this.props.intl.formatMessage( messages.invoice );
		let invoiceModalMessage = this.props.intl.formatMessage( messages.invoiceModal );
		let invoiceLabel = this.props.intl.formatMessage( messages.invoiceLabel );

		if ( this.props.hasMultipleInvoices ) {
			return (
				<ResponsiveInvoiceButton
					ariaLabel={ invoiceLabel }
					iconSource={ downloadIcon }
					onClick={ () => {
						return this.props.onInvoicesClick( this.props.orderId );
					} }
				>
					<span className="screen-reader-text" >{ invoiceModalMessage }</span>
				</ResponsiveInvoiceButton>
			);
		}
		return(
			<ResponsiveInvoiceLink
				ariaLabel={ invoiceLabel }
				iconSource={ downloadIcon }
				to={ invoiceURI }
				linkTarget="_blank"
			>
				<span className="screen-reader-text">{ invoiceMessage }</span>
			</ResponsiveInvoiceLink>
		);
	}

	render() {
		return(
			<div>
				{ this.getButton() }
				{ this.getModal() }
			</div>
		);
	}
}

export default injectIntl( InvoiceButtonArea );

InvoiceButtonArea.propTypes = {
	orderId: PropTypes.string.isRequired,
	hasMultipleInvoices: PropTypes.bool,
	intl: intlShape,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoiceModalProps: PropTypes.shape( {
		invoicesModalIsOpen: PropTypes.bool,
		invoicesModalOrderId: PropTypes.string,
	} ),
	order: PropTypes.object,
};
