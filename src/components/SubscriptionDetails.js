import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, Table, Zebra, Column } from "./Tables";
import { injectIntl, intlShape, FormattedDate, FormattedMessage } from "react-intl";
import MediaQuery from "react-responsive";
import { IconButton } from "./Button";
import downloadIcon from "../icons/download.svg";
import { LargeButton, RedButton } from "./Button";

let columnMargin = "10px";
let hideButtonsThreshold = 1355;
let mobileViewThreshold = 800;

const SubscriptionDetailsContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
	width: 100%;
	height: 700px;
	@media screen and ( min-width: ${ mobileViewThreshold }px ) {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		div:nth-child(-n+2) {
			margin-right: ${ columnMargin };
		}
		div:nth-child(3) {
			margin-left: ${ columnMargin };
		}
	}
`;

const ColumnContainer = styled.div`
	@media screen and ( min-width: ${ mobileViewThreshold }px ) { 
		width: calc( 50% - ${ columnMargin } );
	}
	@media screen and ( max-width: ${ mobileViewThreshold }px ) { 
		width: calc( 100% - ${ columnMargin } );
	}
`;

const ListHeader = styled.h2`
	font-size: 1.0em;
	font-weight: 400; 
	margin: 30px 0 0 30px;
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
	return (
		<SubscriptionDetailsContainer>
				<ColumnContainer>
				<ListHeader>
					<FormattedMessage id="subscriptions.payment-details.header" defaultMessage="Payment details" />
				</ListHeader>
				<Table headings={ false } role="list" >
					<Zebra>
						<Row>
							<ColumnText ColumnWidth="20%">{ "Start Date" }</ColumnText>
							<ColumnText> <FormattedDate value={props.startDate} /> </ColumnText>
						</Row>
						<Row>
							<ColumnText>{ "Next Billing" }</ColumnText>
							<ColumnText> <FormattedDate value={props.nextBilling} /> </ColumnText>
						</Row>
					</Zebra>
				</Table>
			</ColumnContainer>
				<ColumnContainer>
					<ListHeader>
						<FormattedMessage id="subscriptions.invoices.header" defaultMessage="Invoices" />
					</ListHeader>
					<Table headings={ false } role="list" >
						<Zebra>
							{ props.invoices.map( ( invoice ) => {
								return <Row { ...invoice } key={ invoice.invoiceId }>
									<ColumnText><FormattedDate value={invoice.invoiceDate} /></ColumnText>
									<ColumnText>{ invoice.invoiceCurrency }{ invoice.invoiceAmount }</ColumnText>
									<Column>
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
				</ColumnContainer>
				<ColumnContainer>
					<ListHeader>
						<FormattedMessage id="subscriptions.subscription-details.header" defaultMessage="Subscription details" />
					</ListHeader>
					<Table headings={ false } role="list" >
						<Zebra>
							<Row>
								<ColumnText>
									<FormattedMessage id="subscriptionss.site-subscriptions-remaining"
													  defaultMessage={" You can add { howMany } more sites to this subscription."}
													  values={ { howMany: ( props.max - props.current ) } }/>
								</ColumnText>
								<Column>
									<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
										<LargeButton onClick={ props.onAddSite }><FormattedMessage
											id="subscriptions.buttons.add-site" defaultMessage="Add site" />
										</LargeButton>
									</MediaQuery>
								</Column>
							</Row>
							<Row>
								<ColumnText>{ "Change subscription level" }</ColumnText>
								<Column>
									<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
										<LargeButton onClick={ props.onShop }><FormattedMessage
											id="subscriptions.buttons.shop" defaultMessage="Shop" />
										</LargeButton>
									</MediaQuery>
								</Column>
							</Row>
							<Row>
								<ColumnText>{ "Cancel subscription" }</ColumnText>
								<Column>
									<MediaQuery query={ "(min-width: " + ( hideButtonsThreshold + 1 ) + "px)" }>
										<RedButton onClick={ props.onCancel }><FormattedMessage
											id="subscriptions.buttons.cancel" defaultMessage="Cancel" />
										</RedButton>
									</MediaQuery>
								</Column>
							</Row>
						</Zebra>
					</Table>
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
