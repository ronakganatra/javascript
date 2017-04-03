/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
import React from "react";
import { Table, Zebra } from "./Tables";
import Paper from "./Paper";
import Subscription from "./Subscription";

/**
 * Creates a subscriptions element
 * @param {object} props Properties of the element.
 * @returns {ReactElement} Subscriptions element.
 * @constructor
 */
export default function Subscriptions( props ) {
	return (
		<Table>
			<Paper>
				<Zebra>
					<Subscription id="a" icon={ props.subscriptionLogo } name={ props.productName }
					              used={ props.usage } max={ props.max }
					              nextBilling={ props.nextBilling }
					              billingAmount={ props.billingAmount }
					              billingCurrency={ props.currency } />
					<Subscription id="b" icon={ props.subscriptionLogo } name={ props.productName }
					              used={ props.usage } max={ props.max }
					              nextBilling={ props.nextBilling }
					              billingAmount={ props.billingAmount }
					              billingCurrency={ props.currency } />
				</Zebra>
			</Paper>
		</Table>
	);
}

Subscriptions.propTypes = {
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.string ),
	columnIcon: React.PropTypes.string,
	subscriptionLogo: React.PropTypes.string,
	productName: React.PropTypes.string,
	max: React.PropTypes.number,
	usage: React.PropTypes.number,
	nextBilling: React.PropTypes.string,
	billingAmount: React.PropTypes.number,
	currency: React.PropTypes.string,
};

Subscriptions.defaultProps = {
	activeSubscriptions: [],
	subscriptionLogo: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
	productName: "SEO Premium for WordPress",
	max: 20,
	usage: 14,
	nextBilling: "February 31st, 2016",
	// NextBilling: new Date(),
	billingAmount: 249,
	currency: "€",
};
