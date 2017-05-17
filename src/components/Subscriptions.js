import React from "react";
import Subscription from "./Subscription";
import { ListTable } from "./Tables";
import Paper from "./Paper";


/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
export default function Subscriptions( props ) {
	return (
	<Paper>
		<ListTable>
			{ props.activeSubscriptions.map( function( subscription ) {
				let onManageHandler = () => {
					props.onManage( subscription.id );
				};
				return <Subscription
					key={ subscription.id }
					id={ subscription.id }
					iconSource={ subscription.icon }
					name={ subscription.name }
					used={ subscription.used }
					limit={ subscription.limit }
					nextPayment={ subscription.nextPayment }
					billingAmount={ subscription.billingAmount }
					billingCurrency={ subscription.billingCurrency }
					onManage={ onManageHandler }
				/>;
			} ) }
		</ListTable>
	</Paper>
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
				limit: React.PropTypes.number.isRequired,
				nextPayment: React.PropTypes.instanceOf( Date ).isRequired,
				billingAmount: React.PropTypes.number.isRequired,
				billingCurrency: React.PropTypes.string.isRequired,
			}
		)
	),
	activeSubscriptions: React.PropTypes.array,
	onManage: React.PropTypes.func.isRequired,
};
