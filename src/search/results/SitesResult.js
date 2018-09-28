import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../../functions/callbacks";
import { datePresenter } from "../../functions/presenters";

export default class SitesResult extends React.Component {
	/**
	 * Constructs the component and binds several functions.
	 */
	constructor() {
		super();

		this.userIdPresenter        = this.userIdPresenter.bind( this );
		this.subscriptionsPresenter = this.subscriptionsPresenter.bind( this );
	}

	/**
	 * Presents a button to search for the owner of this site.
	 *
	 * @param {string} id The id of the owner.
	 *
	 * @returns {ReactElement} A button to search for the owner of this site.
	 */
	userIdPresenter( id ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", filters: [ [ "id", id ] ] } );

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
			let subscriptionFinder = getSearchCallback( this.props.search, { resource: "Subscriptions", filters: [ [ "id", subscription.id ] ] } );

			return <li key={ subscription.id }><button onClick={ subscriptionFinder.bind( this ) }>Find Subscription: { subscription.name }</button></li>;
		}, this );

		// eslint-disable-next-line jsx-a11y/no-redundant-roles
		return <ul role="list">{ items }</ul>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props }
						   userIdPresenter={ this.userIdPresenter }
						   creationDatePresenter={ datePresenter }
						   subscriptionsPresenter={ this.subscriptionsPresenter }/>
	}
}
