import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../functions/callbacks";
import { datePresenter } from "../functions/presenters";

export default class SubscriptionsResult extends React.Component {
	subscriberIdPresenter( id ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", attribute: "id", searchValue: id } );

		return <button type="button" onClick={ findCustomer }>Find Customer</button>;
	}

	/**
	 * Presents an orders value using the OrdersResult component.
	 *
	 * @param {Array} orders The value to present.
	 *
	 * @returns {ReactElement} the SubscriptionsResult component.
	 */
	ordersPresenter( orders ) {
		let items = orders && orders.map( function ( order ) {
			let orderFinder = getSearchCallback( this.props.search, { resource: "Orders", attribute: "id", searchValue: order.id } );

			return <li key={ order.id }><button onClick={ orderFinder.bind( this ) }>Find Order: #{ order.invoiceNumber }</button></li>;
		}, this );

		return <ul>{ items }</ul>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props }
						   startDatePresenter={ datePresenter }
						   endDatePresenter={ datePresenter }
						   nextPaymentPresenter={ datePresenter }
						   ordersPresenter={ this.ordersPresenter.bind( this ) }
						   subscriberIdPresenter={ this.subscriberIdPresenter.bind( this ) }/>;
	}
}
