import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { RowMobileCollapse, ListTable, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages, FormattedMessage } from "react-intl";
import defaults from "../config/defaults.json";
import Link from "./Link";
import { capitalizeFirstLetter } from "../functions/stringHelpers";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscriptionDetails.paymentDetails.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscriptionDetails.invoices.title",
		defaultMessage: "Invoices",
	},
	status: {
		id: "subscriptionDetails.paymentDetails.status",
		defaultMessage: "Subscription status",
	},
	startDate: {
		id: "subscriptionDetails.paymentDetails.start-date",
		defaultMessage: "Start date",
	},
	endDate: {
		id: "subscriptionDetails.paymentDetails.end-date",
		defaultMessage: "End date",
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

export const RowMobileCollapseNoMinHeight = styled( RowMobileCollapse )`
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

export const ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );

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
	let endDate = "-";
	if ( props.hasNextBilling || props.hasEndDate ) {
		// Use end date for EDD subscriptions which will be renewed in a new WooCommerce Subscription.
		nextBilling = <FormattedDate
			value={ props.hasNextBilling ? props.nextBilling : props.endDate }
			year="numeric"
			month="long"
			day="2-digit"
		/>;
	}

	if ( props.hasEndDate ) {
		endDate = <FormattedDate
			value={ props.endDate }
			year="numeric"
			month="long"
			day="2-digit"
		/>;
	}

	const statusRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="status">
			<ColumnMinWidth ellipsis={ true }>
				{ props.intl.formatMessage( messages.status ) }
			</ColumnMinWidth>
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ capitalizeFirstLetter( props.status ) }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight>
	);

	const startingDateRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="start-date">
			<ColumnMinWidth ellipsis={ true }>
				{ props.intl.formatMessage( messages.startDate ) }
			</ColumnMinWidth>
			<ColumnFixedWidthResponsive ellipsis={ true }>
				<FormattedDate
					value={ props.startDate }
					year="numeric"
					month="long"
					day="2-digit"
				/>
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight>
	);

	const nextBillingDateRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="next-billing">
			<ColumnMinWidth ellipsis={ true }>
				{ props.intl.formatMessage( messages.nextBilling ) }
			</ColumnMinWidth>
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ nextBilling }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight>
	);

	const endDateRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="end-date">
			<ColumnMinWidth ellipsis={ true }>
				{ props.intl.formatMessage( messages.endDate ) }
			</ColumnMinWidth>
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ endDate }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight>
	);

	// Shown when the cancellation of the subscription is pending.
	const pendingCancelMessage = <FormattedMessage { ...messages.cancelPending } />;

	// Shown when the subscription can be cancelled, but has not been cancelled yet.
	const cancelLink = (
		<Link to={ "#" } onClick={ props.onCancelClick }>
			<FormattedMessage { ...messages.cancelLink } />
		</Link>
	);

	const cancelSubscriptionRow = (
		<RowMobileCollapseNoMinHeight hasHeaderLabels={ false } key="cancel">
			<ColumnFixedWidthResponsive ellipsis={ true }>
				{ props.status === "pending-cancel" ? pendingCancelMessage : cancelLink }
			</ColumnFixedWidthResponsive>
		</RowMobileCollapseNoMinHeight> );

	const rows = [ statusRow, startingDateRow ];
	if ( props.status === "active" || props.status === "on-hold" ) {
		rows.push( nextBillingDateRow );
	} else {
		rows.push( endDateRow );
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
