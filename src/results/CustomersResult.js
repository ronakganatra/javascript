import React, {Component} from "react";
import BaseResult from "./BaseResult";
import {getSearchCallback} from "../functions/callbacks";

export default class CustomersResult extends Component {
	/**
	 * Sets the initial state for creating access tokens.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.state = {
			accessTokenStatus: "notCreated",
			accessToken: null,
		};

		this.createAccessToken = this.createAccessToken.bind( this );
	}

	/**
	 * Creates an access token for the customer of this result.
	 *
	 * @returns {void}
	 */
	createAccessToken() {
		let self = this;

		this.setState({
			accessTokenStatus: "creating",
		});

		this.props.api.createAccessToken( this.props.result.id ).then( function ( result ) {
			self.setState({
				accessTokenStatus: "created",
				accessToken: result.id,
			});
		} );
	}

	getAccessTokenElement() {
		if ( this.state.accessTokenStatus === "notCreated" ) {
			return <button type="button" onClick={this.createAccessToken}>Create Access Token</button>;
		}

		if ( this.state.accessTokenStatus === "creating" ) {
			return <span>Creating Access Token...</span>;
		}

		if ( this.state.accessTokenStatus === "created" ) {
			let url = this.props.api.host + "?access_token=" + this.state.accessToken + "&user_id=" + this.props.result.id;

			return <a href={url} target="_blank">Impersonate user.</a>;
		}

		return <span>Invalid Access Token status.</span>;
	}

	/**
	 * Renders this component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		let accessTokenStatus = this.getAccessTokenElement();

		let findSites = getSearchCallback( this.props.search, { resource: "Sites", attribute: "userId", searchValue: this.props.result.id } );
		let findOrders = getSearchCallback( this.props.search, { resource: "Orders", attribute: "customerId", searchValue: this.props.result.id } );
		let findSubscriptions = getSearchCallback( this.props.search, { resource: "Subscriptions", attribute: "subscriberId", searchValue: this.props.result.id } );

		let impersonateKey = this.props.result.id + '-impersonate';
		let impersonateRow = (
			<tr key={ impersonateKey }>
				<th>impersonate</th>
				<td>{ accessTokenStatus }</td>
			</tr>
		);

		let sitesKey = this.props.result.id + '-sites';
		let sitesRow = (
			<tr key={ sitesKey }>
				<th>sites</th>
				<td>
					<button type="button" onClick={ findSites }>Find Sites</button>
				</td>
			</tr>
		);

		let ordersKey = this.props.result.id + '-orders';
		let ordersRow = (
			<tr key={ ordersKey }>
				<th>orders</th>
				<td>
					<button type="button" onClick={ findOrders }>Find Orders</button>
				</td>
			</tr>
		);

		let subscriptionsKey = this.props.result.id + '-subscriptions';
		let subscriptionsRow = (
			<tr key={ subscriptionsKey }>
				<th>subscriptions</th>
				<td>
					<button type="button" onClick={ findSubscriptions }>Find Subscriptions</button>
				</td>
			</tr>
		);


		return <BaseResult { ...this.props } additionalRows={ [ impersonateRow, sitesRow, ordersRow, subscriptionsRow ] }/>
	}
}
