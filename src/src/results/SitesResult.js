import React from "react";
import BaseResult from "./BaseResult";
import SubscriptionsResult from "./SubscriptionsResult";

export default class SitesResult extends React.Component {
	/**
	 * Presents a subscriptions value using the SubscriptionsResult component.
	 *
	 * @param {string} attribute    The attribute to present.
	 * @param {*}      subscription The value to present.
	 * @param {string} key          The key to use for components that present this object.
	 *
	 * @returns {ReactElement} the SubscriptionsResult component.
	 */
	subscriptionsValuePresenter( attribute, subscription, key ) {
		return <SubscriptionsResult key={ key } result={ subscription }/>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props } subscriptionsValuePresenter={ this.subscriptionsValuePresenter }/>
	}
}
