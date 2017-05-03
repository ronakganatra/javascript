import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedNumber, FormattedDate } from "react-intl";
import { Row, ColumnText, Column } from "./Tables";
import { IconButtonLink, disable, IconButton } from "./Button";
import MediaQuery from "react-responsive";
import downloadIcon from "../icons/download.svg";
import { formatAmount } from "../functions/currency";
import LineItems from "./LineItems";
import styled from "styled-components";

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
} );

let invoiceStatuses = [ "completed", "refunded" ];

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
 */
function Order( props ) {
	let InvoiceButton = IconButtonLink;
	if ( ! invoiceStatuses.includes( props.status ) ) {
		InvoiceButton = disable( IconButton );
	}

	let invoiceMessage = props.intl.formatMessage( messages.invoice );

	// On mobile devices there is no text so we need to compensate the style for this.
	let ResponseInvoiceButton = styled( InvoiceButton )`
		@media screen and ( max-width: 1355px ) {
			padding-right: 0px;
		}
	`;

	return (
		<Row background={ props.background }>
			<ColumnText ColumnWidth="150px" headerLabel={ props.intl.formatMessage( messages.date ) }>
				<FormattedDate value={ props.date } day="numeric" month="long" year="numeric"/>
			</ColumnText>
			<ColumnText ColumnWidth="150px" hideOnMobile={ true } hideOnTablet={ true }
						headerLabel={ props.intl.formatMessage( messages.orderNumber ) }>
				{ props.orderNumber }
			</ColumnText>
			<ColumnText fillSpace={ true } ColumnWidth="150px" headerLabel={ props.intl.formatMessage( messages.items ) }>
				<LineItems items={ props.items }/>
			</ColumnText>
			<ColumnText ColumnWidth="150px" headerLabel={ props.intl.formatMessage( messages.total ) }>
				<FormattedNumber value={ formatAmount( props.total ) } style="currency" currency={ props.currency }/>
			</ColumnText>
			<ColumnText ColumnWidth="150px" headerLabel={ props.intl.formatMessage( messages.status ) }>{ props.status }</ColumnText>
			<Column textAlign="right">
				<ResponseInvoiceButton
					aria-label={ invoiceMessage }
					iconSource={ downloadIcon }
					href={ props.invoiceLink }>
					<MediaQuery query="(min-width: 1356px)">
						{ invoiceMessage }
					</MediaQuery>
					<MediaQuery query="(max-width: 1355px)">
						<span className="screen-reader-text">{ invoiceMessage }</span>
					</MediaQuery>
				</ResponseInvoiceButton>
			</Column>
		</Row>
	);
}

Order.propTypes = {
	date: React.PropTypes.instanceOf( Date ).isRequired,
	id: React.PropTypes.string.isRequired,
	orderNumber: React.PropTypes.string.isRequired,
	total: React.PropTypes.number.isRequired,
	currency: React.PropTypes.string.isRequired,
	invoiceLink: React.PropTypes.string,
	intl: intlShape.isRequired,
	items: React.PropTypes.array,
	status: React.PropTypes.string,
	background: React.PropTypes.string,
};

Order.defaultProps = {
	items: [],
	status: "N/A",
	background: "",
};

export default injectIntl( Order );
