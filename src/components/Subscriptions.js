import React from "react";
import Subscription from "./Subscription";
import { Table, Zebra } from "./Tables";
import Paper from "./Paper";

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
						return <Subscription
							key={ subscription.id }
							id={ subscription.id }
							icon={ subscription.icon }
							name={ subscription.name }
							used={ subscription.used }
							max={ subscription.max }
							nextBilling={ subscription.nextBilling }
							billingAmount={ subscription.billingAmount }
							billingCurrency={ subscription.billingCurrency }
							onManage={ () => {} }
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
				nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
				billingAmount: React.PropTypes.number.isRequired,
				billingCurrency: React.PropTypes.string.isRequired,
			}
		)
	),
};
