import React from "react";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import { Table, Row, Columns, Column, Zebra } from "./Tables";
import Paper from "./Paper";
import ColumnIcon from "./ColumIcon";
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
export default function SubscriptionComponent( props ) {
	return (
		<Table>
			<Paper>
				<Zebra>
					<Row>
						<Columns>
							<ColumnIcon subscriptionLogo={<SiteIcon src={ props.subscriptionLogo } alt="" />} />
							<Column ColumnWidth="400px">{ props.productName }</Column>
							<Column>{ props.level }</Column>
							<Column>{ props.usage }</Column>
							<Column>{ props.nextBilling }</Column>
							<Column>{ props.currency} { props.billingAmount }</Column>
							<Column>
								<MediaQuery query="(min-width: 1356px)">
									<Link to="/subscriptions/[id]" >
										<LargeButton aria-label="Manage">Manage</LargeButton>
									</Link>
								</MediaQuery>
								<MediaQuery query="(max-width: 1355px)">
									<Link to="/subscriptions/[id]">
										<ChevronButton aria-label="Manage" />
									</Link>
								</MediaQuery>
							</Column>
						</Columns>
					</Row>
				</Zebra>
			</Paper>
		</Table>
	);
}

SubscriptionComponent.propTypes = {
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

SubscriptionComponent.defaultProps = {
	activeSubscriptions: [],
	subscriptionLogo: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
	productName: "SEO Premium for WordPress",
	level: "20 sites",
	usage: "14 of 20",
	nextBilling: "morgen",
	// NextBilling: new Date(),
	billingAmount: 249,
	currency: "€",
};
