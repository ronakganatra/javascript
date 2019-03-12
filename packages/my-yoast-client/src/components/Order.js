import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedNumber, FormattedDate } from "react-intl";
import { RowMobileCollapse, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, makeFullWidth, responsiveHeaders } from "./Tables";
import formatAmount from "../functions/currency";
import LineItems from "./LineItems";
import { capitalizeFirstLetter } from "../functions/stringHelpers";
import InvoicesDownloadContainer from "../containers/InvoicesDownload";

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

const ColumnMinWidthResponsive = makeFullWidth( responsiveHeaders( ColumnMinWidth ) );
const ColumnPrimaryResponsive = makeFullWidth( responsiveHeaders( ColumnPrimary ) );
const ColumnFixedWidthResponsive = makeFullWidth( responsiveHeaders( ColumnFixedWidth ) );

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
 */
function Order( props ) {
	return (
		<RowMobileCollapse verticalAlign={ "baseline" } background={ props.background }>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.date ) }>
				<FormattedDate value={ props.date } day="numeric" month="long" year="numeric" />
			</ColumnMinWidthResponsive>
			<ColumnMinWidth
				ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true }
				headerLabel={ props.intl.formatMessage( messages.orderNumber ) }
			>
				{ props.invoiceNumber }
			</ColumnMinWidth>
			<ColumnPrimaryResponsive headerLabel={ props.intl.formatMessage( messages.items ) }>
				<LineItems items={ props.items } />
			</ColumnPrimaryResponsive>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.total ) }>
				<FormattedNumber value={ formatAmount( props.totalAmount ) } style="currency" currency={ props.currency } />
			</ColumnMinWidthResponsive>
			<ColumnMinWidthResponsive ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.status ) }>
				<span>{ capitalizeFirstLetter( props.status ) }</span>
			</ColumnMinWidthResponsive>
			<ColumnFixedWidthResponsive>
				<InvoicesDownloadContainer orderId={ props.id } />
			</ColumnFixedWidthResponsive>
		</RowMobileCollapse>
	);
}

Order.propTypes = {
	date: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	invoiceNumber: PropTypes.string.isRequired,
	totalAmount: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	intl: intlShape.isRequired,
	items: PropTypes.array,
	status: PropTypes.string,
	background: PropTypes.string,
};

Order.defaultProps = {
	items: [],
	status: "N/A",
	background: "",
};

export default injectIntl( Order );
