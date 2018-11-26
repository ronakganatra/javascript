/* eslint-disable */
import PropTypes from "prop-types";
import React from "react";
import SubscriptionRow from "./SubscriptionRow";
import { ListTable } from "../../Tables";
import { Paper } from "../../PaperStyles";
import { injectIntl } from "react-intl";
import forEach from "lodash/forEach";

/**
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered component.
 */
class Subscriptions extends React.Component {
	outputSubscriptionRows() {
		const subscriptionRows = [];
		forEach( this.props.subscriptions, ( subscriptionsGroupedByProduct ) => {
			subscriptionRows.push( subscriptionsGroupedByProduct );
		} );

		return subscriptionRows;
	}

	render() {
		return (
			<Paper>
				<ListTable>
					{
						this.outputSubscriptionRows()
							.map( ( subscriptionsArray ) => {
								return <SubscriptionRow
									key={ subscriptionsArray[ 0 ].id }
									subscriptionsArray={ subscriptionsArray }
									onManage={ this.props.onManage }
									isGrouped={ this.props.isGrouped }
									needsAttention={ this.props.needsAttention }
									showDetailsModal={ this.props.showDetailsModal }
								/>;
							} )
					}
				</ListTable>
			</Paper>
		);
	}
}

const subscriptionProps = PropTypes.oneOfType( [
	PropTypes.arrayOf(
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
				renewalUrl: PropTypes.string.isRequired,
			}
		)
	),
	PropTypes.object,
] );


Subscriptions.propTypes = {
	subscriptions: subscriptionProps,
	onManage: PropTypes.func.isRequired,
	isGrouped: PropTypes.bool,
	needsAttention: PropTypes.bool,
	showDetailsModal: PropTypes.func,
};

Subscriptions.defaultProps = {
	isGrouped: false,
	needsAttention: false,
	showDetailsModal: null,
};

export default injectIntl( Subscriptions );
