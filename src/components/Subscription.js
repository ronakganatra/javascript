import React from "react";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { Table, Row, Column, ColumnText, Zebra } from "./Tables";
import { ColumnIcon } from "./ColumnIcon";
import Paper from "./Paper";
import SiteIcon from "./SiteIcon";
import { Link } from "react-router-dom";

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
export default function Subscription( props ) {
	let row = <Row>
		<ColumnIcon hideOnMobile={ true }><SiteIcon src={ props.subscriptionLogo } alt=""/></ColumnIcon>
		<ColumnText label="Product">{ props.productName }</ColumnText>
		<ColumnText hideOnMobile={ true } hideOnTablet={ true } label="Level" ColumnWidth="100px">{ props.level }</ColumnText>
		<ColumnText hideOnMobile={ true } label="Usage" ColumnWidth="100px">{ props.usage }</ColumnText>
		<ColumnText label="Next billing on" ColumnWidth="200px">{ props.nextBilling }</ColumnText>
		<ColumnText hideOnMobile={ true } hideOnTablet={ true } label="Amount"
		            ColumnWidth="100px">{ props.currency} { props.billingAmount }</ColumnText>
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
	</Row>;

	let rows = [ row, row ];

	return (
		<Table>
			<Paper>
				<Zebra>
					{ rows }
				</Zebra>
			</Paper>
		</Table>
	);
}

Subscription.propTypes = {
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.string ),
	columnIcon: React.PropTypes.string,
	subscriptionLogo: React.PropTypes.string,
	productName: React.PropTypes.string,
	level: React.PropTypes.string,
	usage: React.PropTypes.string,
	nextBilling: React.PropTypes.string,
	billingAmount: React.PropTypes.number,
	currency: React.PropTypes.string,
};

Subscription.defaultProps = {
	activeSubscriptions: [],
	subscriptionLogo: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
	productName: "SEO Premium for WordPress",
	level: "20 sites",
	usage: "14/20",
	nextBilling: "February 31st, 2016",
	// NextBilling: new Date(),
	billingAmount: 249,
	currency: "€",
};
