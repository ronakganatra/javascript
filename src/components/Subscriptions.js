import PropTypes from "prop-types";
import React from "react";
import Subscription from "./Subscription";
import { ListTable } from "./Tables";
import { Paper } from "./PaperStyles";

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
			{ props.subscriptions.map( function( subscription ) {
				let onManageHandler = () => {
					props.onManage( subscription.id );
				};
				return <Subscription
					key={ subscription.id }
					id={ subscription.id }
					iconSource={ subscription.icon }
					name={ subscription.name }
					subscriptionNumber={ subscription.subscriptionNumber }
					status={subscription.status}
					used={ subscription.used }
					limit={ subscription.limit }
					billingType={ subscription.billingType }
					hasNextPayment={ subscription.hasNextPayment }
					nextPayment={ subscription.nextPayment }
					hasEndDate={ subscription.hasEndDate }
					endDate={ subscription.endDate }
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
	subscriptions: PropTypes.arrayOf(
		PropTypes.shape(
			{
				id: PropTypes.string.isRequired,
				icon: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				used: PropTypes.number.isRequired,
				limit: PropTypes.number.isRequired,
				hasNextPayment: PropTypes.bool.isRequired,
				nextPayment: PropTypes.instanceOf( Date ).isRequired,
				hasEndDate: PropTypes.bool.isRequired,
				endDate: PropTypes.instanceOf( Date ).isRequired,
				billingAmount: PropTypes.number.isRequired,
				billingCurrency: PropTypes.string.isRequired,
				status: PropTypes.string.isRequired,
			}
		)
	),
	onManage: PropTypes.func.isRequired,
};
