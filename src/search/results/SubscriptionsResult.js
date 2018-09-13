import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../../functions/callbacks";
import { datePresenter } from "../../functions/presenters";

export default class SubscriptionsResult extends React.Component {
	/**
	 * Constructs the component and binds several functions.
	 */
	constructor() {
		super();

		this.subscriberIdPresenter = this.subscriberIdPresenter.bind( this );
		this.ordersPresenter       = this.ordersPresenter.bind( this );
	}

	/**
	 * Presents the subscriberId as a button to find that subscriber.
	 *
	 * @param {string} id The ID of the subscriber.
	 *
	 * @returns {ReactElement} A button to find the subscriber.
	 */
	subscriberIdPresenter( id ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", filters: [ [ "id", id ] ] } );

		return <button type="button" onClick={ findCustomer }>Find Customer</button>;
	}

	/**
	 * Presents the orders value as a list of buttons to find related orders.
	 *
	 * @param {Array} orders The value to present.
	 *
	 * @returns {ReactElement} A list of buttons to find the orders.
	 */
	ordersPresenter( orders ) {
		let items = orders && orders.map( function ( order ) {
			let orderFinder = getSearchCallback( this.props.search, { resource: "Orders", filters: [ [ "id", order.id ] ] } );

			return <li key={ order.id }><button onClick={ orderFinder.bind( this ) }>Find Order: #{ order.invoiceNumber }</button></li>;
		}, this );

		/* eslint-disable-next-line jsx-a11y/no-redundant-roles */
		return <ul role="list">{ items }</ul>;
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
						   ordersPresenter={ this.ordersPresenter }
						   subscriberIdPresenter={ this.subscriberIdPresenter }/>;
	}
}
