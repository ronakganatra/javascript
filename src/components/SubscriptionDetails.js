import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, ListTable, Column } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import MediaQuery from "react-responsive";
import downloadIcon from "../icons/download.svg";
import { ListHeading } from "./ListHeading";
import { LargeButton, RedButton, IconButtonLink, LargeButtonLink } from "./Button";
import formatAmount from "../../../shared/currency";
import { getInvoiceUrl } from "../functions/api";

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

const CustomRow = styled( Row )`
	& > span {
		padding-left: 20px;
	}

	.column--subscription-detail-start-date,
	.column--subscription-detail-next-billing {
		flex: 0 0 30%;
	}

	.column--subscription-detail-add-site,
	.column--subscription-detail-change-level,
	.column--subscription-detail-cancel {
		flex: 1 1 60%;
	}

	.column--subscription-invoice-date,
	.column--subscription-invoice-amount,
	.column--subscription-invoice-button {
		flex: 0 0 20%;
	}
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
				<CustomRow key="start-date">
					<ColumnText className="column--subscription-detail-start-date">
						{ props.intl.formatMessage( messages.startDate ) }
					</ColumnText>
					<ColumnText className="column--subscription-detail-start-date">
						<FormattedDate
							value={ props.startDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
				</CustomRow>
				<CustomRow key="next-billing">
					<ColumnText className="column--subscription-detail-next-billing">
						{ props.intl.formatMessage( messages.nextBilling ) }
					</ColumnText>
					<ColumnText className="column--subscription-detail-next-billing">
						<FormattedDate
							value={ props.nextBilling }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
				</CustomRow>
		</ListTable>
	);

	let subscriptionDetailsTable = (
		<ListTable hasHeaderLabels={ false }>
				<CustomRow key="remaining-licenses">
					<ColumnText className="column--subscription-detail-add-site">
						{ props.intl.formatMessage( messages.addSites, { howMany: ( props.max - props.current ) } ) }
					</ColumnText>
					<Column>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButton onClick={ props.onAddSite }>
								{ props.intl.formatMessage( messages.addSiteButton ) }
							</LargeButton>
						</MediaQuery>
					</Column>
				</CustomRow>
				<CustomRow key="change-level">
					<ColumnText className="column--subscription-detail-change-level">
						{ props.intl.formatMessage( messages.changeLevel ) }
					</ColumnText>
					<Column>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButtonLink to={ props.onShop } aria-label={ props.intl.formatMessage( messages.shopButton ) }>
								{ props.intl.formatMessage( messages.shopButton ) }
							</LargeButtonLink>
						</MediaQuery>
					</Column>
				</CustomRow>
				<CustomRow key="cancel">
					<ColumnText className="column--subscription-detail-cancel">
						{ props.intl.formatMessage( messages.cancelSubscription ) }
					</ColumnText>
					<Column>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<RedButton onClick={ props.onCancel }>
								{ props.intl.formatMessage( messages.cancelButton ) }
							</RedButton>
						</MediaQuery>
					</Column>
				</CustomRow>
		</ListTable>
	);

	let invoicesTable = (
		<ListTable hasHeaderLabels={ false }>
			{ props.invoices.map( ( invoice ) => {
				return <CustomRow { ...invoice } key={ invoice.invoiceId }>
					<ColumnText className="column--subscription-invoice-date">
						<FormattedDate
							value={ invoice.invoiceDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnText>
					<ColumnText className="column--subscription-invoice-amount">
						{ props.intl.formatNumber(
							formatAmount( invoice.invoiceAmount ),
							{
								style: "currency",
								currency: invoice.invoiceCurrency,
								maximumFractionDigits: 0,
							}
						) }
					</ColumnText>
					<Column className="column--subscription-invoice-button">
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<IconButtonLink
								to={ getInvoiceUrl( invoice.invoiceId ) }
								iconSource={ downloadIcon }
								iconSize={ "16px" }>
								{ props.intl.formatMessage( messages.invoiceButton ) }
							</IconButtonLink>
						</MediaQuery>
					</Column>
				</CustomRow>;
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
						{ props.intl.formatMessage( messages.subscriptionDetailsTitle ) }
					</ListHeading>
					{ subscriptionDetailsTable }
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
	onAddSite: React.PropTypes.func.isRequired,
	onShop: React.PropTypes.string.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onInvoiceDownload: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	subscription: React.PropTypes.string,
};

export default injectIntl( SubscriptionDetails );
