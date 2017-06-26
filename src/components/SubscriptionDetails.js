import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { RowMobileCollapse, ListTable, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscription-details.payment-details.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscription-details.invoices.title",
		defaultMessage: "Invoices",
	},
	startDate: {
		id: "subscription-details.payment-details.start-date",
		defaultMessage: "Start date",
	},
	nextBilling: {
		id: "subscription-details.payment-details.next-billing",
		defaultMessage: "Next billing",
	},
	invoiceButton: {
		id: "subscription-details.buttons.invoice",
		defaultMessage: "Invoice",
	},
} );

const RowMobileCollapseNoMinHeight = styled( RowMobileCollapse )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		min-height: 0;

		> span:nth-child(2) {
			margin-top: 0;
			color: ${ colors.$color_black };
		}

		> span:first-child {
			color: ${ colors.$color_grey_text };
		}
	}
`;

let ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );

/**
 * The SubscriptionDetails component.
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered SubscriptionDetails component.
 *
 * @constructor
 */
function SubscriptionDetails( props ) {
	return (
		<ListTable>
			<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="start-date">
				<ColumnMinWidth ellipsis={ true }>
					{ props.intl.formatMessage( messages.startDate ) }
				</ColumnMinWidth>
				<ColumnFixedWidthResponsive ellipsis={ true }>
					<FormattedDate
						value={ props.startDate }
						year='numeric'
						month='long'
						day='2-digit'
					/>
				</ColumnFixedWidthResponsive>
			</RowMobileCollapseNoMinHeight>
			<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="next-billing">
				<ColumnMinWidth ellipsis={ true }>
					{ props.intl.formatMessage( messages.nextBilling ) }
				</ColumnMinWidth>
				<ColumnFixedWidthResponsive ellipsis={ true }>
					<FormattedDate
						value={ props.nextBilling }
						year='numeric'
						month='long'
						day='2-digit'
					/>
				</ColumnFixedWidthResponsive>
			</RowMobileCollapseNoMinHeight>
		</ListTable>
	);
}

SubscriptionDetails.propTypes = {
	startDate: PropTypes.instanceOf( Date ).isRequired,
	nextBilling: PropTypes.instanceOf( Date ).isRequired,
	orders: PropTypes.array.isRequired,
	max: PropTypes.number.isRequired,
	current: PropTypes.number.isRequired,
	onInvoiceDownload: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	subscription: PropTypes.string,
};

export default injectIntl( SubscriptionDetails );
