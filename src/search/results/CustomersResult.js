import React from "react";
import BaseResult from "./BaseResult";
import {getSearchCallback} from "../../functions/callbacks";

export default class CustomersResult extends React.Component {
	/**
	 * Sets the initial state for creating access tokens.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			accessTokenStatus: "notCreated",
			accessToken: null,
		};

		this.createAccessToken      = this.createAccessToken.bind( this );
		this.impersonatePresenter   = this.impersonatePresenter.bind( this );
		this.sitesPresenter         = this.sitesPresenter.bind( this );
		this.ordersPresenter        = this.ordersPresenter.bind( this );
		this.subscriptionsPresenter = this.subscriptionsPresenter.bind( this );
	}

	/**
	 * Creates an access token for the customer of this result.
	 *
	 * @returns {void}
	 */
	createAccessToken() {
		if ( ! this.props.result.enabled ) {
			return;
		}

		let self = this;

		this.setState( {
			accessTokenStatus: "creating",
		} );

		this.props.api.createAccessToken( this.props.result.id ).then( function ( result ) {
			self.setState({
				accessTokenStatus: "created",
				accessToken: result.id,
			});
		} );
	}

	/**
	 * Presents the current status of impersonating a user.
	 *
	 * @returns {ReactElement} An element corresponding to this component's internal access token status.
	 */
	impersonatePresenter() {
		if ( ! this.props.result.enabled ) {
			return <span>This customer has been deleted.</span>;
		}

		if ( this.state.accessTokenStatus === "notCreated" ) {
			return <button type="button" onClick={ this.createAccessToken }>Create Access Token</button>;
		}

		if ( this.state.accessTokenStatus === "creating" ) {
			return <span>Creating Access Token...</span>;
		}

		if ( this.state.accessTokenStatus === "created" ) {
			let url = this.props.api.host + "?access_token=" + this.state.accessToken + "&user_id=" + this.props.result.id;

			return <a href={ url } target="_blank">Impersonate user.</a>;
		}

		return <span>Invalid Access Token status.</span>;
	}

	/**
	 * Presents a button to search all of this user's sites.
	 *
	 * @returns {ReactElement} A button to search all of this user's sites.
	 */
	sitesPresenter() {
		let findSites = getSearchCallback( this.props.search, { resource: "Sites", filters: [ [ "userId", this.props.result.id ] ] } );

		return <button type="button" onClick={ findSites }>Find Sites</button>;
	}

	/**
	 * Presents a button to search all of this user's orders.
	 *
	 * @returns {ReactElement} A button to search all of this user's orders.
	 */
	ordersPresenter() {
		let findOrders = getSearchCallback( this.props.search, { resource: "Orders", filters: [ [ "customerId", this.props.result.id ] ] } );

		return <button type="button" onClick={ findOrders }>Find Orders</button>;
	}

	/**
	 * Presents a button to search all of this user's subscriptions.
	 *
	 * @returns {ReactElement} A button to search all of this user's subscriptions.
	 */
	subscriptionsPresenter() {
		let findSubscriptions = getSearchCallback( this.props.search, { resource: "Subscriptions", filters: [ [ "subscriberId", this.props.result.id ] ] } );

		return <button type="button" onClick={ findSubscriptions }>Find Subscriptions</button>;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return <BaseResult { ...this.props }
						   impersonatePresenter={ this.impersonatePresenter }
						   sitesPresenter={ this.sitesPresenter }
						   ordersPresenter={ this.ordersPresenter }
						   subscriptionsPresenter={ this.subscriptionsPresenter }/>
	}
}
