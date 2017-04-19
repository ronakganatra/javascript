/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, Table, Zebra } from "./Tables";
import Paper from "./Paper";

const SubscriptionDetailsContainer = styled.div`
	height: 300px;
	background-color: ${ colors.$color_white };
`;

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered paymentDetailsTable component.
 */
export function paymentDetailsTable( props ) {
	return (
		<Table  headings={ false } role="list" >
			<Paper>
				<Zebra>
					<Row key="1" >
						<ColumnText>{ "Start date" }</ColumnText>
						<ColumnText>{ "7 October 2017" }</ColumnText>
					</Row>
					<Row key="2" >
						<ColumnText>{ "Start date" }</ColumnText>
						<ColumnText>{ "8 October 2017" }</ColumnText>
					</Row>
				</Zebra>
			</Paper>
		</Table>
	);
}

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered SubscriptionDetails component.
 *
 * @constructor
 */
export default function SubscriptionDetails( props ) {
	return (
		<SubscriptionDetailsContainer>
			<paymentDetailsTable />
		</SubscriptionDetailsContainer>
	);
}

paymentDetailsTable.propTypes = {
	subscriptions: React.PropTypes.arrayOf(
		React.PropTypes.shape(
			{
				id: React.PropTypes.string.isRequired,
				icon: React.PropTypes.string.isRequired,
				name: React.PropTypes.string.isRequired,
				used: React.PropTypes.number.isRequired,
				max: React.PropTypes.number.isRequired,
				nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
				billingAmount: React.PropTypes.number.isRequired,
				billingCurrency: React.PropTypes.string.isRequired,
			}
		)
	),
};

paymentDetailsTable.defaultProps = {
};
