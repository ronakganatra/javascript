import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../functions/callbacks";
import { datePresenter } from "../functions/presenters";

export default class SitesResult extends React.Component {
	userIdPresenter( id ) {
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
	subscriptionsPresenter( subscriptions ) {
		let items = subscriptions && subscriptions.map( function ( subscription ) {
			let subscriptionFinder = getSearchCallback( this.props.search, { resource: "Subscriptions", attribute: "id", searchValue: subscription.id } );

			return <li key={ subscription.id }><button onClick={ subscriptionFinder.bind( this ) }>Find Subscription: #{ subscription.name }</button></li>;
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
						   userIdPresenter={ this.userIdPresenter.bind( this ) }
						   creationDatePresenter={ datePresenter }
						   subscriptionsPresenter={ this.subscriptionsPresenter.bind( this ) }/>
	}
}
