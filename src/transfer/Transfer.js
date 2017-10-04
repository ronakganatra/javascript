import React from "react";
import { withRouter } from "react-router-dom";
import FindCustomer from "./FindCustomer";
import TransferPreview from "./TransferPreview";
import _merge from "lodash/merge";

export const InitialState = {
	fromCustomer:   null,
	toCustomer:     null,
	previewReady:   false,
	orders:         null,
	subscriptions:  null,
	sites:          null,
	myYoastFetched: false,
	usShop:         false,
	usShopData:     null,
	usTransfer:     false,
	euShop:         false,
	euShopData:     null,
	euTransfer:     false,
};

class Transfer extends React.Component {
	constructor() {
		super();

		this.state = InitialState;

		this.reset          = this.reset.bind( this );
		this.transfer       = this.transfer.bind( this );
		this.selectCustomer = this.selectCustomer.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		let state = nextProps.location.state;

		if ( nextProps.history.action === "PUSH" ) {
			return;
		}

		this.setState( _merge( {}, InitialState, state ) );

		if ( state && state.fromCustomer && state.toCustomer ) {
			this.getPreview();
		}
	}

	reset() {
		this.setState( InitialState );
	}

	transfer() {
		let api    = this.props.api;
		let fromId = this.state.fromCustomer.sourceId;
		let toId   = this.state.toCustomer.sourceId;
		let usShop = this.state.usShop;
		let euShop = this.state.euShop;

		if ( usShop ) {
			api.wooTransfer( fromId, toId, 1 ).then( result => this.setState( { usTransfer: true } ) );
		}

		if ( euShop ) {
			api.wooTransfer( fromId, toId, 2 ).then( result => this.setState( { euTransfer: true } ) );
		}
	}

	selectCustomer( customer ) {
		if ( this.state.fromCustomer === null ) {
			this.setState( { fromCustomer: customer } );
			this.props.history.push( "/transfer", { fromCustomer: customer } );
			return;
		}

		this.setState( { toCustomer: customer } );
		this.props.history.push( "/transfer", { fromCustomer: this.state.fromCustomer, toCustomer: customer } );
		this.getPreview();
	}

	getPreview() {
		let id  = this.state.fromCustomer.id;
		let api = this.props.api;

		let promises = [
			api.search( "Orders", { where: { customerId: id } } ).then( results => this.setState( { orders: results } ) ),
			api.search( "Subscriptions", { where: { subscriberId: id } } ).then( results => this.setState( { subscriptions: results } ) ),
			api.search( "Sites", { where: { userId: id } } ).then( results => this.setState( { sites: results } ) ),
		];

		Promise.all( promises ).then( () => {
			let fromId = this.state.fromCustomer.sourceId;
			let toId   = this.state.toCustomer.sourceId;
			let usShop = this.state.orders.some( order => order.sourceShopId === 1 ) || this.state.subscriptions.some( subscription => subscription.sourceShopId === 1 );
			let euShop = this.state.orders.some( order => order.sourceShopId === 2 ) || this.state.subscriptions.some( subscription => subscription.sourceShopId === 2 );

			this.setState( { euShop, usShop, myYoastFetched: true } );

			if ( usShop ) {
				api.wooTransferPreview( fromId, toId, 1 ).then( result => this.setState( { usShopData: result } ) );
			}

			if ( euShop ) {
				api.wooTransferPreview( fromId, toId, 2 ).then( result => this.setState( { euShopData: result } ) );
			}
		} );
	}

	hasCustomers() {
		return ( this.state.fromCustomer !== null && this.state.toCustomer !== null );
	}

	hasPreview() {
		// Check if data has been received for MyYoast and if data should be received for one of the shops check if it has been.
		return (
			this.state.myYoastFetched &&
			( this.state.usShop === false || this.state.usShopData !== null ) &&
			( this.state.euShop === false || this.state.euShopData !== null )
		);
	}

	hasTransferred() {
		return (
			( this.state.usShop === false || this.state.usTransfer ) &&
			( this.state.euShop === false || this.state.euTransfer )
		);
	}

	render() {
		if ( ! this.hasCustomers() ) {
			return (
				<div>
					{ this.state.fromCustomer && <p>From customer: { this.state.fromCustomer.userEmail } ( { this.state.fromCustomer.username } )</p> }
					<FindCustomer api={ this.props.api } selectCallback={ this.selectCustomer }/>
				</div>
			);
		}

		if ( ! this.hasPreview() ) {
			return <h2>Loading data.</h2>;
		}

		if ( ! this.hasTransferred() ) {
			return (
				<div className="Confirmation">
					<TransferPreview { ...this.state }/>
					<button className="Confirm" type="button" onClick={ this.transfer }>Confirm</button>
					<button className="Reset" type="button" onClick={ this.reset }>Reset</button>
				</div>
			)
		}

		return (
			<div>
				<h2>Customer data has been successfully transferred.</h2>
				<button className="Reset" type="button" onClick={ this.reset }>Reset</button>
			</div>
		);
	}
}

const TransferWithRouter = withRouter( Transfer );

export default TransferWithRouter;
