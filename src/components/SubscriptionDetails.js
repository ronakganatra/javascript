import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { RowMobileCollapse, ListTable, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import defaults from "../config/defaults.json";

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
					{ nextBilling }
				</ColumnFixedWidthResponsive>
			</RowMobileCollapseNoMinHeight>
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
	subscription: PropTypes.string,
};

export default injectIntl( SubscriptionDetails );
