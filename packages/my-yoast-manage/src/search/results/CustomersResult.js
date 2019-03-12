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
			restored: false,
		};

		this.createAccessToken      = this.createAccessToken.bind( this );
		this.enableCustomer         = this.enableCustomer.bind( this );
		this.actionsPresenter       = this.actionsPresenter.bind( this );
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
		if ( ! this.props.result.enabled && ! this.state.restored ) {
			return;
		}

		this.setState( {
			accessTokenStatus: "creating",
		} );

		this.props.api.createAccessToken( this.props.result.id ).then( ( result ) => {
			this.setState( {
				accessTokenStatus: "created",
				accessToken: result.id,
			} );
		} );
	}

	enableCustomer() {
		this.props.api.enableCustomer( this.props.result.id ).then( () => {
			this.setState( { restored: true } );
		} );
	}

	actionsPresenter() {
		let financeActions = null;
		if ( this.props.accessibleByRoles( [ 'finance' ] ) ) {
			financeActions = <div key="financeActions">{ this.financeActions() }</div>;
		}

		let supportActions = null;
		if ( this.props.accessibleByRoles( [ 'support' ] ) ) {
			supportActions = <div key="supportActions">{ this.supportActions() }</div>;
		}

		return (
			<div>
				{ financeActions }
				{ supportActions }
			</div>
		);
	}

	financeActions() {
		let findCustomerNotes = getSearchCallback( this.props.search, { resource: "CustomerNotes", filters: [ [ "customerId", this.props.result.id ] ] } );

		return <button type="button" onClick={ findCustomerNotes }>Show notes</button>;
	}

	/**
	 * Presents the current status of impersonating a user.
	 *
	 * @returns {ReactElement} An element corresponding to this component's internal access token status.
	 */
	supportActions() {
		if ( ! this.props.result.enabled && ! this.state.restored ) {
			return (
				<span>
					This customer has been deleted.
					<button type="button" onClick={ this.enableCustomer }>Revert</button>
				</span>
			);
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
						   actionsPresenter={ this.actionsPresenter }
						   sitesPresenter={ this.sitesPresenter }
						   ordersPresenter={ this.ordersPresenter }
						   subscriptionsPresenter={ this.subscriptionsPresenter }/>
	}
}
