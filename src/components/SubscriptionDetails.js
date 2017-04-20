import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { ColumnText, Row, Table, Zebra } from "./Tables";

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
			<ColumnContainer>
				<Table  headings={ false } role="list" >
					<Zebra>
						<Row key="1" >
							<ColumnText>{props.startDate}</ColumnText>
							<ColumnText>{ "7 October 2017" }</ColumnText>
						</Row>
						<Row key="2" >
							<ColumnText>{ "Start date" }</ColumnText>
							<ColumnText>{ "8 October 2017" }</ColumnText>
						</Row>
					</Zebra>
				</Table>
			</ColumnContainer>
			<ColumnContainer>
				<Table  headings={ false } role="list" >
					<Zebra>
						<Row key="1" >
							<ColumnText>{props.startDate}</ColumnText>
							<ColumnText>{ "7 October 2017" }</ColumnText>
						</Row>
						<Row key="2" >
							<ColumnText>{ "Start date" }</ColumnText>
							<ColumnText>{ "8 October 2017" }</ColumnText>
						</Row>
					</Zebra>
				</Table>
			</ColumnContainer>
			<ColumnContainer>
				<Table  headings={ false } role="list" >
					<Zebra>
						<Row key="1" >
							<ColumnText>{props.startDate}</ColumnText>
							<ColumnText>{ "7 October 2017" }</ColumnText>
						</Row>
						<Row key="2" >
							<ColumnText>{ "Start date" }</ColumnText>
							<ColumnText>{ "8 October 2017" }</ColumnText>
						</Row>
					</Zebra>
				</Table>
			</ColumnContainer>
		</SubscriptionDetailsContainer>
	);
}

SubscriptionDetails.propTypes = {
	startDate: React.PropTypes.string,
};

SubscriptionDetails.defaultProps = {
};
