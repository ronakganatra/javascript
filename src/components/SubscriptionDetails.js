import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { RowMobileCollapse, ListTable, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import downloadIcon from "../icons/download.svg";
import { ListHeading } from "./ListHeading";
import {  IconButtonLink, makeButtonFullWidth } from "./Button";
import formatAmount from "../../../shared/currency";
import { getInvoiceUrl } from "../functions/api";
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

const SubscriptionDetailsContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
	width: 100%;

	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet + 1 }px ) {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
`;

const ColumnContainer = styled.div`
	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet + 1 }px ) {
		width: calc( 50% - 10px );
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		width: 100%;
	}
`;

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

let ColumnMinWidthResponsive = makeFullWidth( ColumnMinWidth );
let ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );
let ResponsiveIconButtonLink = makeButtonFullWidth( IconButtonLink );

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
	let paymentDetailTable = (
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

	let invoicesTable = (
		<ListTable>
			{ props.invoices.map( ( invoice ) => {
				return <RowMobileCollapseNoMinHeight { ...invoice } hasHeaderLabels={ false } key={ invoice.invoiceId }>
					<ColumnMinWidth>
						<FormattedDate
							value={ invoice.invoiceDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnMinWidth>
					<ColumnMinWidthResponsive ellipsis={ true }>
						{ props.intl.formatNumber(
							formatAmount( invoice.invoiceAmount ),
							{
								style: "currency",
								currency: invoice.invoiceCurrency,
								maximumFractionDigits: 0,
							}
						) }
					</ColumnMinWidthResponsive>
					<ColumnFixedWidthResponsive>
						<ResponsiveIconButtonLink
							to={ getInvoiceUrl( invoice.invoiceId ) }
							iconSource={ downloadIcon }
							iconSize={ "16px" }>
							{ props.intl.formatMessage( messages.invoiceButton ) }
						</ResponsiveIconButtonLink>
					</ColumnFixedWidthResponsive>
				</RowMobileCollapseNoMinHeight>;
			} ) }
		</ListTable>
	);

	return (
		<SubscriptionDetailsContainer>
			<ColumnContainer>
				<ListHeading>
					{ props.intl.formatMessage( messages.paymentDetailsTitle ) }
				</ListHeading>
				{ paymentDetailTable }
			</ColumnContainer>
			<ColumnContainer>
				<ListHeading>
					{ props.intl.formatMessage( messages.invoicesTitle ) }
				</ListHeading>
				{ invoicesTable }
			</ColumnContainer>
		</SubscriptionDetailsContainer>
	);
}

SubscriptionDetails.propTypes = {
	startDate: React.PropTypes.instanceOf( Date ).isRequired,
	nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
	invoices: React.PropTypes.array.isRequired,
	max: React.PropTypes.number.isRequired,
	current: React.PropTypes.number.isRequired,
	onInvoiceDownload: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	subscription: React.PropTypes.string,
};

export default injectIntl( SubscriptionDetails );
