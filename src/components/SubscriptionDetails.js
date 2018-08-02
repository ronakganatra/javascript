import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { RowMobileCollapse, ListTable, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages, FormattedMessage } from "react-intl";
import defaults from "../config/defaults.json";
import Link from "./Link";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscriptionDetails.paymentDetails.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscriptionDetails.invoices.title",
		defaultMessage: "Invoices",
	},
	startDate: {
		id: "subscriptionDetails.paymentDetails.start-date",
		defaultMessage: "Start date",
	},
	nextBilling: {
		id: "subscriptionDetails.paymentDetails.nextBilling",
		defaultMessage: "Next billing",
	},
	invoiceButton: {
		id: "subscriptionDetails.buttons.invoice",
		defaultMessage: "Invoice",
	},
	cancelLink: {
		id: "subscriptionDetails.buttons.cancel",
		defaultMessage: "Cancel subscription",
	},
	cancelPending: {
		id: "subscriptionDetails.cancelPending",
		defaultMessage: "Your subscription has been cancelled.",
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
	let nextBilling = "-";
	if ( props.hasNextBilling || props.hasEndDate ) {
		nextBilling = <FormattedDate
			value={ props.hasNextBilling ? props.nextBilling : props.endDate }
			year="numeric"
			month="long"
			day="2-digit"
		/>;
	}

	let startingDateRow = (
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
		</RowMobileCollapseNoMinHeight> );

	let nextBillingDateRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="next-billing">
			<ColumnMinWidth ellipsis={ true }>
				{ props.intl.formatMessage( messages.nextBilling ) }
			</ColumnMinWidth>
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ nextBilling }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight>
	);

	// Shown when the cancellation of the subscription is pending.
	let pendingCancelMessage = <FormattedMessage { ...messages.cancelPending } />;

	// Shown when the subscription can be cancelled, but has not been cancelled yet.
	let cancelLink = (
		<Link to={ "#" } onClick={ props.onCancelClick }>
			<FormattedMessage { ...messages.cancelLink } />
		</Link>
	);

	let cancelSubscriptionRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="cancel">
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ props.status === "pending-cancel" ? pendingCancelMessage : cancelLink }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight> );

	let rows = [ startingDateRow ];
	if ( props.status !== "pending-cancel" ) {
		rows.push( nextBillingDateRow );
	}
	if ( props.canCancel ) {
		rows.push( cancelSubscriptionRow );
	}

	return (
		<ListTable>
			{ rows }
		</ListTable>
	);
}

SubscriptionDetails.propTypes = {
	startDate: PropTypes.instanceOf( Date ).isRequired,
	hasNextBilling: PropTypes.bool.isRequired,
	nextBilling: PropTypes.instanceOf( Date ).isRequired,
	hasEndDate: PropTypes.bool.isRequired,
	endDate: PropTypes.instanceOf( Date ).isRequired,
	orders: PropTypes.array.isRequired,
	max: PropTypes.number.isRequired,
	current: PropTypes.number.isRequired,
	intl: intlShape.isRequired,
	onCancelClick: PropTypes.func.isRequired,
	canCancel: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
};

export default injectIntl( SubscriptionDetails );
