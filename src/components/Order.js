import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { Row, ColumnText, Column } from "./Tables";
import { IconButton } from "./Button";
import { ChevronButton } from "./RoundButton";
import MediaQuery from "react-responsive";
import downloadIcon from "../icons/download.svg";

const messages = defineMessages( {
	date: {
		id: "orders.overview.date",
		defaultMessage: "Date",
	},
	orderNumber: {
		id: "orders.overview.orderNumber",
		defaultMessage: "Order number",
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

/**
 * A page order list using table abstraction.
 *
 * @param {Object} props Properties to be passed to the table.
 * @returns {ReactElement} A row of order stuff.
  */
function Order( props ) {
	return (
		<Row background={ props.background } >
			<ColumnText ColumnWidth="150px" label={ props.intl.formatMessage( messages.date ) }>{ props.date }</ColumnText>
			<ColumnText ColumnWidth="150px" hideOnMobile={ true } hideOnTablet={ true }
						label={ props.intl.formatMessage( messages.orderNumber ) } >{ props.orderNumber }</ColumnText>
			<ColumnText fillSpace={ true } ColumnWidth="150px"label={ props.intl.formatMessage( messages.items ) } >{ props.items }</ColumnText>
			<ColumnText ColumnWidth="150px" label={ props.intl.formatMessage( messages.total ) } >{ props.total }</ColumnText>
			<ColumnText ColumnWidth="150px" label={ props.intl.formatMessage( messages.status ) } >{ props.status }</ColumnText>
			<Column textAlign="right">
				<MediaQuery query="(min-width: 1356px)">
					<IconButton aria-label={ props.intl.formatMessage( messages.invoice ) }
								onClick={ props.onClickInvoice }
								icon={downloadIcon} >
						{ props.intl.formatMessage( messages.invoice ) }
					</IconButton>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
					<ChevronButton aria-label={ props.intl.formatMessage( messages.invoice ) }
								   onClick={ props.onClickInvoice } />
				</MediaQuery>
			</Column>
		</Row>
	);
}

Order.propTypes = {
	onClickInvoice: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	date: React.PropTypes.string,
	orderNumber: React.PropTypes.string,
	items: React.PropTypes.string,
	total: React.PropTypes.string,
	status: React.PropTypes.string,
	background: React.PropTypes.string,
};

Order.defaultProps = {
	date: "N/A",
	orderNumber: "N/A",
	items: "N/A",
	total: "N/A",
	status: "N/A",
	background: "none",
};

export default injectIntl( Order );
