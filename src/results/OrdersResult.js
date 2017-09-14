import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../functions/callbacks";
import { datePresenter, dollarPresenter, euroPresenter } from "../functions/presenters";

export default class OrdersResult extends React.Component {
	customerIdPresenter( id ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", attribute: "id", searchValue: id } );

		return <button type="button" onClick={ findCustomer }>Find Customer</button>;
	}

	/**
	 * Presents a items value using the ProductsResult component.
	 *
	 * @param {array} items The value to present.
	 *
	 * @returns {ReactElement} the ProductsResult component.
	 */
	static itemsPresenter( items ) {
		return <ul>{ items && items.map( item => <li key={ item.id }>{ item.productName }</li>)}</ul>;
	}

	managePresenter() {
		let url = `https://yoast.com/wp/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		if ( this.props.result.sourceShopId === 2 ) {
			url = `https://yoast.com/eu/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		}

		return <a href={ url } target="_blank">Manage order</a>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		let currencyPresenter = ( this.props.result.currency === "USD" ? dollarPresenter : euroPresenter );

		return <BaseResult { ...this.props }
						   customerIdPresenter={ this.customerIdPresenter.bind( this ) }
						   totalAmountPresenter={ currencyPresenter }
						   datePresenter={ datePresenter }
						   managePresenter={ this.managePresenter.bind( this ) }
						   itemsPresenter={ OrdersResult.itemsPresenter }/>;
	}
}
