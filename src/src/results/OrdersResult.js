import React from "react";
import BaseResult from "./BaseResult";
import { getSearchCallback } from "../functions/callbacks";

export default class OrdersResult extends React.Component {
	customerIdPresenter( attribute, id, key ) {
		let findCustomer = getSearchCallback( this.props.search, { resource: "Customers", attribute: "id", searchValue: id } );

		return <button key={ key } type="button" onClick={ findCustomer }>Find Customer</button>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		let url = `https://yoast.com/wp/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		if ( this.props.result.sourceShopId === 2 ) {
			url = `https://yoast.com/eu/wp-admin/post.php?post=${ this.props.result.sourceId }&action=edit`;
		}

		let urlKey = this.props.result.id + '-url';
		let urlRow = (
			<tr key={ urlKey }>
				<th>Url</th>
				<td><a href={ url } target="_blank">Manage order</a></td>
			</tr>
		);

		return <BaseResult { ...this.props }
			additionalRows={ [ urlRow ] }
			customerIdPresenter={ this.customerIdPresenter }/>
	}
}
