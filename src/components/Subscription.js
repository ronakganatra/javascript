import React from "react";
import { ColumnIcon } from "./ColumnIcon";
import { Row, ColumnText, Column } from "./Tables";
import SiteIcon from "./SiteIcon";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { Link } from "react-router-dom";

/**
 * Creates a subscription element
 *
 * @param {object} props Properties of the element.
 * @returns {JSX.Element} Subscription element.
 * @constructor
 */
export default function Subscription( props ) {
	let rowProps = Object.assign( {}, props );

	// Possibly prettify this.
	delete rowProps.id;
	delete rowProps.name;
	delete rowProps.icon;
	delete rowProps.used;
	delete rowProps.max;
	delete rowProps.nextBilling;
	delete rowProps.billingCurrency;
	delete rowProps.billingAmount;

	return (
		<Row key={ props.id } { ...rowProps }>
			<ColumnIcon separator={ true } hideOnMobile={ true }><SiteIcon src={ props.icon } alt=""/></ColumnIcon>
			<ColumnText label="Product">{ props.name }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label="Level" ColumnWidth="100px">{ props.max }</ColumnText>
			<ColumnText hideOnMobile={ true } label="Usage" ColumnWidth="100px">{ props.used } / { props.max }</ColumnText>
			<ColumnText label="Next billing on" ColumnWidth="200px">{ props.nextBilling }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } label="Amount"
			            ColumnWidth="100px">{ props.billingCurrency } { props.billingAmount }</ColumnText>
			<Column textAlign="right">
				<MediaQuery query="(min-width: 1356px)">
					<Link to="/subscriptions/[id]">
						<LargeButton aria-label="Manage">Manage</LargeButton>
					</Link>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
				<Link to="/subscriptions/[id]">
				<ChevronButton aria-label="Manage"/>
				</Link>
				</MediaQuery>
			</Column>
		</Row>
	);
}

Subscription.propTypes = {
	id: React.PropTypes.string.isRequired,
	icon: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	used: React.PropTypes.number.isRequired,
	max: React.PropTypes.number.isRequired,
	nextBilling: React.PropTypes.string.isRequired,
	billingAmount: React.PropTypes.string.isRequired,
	billingCurrency: React.PropTypes.string.isRequired,
};
