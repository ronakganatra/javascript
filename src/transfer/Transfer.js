import React from "react";
import { withRouter } from "react-router-dom";
import FindCustomer from "./FindCustomer";
import TransferPreview from "./TransferPreview";
import Loader from "../shared/Loader";
import _merge from "lodash/merge";
import _find from "lodash/find";
import _compact from "lodash/compact";
import queryString from "query-string";
import { path } from "../functions/helpers";

export const InitialState = {
	fromCustomer:      null,
	toCustomer:        null,
	previewReady:      false,
	orders:            null,
	subscriptions:     null,
	sites:             null,
	courseEnrollments: null,
	myYoastFetched:    false,
	usShopData:        null,
	usTransfer:        false,
	euShopData:        null,
	euTransfer:        false,
	ukShopData:        null,
	ukTransfer:        false,
	academyData:       null,
	academyTransfer:   false,
};

class Transfer extends React.Component {
	constructor( props ) {
		super( props );

		this.state = InitialState;

		this.reset          = this.reset.bind( this );
		this.transfer       = this.transfer.bind( this );
		this.selectCustomer = this.selectCustomer.bind( this );

		this.loadCustomersFromQueryString( props.location.search );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.history.action === "PUSH" ) {
			return;
		}

		this.loadCustomersFromQueryString( nextProps.location.search );
	}

	loadCustomersFromQueryString( string ) {
		let query = queryString.parse( string );
		let ids   = _compact( [ query.fromCustomerId, query.toCustomerId ] );

		if ( ids.length === 0 ) {
			this.setState( InitialState );
			return;
		}

		this.props.api.search( 'Customers', { where: { id: { inq: ids } }, limit: 2 } )
			.then( customers => {
				let fromCustomer = _find( customers, { id: query.fromCustomerId } );
				if ( query.toCustomerId ) {
					let toCustomer = _find( customers, { id: query.toCustomerId } );
					this.setState( _merge( {}, InitialState, { fromCustomer, toCustomer } ) );
					this.getPreview();
					return;
				}

				this.setState( _merge( {}, InitialState, { fromCustomer } ) );
			} );
	}

	reset() {
		this.setState( InitialState );
	}

	transfer() {
		let api    = this.props.api;
		let fromId = this.state.fromCustomer.sourceId;
		let toId   = this.state.toCustomer.sourceId;

		api.wooTransfer( fromId, toId, 1 ).then( result => this.setState( { usTransfer: true } ) );
		api.wooTransfer( fromId, toId, 2 ).then( result => this.setState( { euTransfer: true } ) );
		api.wooTransfer( fromId, toId, 7 ).then( result => this.setState( { ukTransfer: true } ) );
		api.learndashTransfer( fromId, toId ).then( result => this.setState( { academyTransfer: true } ) );
	}

	selectCustomer( customer ) {
		if ( this.state.fromCustomer === null ) {
			this.setState( { fromCustomer: customer } );
			this.props.history.push( path( "/transfer?" + queryString.stringify( { fromCustomerId: customer.id } ) ) );
			return;
		}

		this.setState( { toCustomer: customer } );
		this.props.history.push( path( "/transfer?" + queryString.stringify( { fromCustomerId: this.state.fromCustomer.id, toCustomerId: customer.id } ) ) );
		this.getPreview();
	}

	getPreview() {
		let id  = this.state.fromCustomer.id;
		let api = this.props.api;

		let promises = [
			api.search( "Orders", { where: { customerId: id } } ).then( results => this.setState( { orders: results } ) ),
			api.search( "Subscriptions", { where: { subscriberId: id } } ).then( results => this.setState( { subscriptions: results } ) ),
			api.search( "Sites", { where: { userId: id } } ).then( results => this.setState( { sites: results } ) ),
			api.search( "CourseEnrollments", { where: { or: [ { studentId: id }, { buyerId: id } ] }, include: [ "course" ] } ).then( results => this.setState( { courseEnrollments: results } ) ),
		];

		Promise.all( promises ).then( () => {
			let fromId = this.state.fromCustomer.sourceId;
			let toId   = this.state.toCustomer.sourceId;

			this.setState( { myYoastFetched: true } );

			api.wooTransferPreview( fromId, toId, 1 ).then( result => this.setState( { usShopData: result } ) );
			api.wooTransferPreview( fromId, toId, 2 ).then( result => this.setState( { euShopData: result } ) );
			api.wooTransferPreview( fromId, toId, 7 ).then( result => this.setState( { ukShopData: result } ) );
			api.learndashTransferPreview( fromId, toId ).then( result => this.setState( { academyData: result } ) );
		} );
	}

	hasCustomers() {
		return ( this.state.fromCustomer !== null && this.state.toCustomer !== null );
	}

	hasPreview() {
		// Check if data has been received for MyYoast and for both shops.
		return (
			this.state.myYoastFetched &&
			this.state.usShopData !== null &&
			this.state.euShopData !== null &&
			this.state.academyData !== null
		);
	}

	hasTransferred() {
		return this.state.usTransfer && this.state.euTransfer && this.state.academyTransfer;
	}

	render() {
		if ( ! this.hasCustomers() ) {
			return (
				<div>
					<h2>{ this.state.fromCustomer ? "Find a Customer to transfer to" : "Find a Customer to transfer from" }</h2>
					{ this.state.fromCustomer && <p>All data will be transferred from: { this.state.fromCustomer.userEmail } ( { this.state.fromCustomer.username } )</p> }
					<FindCustomer api={ this.props.api } selectCallback={ this.selectCustomer }/>
				</div>
			);
		}

		if ( ! this.hasPreview() ) {
			return <Loader />
		}

		if ( ! this.hasTransferred() ) {
			return (
				<div className="Confirmation">
					<TransferPreview { ...this.state }/>
					<button className="Confirm" type="button" onClick={ this.transfer }>Confirm</button>
					<button className="Reset" type="button" onClick={ this.reset }>Cancel</button>
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
