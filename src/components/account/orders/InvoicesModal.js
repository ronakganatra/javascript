import PropTypes from "prop-types";
import React from "react";
import {
	ColumnFixedWidth, ColumnMinWidth, ColumnPrimary,
	ListTable, makeFullWidth, responsiveHeaders,
	RowMobileCollapse,
} from "../../Tables";
import Paper from "../../Paper";
import { ModalHeading } from "../../Headings";
import { defineMessages, FormattedDate, FormattedMessage, intlShape } from "react-intl";
import styled from "styled-components";
import downloadIcon from "../../../icons/download.svg";
import { LargeIconButtonLink, makeButtonFullWidth } from "../../Button";
import { getInvoiceUrl } from "../../../functions/api";
// import formatAmount from "../../../../../shared/currency";
// import FormattedNumber from "react-intl/src/components/number";

const messages = defineMessages( {
	date: {
		id: "invoice.date",
		defaultMessage: "Date",
	},
	type: {
		id: "invoice.type",
		defaultMessage: "Order",
	},
	invoice: {
		id: "orders.overview.invoice",
		defaultMessage: "Invoice",
	},
	invoiceLabel: {
		id: "orders.overview.invoice.label",
		defaultMessage: "Download invoice",
	},
} );

const ModalDiv = styled.div`
	width: 704px;
	max-width: 100%;
	padding-bottom: 16px;
`;

let ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
let ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

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
		let id = invoice.orderId ? invoice.orderId : invoice.refundId;

		// todo: make this work for refund invoices URLs too! Probably make a method in this class.
		let invoiceURI = getInvoiceUrl( id );

		let ResponsiveInvoiceLink = makeButtonFullWidth( LargeIconButtonLink );

		return (
			<RowMobileCollapse verticalAlign={ "baseline" } background={ this.props.background } key={ id }>
				<ColumnPrimaryResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.date ) }>
					<FormattedDate value={ invoice.date } day="numeric" month="long" year="numeric"/>
				</ColumnPrimaryResponsive>
				<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ this.props.intl.formatMessage( messages.type ) }>
					<span>{ invoice.type }</span>
				</ColumnMinWidthResponsive>
				<ColumnFixedWidthResponsive>
					<ResponsiveInvoiceLink
						ariaLabel={ this.props.intl.formatMessage( messages.invoiceLabel ) }
						iconSource={ downloadIcon }
						to={ invoiceURI }
						linkTarget="_blank"
					>
						<span>{ this.props.intl.formatMessage( messages.invoice ) }</span>
					</ResponsiveInvoiceLink>
				</ColumnFixedWidthResponsive>
			</RowMobileCollapse>
		);
	}

	render() {
		console.log( this.props );
		let invoicesTable = <ListTable { ...this.props }>
			{ this.props.invoices.map( ( invoice ) => {
				return this.makeInvoiceRow( invoice );
			} ) }
		</ListTable>;

		if ( this.props.hasPaper ) {
			invoicesTable = <Paper>{ invoicesTable }</Paper>;
		}

		return(
			<ModalDiv>
				<ModalHeading>
					<FormattedMessage
						id="invoice.modal.heading"
						defaultMessage={ "Invoices for order { invoiceNumber }" }
						values={ { invoiceNumber: this.props.invoices[ 0 ].invoiceNumber } }
					/>
				</ModalHeading>
				 { invoicesTable }
			</ModalDiv>
		);
	}
}


InvoicesModal.propTypes = {
	invoices: PropTypes.array.isRequired,
	onInvoicesClick: PropTypes.func,
	onInvoicesClose: PropTypes.func,
	invoicesModalOrderId: PropTypes.string,
	hasPaper: PropTypes.bool,
	background: PropTypes.string,
	intl: intlShape,
};

InvoicesModal.defaultProps = {
	hasPaper: true,
};
