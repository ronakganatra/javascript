import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedNumber, FormattedDate, FormattedMessage } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, makeFullWidth, responsiveHeaders } from "./Tables";
import { LargeIconButtonLink, disable, IconButton, makeButtonFullWidth, makeResponsiveIconButton } from "./Button";
import downloadIcon from "../icons/download.svg";
import formatAmount from "../../../shared/currency";
import LineItems from "./LineItems";

const messages = defineMessages( {
	date: {
		id: "orders.overview.date",
		defaultMessage: "Date",
	},
	orderNumber: {
		id: "orders.overview.orderNumber",
		defaultMessage: "Order",
	},
	items: {
		id: "orders.overview.items",
		defaultMessage: "Items",
	},
	total: {
		id: "orders.overview.total",
		defaultMessage: "Total",
	},
	status: {
		id: "orders.overview.status",
		defaultMessage: "Status",
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

let ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
let ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
let ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

let invoiceStatuses = [ "completed", "refunded" ];

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
 */
function Order( props ) {
	let InvoiceButton = LargeIconButtonLink;
	if ( ! invoiceStatuses.includes( props.status ) ) {
		InvoiceButton = disable( IconButton );
	}

	let ResponsiveInvoiceButton = makeButtonFullWidth( makeResponsiveIconButton( InvoiceButton ) );

	let invoiceMessage = props.intl.formatMessage( messages.invoice );
	let invoiceLabel = props.intl.formatMessage( messages.invoiceLabel );

	return (
		<RowMobileCollapse background={ props.background }>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.date ) }>
				<FormattedDate value={ props.date } day="numeric" month="long" year="numeric"/>
			</ColumnMinWidthResponsive>
			<ColumnMinWidth ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true }
						headerLabel={ props.intl.formatMessage( messages.orderNumber ) }>
				{ props.orderNumber }
			</ColumnMinWidth>
			<ColumnPrimaryResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.items ) }>
				<LineItems items={ props.items }/>
			</ColumnPrimaryResponsive>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.total ) }>
				<FormattedNumber value={ formatAmount( props.total ) } style="currency" currency={ props.currency }/>
			</ColumnMinWidthResponsive>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.status ) }>
				<FormattedMessage id={ props.status } defaultMessage={ props.statusDisplayName } />
			</ColumnMinWidthResponsive>
			<ColumnFixedWidthResponsive>
				<ResponsiveInvoiceButton
					ariaLabel={ invoiceLabel }
					iconSource={ downloadIcon }
					to={ props.invoiceLink }
				>
					<span className="screen-reader-text">{ invoiceMessage }</span>
				</ResponsiveInvoiceButton>
			</ColumnFixedWidthResponsive>
		</RowMobileCollapse>
	);
}

Order.propTypes = {
	date: PropTypes.instanceOf( Date ).isRequired,
	id: PropTypes.string.isRequired,
	orderNumber: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	invoiceLink: PropTypes.string,
	intl: intlShape.isRequired,
	items: PropTypes.array,
	status: PropTypes.string,
	statusDisplayName: PropTypes.string,
	background: PropTypes.string,
};

Order.defaultProps = {
	items: [],
	status: "N/A",
	background: "",
};

export default injectIntl( Order );
