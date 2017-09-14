import React, {Component} from "react";
import BaseResult from "./BaseResult";
import OrdersResult from "./OrdersResult";

export default class SubscriptionsResult extends Component {
	/**
	 * Presents an orders value using the OrdersResult component.
	 *
	 * @param {string} attribute The attribute to present.
	 * @param {*}      order     The value to present.
	 * @param {string} key       The key to use for components that present this object.
	 *
	 * @returns {ReactElement} the SubscriptionsResult component.
	 */
	ordersValuePresenter( attribute, order, key ) {
		return <OrdersResult key={ key } result={ order }/>;
	}

	/**
	 * Renders this component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props } ordersValuePresenter={ this.ordersValuePresenter }/>
	}
}
