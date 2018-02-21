import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { getInvoiceUrl } from "../../../functions/api";
import { LargeIconButton, LargeIconButtonLink, makeButtonFullWidth, makeResponsiveIconButton } from "../../Button";
import downloadIcon from "../../../icons/download.svg";
import PropTypes from "prop-types";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
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

	/**
	 * Will get the refunds belonging to the relevant order.
	 *
	 * @param {string} orderId The id of the relevant order.
	 * @param {Object} refunds The refunds for this customer.
	 * @returns {Array} The refunds belonging to this order for this customer.
	 */
	getRefunds( orderId, refunds ) {
		return _filter( refunds, { orderId: orderId } );
	}

	getModal() {
		let theModal = (
			<MyYoastModal
				onClose={ this.props.onInvoicesClose }
				isOpen={ this.props.invoiceModalProps.invoicesModalOrderId === this.props.id }
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
		let invoiceURI = getInvoiceUrl( this.props.id );

		let ResponsiveInvoiceLink = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButtonLink ) );
		let ResponsiveInvoiceButton = makeButtonFullWidth( makeResponsiveIconButton( LargeIconButton ) );

		let invoiceMessage = this.props.intl.formatMessage( messages.invoice );
		let invoiceLabel = this.props.intl.formatMessage( messages.invoiceLabel );
		let refunds = this.getRefunds( this.props.id, this.props.refunds );

		if ( ! _isEmpty( refunds ) ) {
			return (
				<ResponsiveInvoiceButton
					ariaLabel={ invoiceLabel }
					iconSource={ downloadIcon }
					onClick={ () => {
						return this.props.onInvoicesClick( this.props.id );
					} }
				>
					<FormattedMessage
						defaultMessage={ "invoices" }
						id={ "invoices-modal-button" }
					/>
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
	id: PropTypes.string.isRequired,
	refunds: PropTypes.array.isRequired,
	intl: intlShape,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoiceModalProps: PropTypes.shape( {
		invoicesModalIsOpen: PropTypes.bool,
		invoicesModalOrderId: PropTypes.string,
	} ),
	orders: PropTypes.object,
};
