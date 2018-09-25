import PropTypes from "prop-types";
import React from "react";
import {
	ColumnFixedWidth, ColumnMinWidth, ColumnPrimary,
	ListTable, makeFullWidth, responsiveHeaders,
	RowMobileCollapse,
} from "../../Tables";
import { ModalHeading } from "../../Headings";
import { defineMessages, FormattedDate, FormattedMessage, intlShape, FormattedNumber } from "react-intl";
import styled from "styled-components";
import downloadIcon from "../../../icons/download.svg";
import { LargeIconButtonLink, LargeSecondaryButton, makeButtonFullWidth } from "../../Button";
import { getInvoiceUrl } from "../../../functions/api";
import formatAmount from "../../../../../shared/currency";

const messages = defineMessages( {
	date: {
		id: "invoice.date",
		defaultMessage: "Date",
	},
	type: {
		id: "invoice.type",
		defaultMessage: "Type",
	},
	amount: {
		id: "invoice.amount",
		defaultMessage: "Amount",
	},
	download: {
		id: "orders.overview.download",
		defaultMessage: "Download",
	},
	invoiceLabel: {
		id: "orders.overview.invoice.label",
		defaultMessage: "Download invoice",
	},
} );

const ModalDiv = styled.div`
	width: 704px;
	max-width: 100%;
	button:last-child {
		margin: 16px 0;
		float: right;
	}
`;

const FullWidthRow = styled( RowMobileCollapse )`
	margin: 0 -16px;
`;

const ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
const ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
const ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

const CloseButton = makeButtonFullWidth( LargeSecondaryButton );

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

	makeInvoiceRow( invoice ) {
		const id = invoice.refundId ? invoice.refundId : invoice.orderId;

		const invoiceURI = getInvoiceUrl( invoice.orderId, invoice.refundId );

		const ResponsiveInvoiceLink = makeButtonFullWidth( LargeIconButtonLink );

		return (
			<FullWidthRow verticalAlign={ "center" } background={ this.props.background } key={ id }>
				<ColumnPrimaryResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.date ) }>
					<FormattedDate value={ invoice.date } day="numeric" month="long" year="numeric" />
				</ColumnPrimaryResponsive>
				<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.type ) }>
					<span>{ invoice.type }</span>
				</ColumnMinWidthResponsive>
				<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.amount ) }>
					<FormattedNumber value={ formatAmount( invoice.totalAmount ) } style="currency" currency={ invoice.currency } />
				</ColumnMinWidthResponsive>
				<ColumnFixedWidthResponsive>
					<ResponsiveInvoiceLink
						ariaLabel={ this.props.intl.formatMessage( messages.invoiceLabel ) }
						iconSource={ downloadIcon }
						to={ invoiceURI }
						linkTarget="_blank"
					>
						<span>{ this.props.intl.formatMessage( messages.download ) }</span>
					</ResponsiveInvoiceLink>
				</ColumnFixedWidthResponsive>
			</FullWidthRow>
		);
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const invoicesTable = <ListTable { ...this.props }>
			{ this.props.invoices.map( ( invoice ) => {
				return this.makeInvoiceRow( invoice );
			} ) }
		</ListTable>;

		return (
			<ModalDiv>
				<ModalHeading>
					<FormattedMessage
						id="invoice.modal.heading"
						defaultMessage={ "Invoices for order { invoiceNumber }" }
						values={ { invoiceNumber: <strong>{ this.props.invoices[ 0 ].invoiceNumber }</strong> } }
					/>
				</ModalHeading>
				 { invoicesTable }
				<CloseButton
					onClick={ this.props.onInvoicesClose }
				>
					<FormattedMessage
						id="invoice.modal.close"
						defaultMessage="Close"
					/>
				</CloseButton>
			</ModalDiv>
		);
	}
}


InvoicesModal.propTypes = {
	invoices: PropTypes.array.isRequired,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoicesModalOrderId: PropTypes.string,
	background: PropTypes.string,
	intl: intlShape,
};
