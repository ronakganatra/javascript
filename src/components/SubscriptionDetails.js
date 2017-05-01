import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, ListTable, Column } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import MediaQuery from "react-responsive";
import { IconButton } from "./Button";
import downloadIcon from "../icons/download.svg";
import { LargeButton, RedButton } from "./Button";

let columnMargin = "10px";
let hideButtonsThreshold = 400;
let mobileViewThreshold = 1200;

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscription-details.payment-details.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscription-details.invoices.title",
		defaultMessage: "Invoices",
	},
	subscriptionDetailsTitle: {
		id: "subscription-details.subscription-details.title",
		defaultMessage: "Subscription details",
	},
	startDate: {
		id: "subscription-details.payment-details.start-date",
		defaultMessage: "Start date",
	},
	nextBilling: {
		id: "subscription-details.payment-details.next-billing",
		defaultMessage: "Next billing",
	},
	addSites: {
		id: "subscription-details.subscription-details.add-sites",
		defaultMessage: "You can add { howMany } more sites to this subscription.",
	},
	changeLevel: {
		id: "subscription-details.subscription-details.change-level",
		defaultMessage: "Change subscription level",
	},
	cancelSubscription: {
		id: "subscription-details.subscription-details.cancel-subscription",
		defaultMessage: "Cancel subscription",
	},
	addSiteButton: {
		id: "subscription-details.buttons.add-site",
		defaultMessage: "Add site",
	},
	shopButton: {
		id: "subscription-details.buttons.shop",
		defaultMessage: "Shop",
	},
	cancelButton: {
		id: "subscription-details.buttons.cancel",
		defaultMessage: "Cancel",
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
	@media screen and ( min-width: ${ mobileViewThreshold }px ) {
		display: flex;
		flex-wrap: wrap;
		div:nth-child(odd) {
			margin-right: ${ columnMargin };
		}
		div:nth-child(even) {
			margin-left: ${ columnMargin };
		}
	}
`;

const ColumnContainer = styled.div`
	@media screen and ( min-width: ${ mobileViewThreshold }px ) { 
		width: calc( 50% - ${ columnMargin } );
	}
	@media screen and ( max-width: ${ mobileViewThreshold }px ) { 
		width: 100%;
	}
`;

const ListHeader = styled.h2`
	font-size: 1em;
	font-weight: 400; 
	padding: 20px 0 20px 30px;
	margin: 0;
	border-bottom: 1px solid ${ colors.$color_grey_medium };
`;

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
		<ListTable hasHeaderLabels={ false }>
				<Row key="start-date" justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="30%">{ props.intl.formatMessage( messages.startDate ) }</ColumnText>
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="30%">
						<FormattedDate
							value={ props.startDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
				</Row>
				<Row key="next-billing" justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="30%">{ props.intl.formatMessage( messages.nextBilling ) }</ColumnText>
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="30%">
						<FormattedDate
							value={ props.nextBilling }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
				</Row>
		</ListTable>
	);

	let subscriptionDetailsTable = (
		<ListTable hasHeaderLabels={ false }>
				<Row key="remaining-slots" justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="60%">
						{ props.intl.formatMessage( messages.addSites, { howMany: ( props.max - props.current ) } ) }
					</ColumnText>
					<Column columnPaddingLeft={ "20px" }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButton onClick={ props.onAddSite }>
								{ props.intl.formatMessage( messages.addSiteButton ) }
							</LargeButton>
						</MediaQuery>
					</Column>
				</Row>
				<Row key="change-level" justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="60%">{ props.intl.formatMessage( messages.changeLevel ) }</ColumnText>
					<Column columnPaddingLeft={ "20px" }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButton onClick={ props.onShop }>
								{ props.intl.formatMessage( messages.shopButton ) }
							</LargeButton>
						</MediaQuery>
					</Column>
				</Row>
				<Row key="cancel" justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="60%">{ props.intl.formatMessage( messages.cancelSubscription ) }</ColumnText>
					<Column columnPaddingLeft={ "20px" }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<RedButton onClick={ props.onCancel }>
								{ props.intl.formatMessage( messages.cancelButton ) }
							</RedButton>
						</MediaQuery>
					</Column>
				</Row>
		</ListTable>
	);

	let invoicesTable = (
		<ListTable hasHeaderLabels={ false }>
			{ props.invoices.map( ( invoice ) => {
				return <Row { ...invoice } key={ invoice.invoiceId } justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="20%">
						<FormattedDate
							value={ invoice.invoiceDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
					<ColumnText columnPaddingLeft={ "20px" } ColumnWidth="20%">
						{ props.intl.formatNumber(
							invoice.invoiceAmount,
							{
								style: "currency",
								currency: invoice.invoiceCurrency,
								maximumFractionDigits: 0,
							}
						) }
					</ColumnText>
					<Column columnPaddingLeft={ "20px" } ColumnWidth="20%">
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<IconButton onClick={ props.onInvoiceDownload }
										iconSource={ downloadIcon }
										iconSize={ "16px" }>
								{ props.intl.formatMessage( messages.invoiceButton ) }
							</IconButton>
						</MediaQuery>
					</Column>
				</Row>;
			} ) }
		</ListTable>
	);

	return (
		<SubscriptionDetailsContainer>
				<ColumnContainer>
					<ListHeader>
						{ props.intl.formatMessage( messages.paymentDetailsTitle ) }
					</ListHeader>
					{ paymentDetailTable }
				</ColumnContainer>
				<ColumnContainer>
					<ListHeader>
						{ props.intl.formatMessage( messages.subscriptionDetailsTitle ) }
					</ListHeader>
					{ subscriptionDetailsTable }
				</ColumnContainer>
				<ColumnContainer>
					<ListHeader>
						{ props.intl.formatMessage( messages.invoicesTitle ) }
					</ListHeader>
					{ invoicesTable }
				</ColumnContainer>
		</SubscriptionDetailsContainer>
	);
}

SubscriptionDetails.propTypes = {
	startDate: React.PropTypes.instanceOf( Date ).isRequired,
	nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
	invoices: React.PropTypes.array,
	max: React.PropTypes.number.isRequired,
	current: React.PropTypes.number.isRequired,
	onAddSite: React.PropTypes.func.isRequired,
	onShop: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onInvoiceDownload: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( SubscriptionDetails );
