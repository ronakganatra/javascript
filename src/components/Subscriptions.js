import React from "react";
import Subscription from "./Subscription";
import { Table, Zebra } from "./Tables";
import Paper from "./Paper";

// Example data, should eventually be fetched from the database
export const subscriptions = [
	{
		id: "3",
		icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		name: "SEO Premium for WordPress",
		used: 4,
		max: 20,
		nextBilling: "12/13/14",
		billingAmount: 125.12,
		billingCurrency: "$",
	},
	{
		id: "4",
		icon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		name: "SEO Premium for WordPress",
		used: 3,
		max: 20,
		nextBilling: "12/13/14",
		billingAmount: 125.12,
		billingCurrency: "$",
	},
];

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
export default function Subscriptions( props ) {
	return (
		<Table>
			<Paper>
				<Zebra>
					{ props.subscriptions.map( function( subscription ) {
						return <Subscription key={ subscription.id } id={ subscription.id } icon={ subscription.icon }
											 name={ subscription.name } used={ subscription.used }
											 max={ subscription.max } nextBilling={ subscription.nextBilling }
											 billingAmount={ subscription.billingAmount }
												 billingCurrency={ subscription.billingCurrency }
						/>;
					} )
					}
				</Zebra>
			</Paper>
		</Table>
	);
}

Subscriptions.propTypes = {
	subscriptions: React.PropTypes.arrayOf(
		React.PropTypes.shape(
			{
				id: React.PropTypes.string.isRequired,
				icon: React.PropTypes.string.isRequired,
				name: React.PropTypes.string.isRequired,
				used: React.PropTypes.number.isRequired,
				max: React.PropTypes.number.isRequired,
				nextBilling: React.PropTypes.any.isRequired,
				billingAmount: React.PropTypes.number.isRequired,
				billingCurrency: React.PropTypes.string.isRequired,
			}
		)
	),
};
