import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, Table, Zebra, Column } from "./Tables";
import { injectIntl, intlShape, FormattedDate } from "react-intl";

const SubscriptionDetailsContainer = styled.div`
	div:nth-child(even) {
		padding-left: 10px;
	}
	div:nth-child(odd) {
		padding-right: 10px;
	}
	background-color: ${ colors.$color_white };
`;

const ColumnContainer = styled.div`
	width: 50%
	float: left;
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
				<Table role="list" >
					<Zebra>
						<Row>
							<ColumnText>{ "Start Date" }</ColumnText>
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
				<Table  role="list" >
					<Zebra>
						{ props.invoices.map( ( invoice ) => {
							return <Row { ...invoice } key={ invoice.invoiceId }>
								<ColumnText><FormattedDate value={invoice.invoiceDate} /></ColumnText>
								<ColumnText>{ invoice.invoiceCurrency }{ invoice.invoiceAmount }</ColumnText>
								<ColumnText>{ props.onInvoiceDownload }</ColumnText>
							</Row>;
						} ) }
					</Zebra>
				</Table>
			</ColumnContainer>
			<ColumnContainer>
				<Table role="list" >
					<Zebra>
						<Row>
							<ColumnText>{ "You can add {} {} more sites to this subscription" }</ColumnText>
							<Column textAlign="right">
							</Column>
						</Row>
						<Row>
							<ColumnText>{ "Change subscription level" }</ColumnText>
							<Column textAlign="right">
							</Column>
						</Row>
						<Row>
							<ColumnText>{ "Cancel subscription" }</ColumnText>
							<Column textAlign="right">
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
	onAddSite: React.PropTypes.func.isRequired,
	onShop: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onInvoiceDownload: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

SubscriptionDetails.defaultProps = {
};

export default injectIntl( SubscriptionDetails );
