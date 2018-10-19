import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../../functions/callbacks";
import { datePresenter, currencyPresenter } from "../../functions/presenters";
import { getOrderUrl } from "../../functions/helpers";

export default class OrdersResult extends React.Component {
	/**
	 * Constructs the component and binds several functions.
	 */
	constructor() {
		super();

		this.customerIdPresenter  = this.customerIdPresenter.bind( this );
		this.totalAmountPresenter = this.totalAmountPresenter.bind( this );
		this.itemsPresenter       = this.itemsPresenter.bind( this );
		this.managePresenter      = this.managePresenter.bind( this );
	}

	/**
	 * Presents a button to search for the customer of this order.
	 *
	 * @param {string} id The id of the customer.
	 *
	 * @returns {ReactElement} A button to search for the customer of this order.
	 */
	customerIdPresenter( id ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", filters: [ [ "id", id ] ] } );

		return <button type="button" onClick={ findCustomer }>Find Customer</button>;
	}

	/**
	 * Presents a items value using the ProductsResult component.
	 *
	 * @param {array} items The value to present.
	 *
	 * @returns {ReactElement} the ProductsResult component.
	 */
	itemsPresenter( items ) {
		// eslint-disable-next-line jsx-a11y/no-redundant-roles
		let list = items && items.map( item => {
			let subscription = this.props.result.subscriptions.find( subscription => subscription.productId === item.productId );

			let button = null;
			if ( subscription ) {
				let subscriptionFinder = getSearchCallback( this.props.search, { resource: "Subscriptions", filters: [ [ "id", subscription.id ] ] } );

				button = <button onClick={ subscriptionFinder.bind( this ) }>Find Subscription: #{ subscription.subscriptionNumber }</button>;
			}

			return (
				<li key={ item.id }>
					{ item.productName }
					&nbsp;
					{ button }
				</li>
			)
		} );

		return <ul role="list">{ list }</ul>;
	}

	/**
	 * Presents a link to manage this order in the WooCommerce backend.
	 *
	 * @returns {ReactElement} A link to manage this order in the WooCommerce backend.
	 */
	managePresenter() {
		let url = getOrderUrl( this.props.result.sourceId, this.props.result.sourceShopId );

		return <a href={ url } target="_blank">Manage order</a>;
	}

	totalAmountPresenter() {
		return currencyPresenter( this.props.result.currency, this.props.result.totalAmount );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props }
						   customerIdPresenter={ this.customerIdPresenter }
						   totalAmountPresenter={ this.totalAmountPresenter }
						   datePresenter={ datePresenter }
						   managePresenter={ this.managePresenter }
						   itemsPresenter={ this.itemsPresenter }/>;
	}
}
