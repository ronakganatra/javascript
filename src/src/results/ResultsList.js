import React from "react";
import CustomersResult from "./CustomersResult";
import OrdersResult from "./OrdersResult";
import BaseResult from "./BaseResult";
import SitesResult from "./SitesResult";
import SubscriptionsResult from "./SubscriptionsResult";

const Results = {
	Customers: CustomersResult,
	Orders: OrdersResult,
	Sites: SitesResult,
	Subscriptions: SubscriptionsResult
};

export default class ResultsList extends React.Component {
	/**
	 * Creates a Result component based on the given element for the given result.
	 *
	 * @param {Object} result  The result to display.
	 *
	 * @returns {ReactElement} The element for this result.
	 */
	getResultElement( result ) {
		let Element = Results[ this.props.resource ] || BaseResult;

		return <Element
			key={ result.id }
			result={ result }
			api={ this.props.api }
			search={ this.props.search }/>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<div>
				{ this.props.results.map( this.getResultElement, this ) }
			</div>
		)
	}
}
