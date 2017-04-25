import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, Table, Zebra, Column } from "./Tables";
import { injectIntl, intlShape, FormattedDate, FormattedMessage, defineMessages } from "react-intl";
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
} );

const SubscriptionDetailsContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
	width: 100%;
	@media screen and ( min-width: ${ mobileViewThreshold }px ) {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
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
	font-size: 1.0em;
	font-weight: 400; 
	padding: 30px 0 0 30px;
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
	let paymentDetailTable =  (
		<Table headings={ false } role="list" >
			<Zebra>
				<Row justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="30%">{ "Start Date" }</ColumnText>
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="30%"> <FormattedDate value={ props.startDate } /> </ColumnText>
				</Row>
				<Row justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="30%">{ "Next Billing" }</ColumnText>
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="30%"> <FormattedDate value={ props.nextBilling } /> </ColumnText>
				</Row>
			</Zebra>
		</Table>
	);

	let subscriptionDetailsTable = (
		<Table headings={ false } role="list" >
			<Zebra>
				<Row justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="60%">
						<FormattedMessage id="subscriptionss.site-subscriptions-remaining"
										  defaultMessage={" You can add { howMany } more sites to this subscription."}
										  values={ { howMany: ( props.max - props.current ) } }/>
					</ColumnText>
					<Column columnPaddingLeft={ 20 }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButton onClick={ props.onAddSite }><FormattedMessage
								id="subscriptions.buttons.add-site" defaultMessage="Add site" />
							</LargeButton>
						</MediaQuery>
					</Column>
				</Row>
				<Row justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="60%">{ "Change subscription level" }</ColumnText>
					<Column columnPaddingLeft={ 20 }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<LargeButton onClick={ props.onShop }><FormattedMessage
								id="subscriptions.buttons.shop" defaultMessage="Shop" />
							</LargeButton>
						</MediaQuery>
					</Column>
				</Row>
				<Row justifyContent="space-between" rowPaddingRight="20px">
					<ColumnText columnPaddingLeft={ 20 } ColumnWidth="60%">{ "Cancel subscription" }</ColumnText>
					<Column columnPaddingLeft={ 20 }>
						<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
							<RedButton onClick={ props.onCancel }><FormattedMessage
								id="subscriptions.buttons.cancel" defaultMessage="Cancel" />
							</RedButton>
						</MediaQuery>
					</Column>
				</Row>
			</Zebra>
		</Table>
	);

	let invoicesTable = (
		<Table headings={ false } role="list" >
			<Zebra>
				{ props.invoices.map( ( invoice ) => {
					return <Row { ...invoice } key={ invoice.invoiceId } justifyContent="space-between" rowPaddingRight="20px">
						<ColumnText columnPaddingLeft={ 20 } ColumnWidth="20%"><FormattedDate value={invoice.invoiceDate} /></ColumnText>
						<ColumnText columnPaddingLeft={ 20 } ColumnWidth="20%">{ invoice.invoiceCurrency }{ invoice.invoiceAmount }</ColumnText>
						<Column columnPaddingLeft={ 20 } ColumnWidth="20%">
							<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
								<IconButton onClick={ props.onInvoiceDownload }
											icon={ downloadIcon }
											iconSize={ "16px" }>
									<FormattedMessage
										id="subscriptions.buttons.download-invoice" defaultMessage="Invoice" />
								</IconButton>
							</MediaQuery>
						</Column>
					</Row>;
				} ) }
			</Zebra>
		</Table>
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

SubscriptionDetails.defaultProps = {
};

export default injectIntl( SubscriptionDetails );
