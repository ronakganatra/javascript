import React from "react";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import { getInvoiceUrl } from "../../../functions/api";
import { LargeIconButton, LargeIconButtonLink, makeButtonFullWidth, makeResponsiveIconButton } from "../../Button";
import downloadIcon from "../../../icons/download.svg";
import PropTypes from "prop-types";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";

const messages = defineMessages( {
	invoice: {
		id: "orders.overview.invoice",
		defaultMessage: "Invoice",
	},
	invoiceLabel: {
		id: "orders.overview.invoice.label",
		defaultMessage: "Download invoice",
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

	getRefunds( orderId, refunds ) {
		return _filter( refunds, { orderId: orderId } );
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
			this.getButton()
		);
	}
}

export default injectIntl( InvoiceButtonArea );

InvoiceButtonArea.propTypes = {
	id: PropTypes.string.isRequired,
	refunds: PropTypes.array.isRequired,
	intl: intlShape,
	onInvoicesClick: PropTypes.func,
};
