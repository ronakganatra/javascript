import React from "react";
import _debounce from "lodash/debounce";
import _isString from "lodash/isString";
import { datePresenter, currencyPresenter } from "../functions/presenters";
import Loader from "../shared/Loader";

const initialState = {
	orderNumber: "",
	order: null,
	searched: false,
	hasError: false,
	errorMessage: "",
	isRefunding: false,
	hasRefunded: false,
};

class Refund extends React.Component {
	constructor( props ) {
		super( props );

		this.state = initialState;

		this.setOrderNumber = this.setOrderNumber.bind( this );
		this.handleResponse = this.handleResponse.bind( this );
		this.handleError = this.handleError.bind( this );
		this.confirmRefund = this.confirmRefund.bind( this );
		this.handleRefundResponse = this.handleRefundResponse.bind( this );
		this.handleRefundError= this.handleRefundError.bind( this );
		this.reset = this.reset.bind( this );
		this.debouncedSearch = _debounce( this.search, 300 );
	}

	setOrderNumber( event ) {
		let orderNumber = event.target.value;

		this.setState( { orderNumber } );

		this.debouncedSearch();
	}

	search() {
		this.setState({
			searched: false,
		});

		if ( this.state.orderNumber === "" ) {
			this.setState({
				order: null
			});
		}

		let search = this.props.api.search( "Orders", {
			where: { invoiceNumber: this.state.orderNumber }, limit: 1
		} );

		search.then( this.handleResponse ).catch( this.handleError );
	}

	handleResponse( orders ) {
		let order = null;

		if ( orders.length === 1 ) {
			order = orders[ 0 ];
		}

		this.setState({
			order,
			searched: true,
		});
	}

	handleError( error ) {
		this.setState({
			errorMessage: _isString( error ) ? error : error.message,
		});
	}

	confirmRefund() {
		this.setState({
			errorMessage: "",
			isRefunding: true,
		});

		let doRefund = this.props.api.wooRefund( this.state.order.sourceId, this.state.order.sourceShopId );

		doRefund.then( this.handleRefundResponse ).catch( this.handleRefundError );
	}

	handleRefundResponse( response ) {
		this.setState({
			errorMessage: "",
			isRefunding: false,
			hasRefunded: true,
		})
	}

	handleRefundError( error ) {
		console.log( error );

		this.setState({
			hasError: true,
			isRefunding: false,
			errorMessage: _isString( error ) ? error : error.message,
		});
	}

	hasError() {
		return this.state.errorMessage !== "";
	}

	reset() {
		this.setState( initialState );
	}


	render() {
		let preview = null;
		if ( this.state.order !== null ) {
			let order = this.state.order;

			preview = <div>
				<h2>Are you sure you want to refund the following order?</h2>

				<table>
					<tbody>
						<tr><td>Order</td><td>{order.invoiceNumber}</td></tr>
						<tr><td>Status</td><td>{order.status}</td></tr>
						<tr><td>Date</td><td> {datePresenter(order.date)}</td></tr>
						<tr><td>First Name</td><td> {order.customerFirstName}</td></tr>
						<tr><td>Last Name</td><td>{ order.customerLastName}</td></tr>
						<tr><td>Email</td><td> {order.customerEmail}</td></tr>
						<tr><td>Amount</td><td> {currencyPresenter( order.currency, order.totalAmount )}</td></tr>
					</tbody>
				</table>

				<button type="button" className="form-submit refund-submit" onClick={this.confirmRefund}>Confirm refund</button>
			</div>;
		}

		let message = null;
		if ( this.state.searched && this.state.order === null ) {
			message = <div>No results found</div>;
		}

		let error = null;
		if ( this.hasError() ) {
			error = <h2 className="error-message">{this.state.errorMessage}</h2>
		}

		let spinner = null;
		if ( this.state.isRefunding ) {
			spinner = <Loader />;
		}

		let refundDone = null;
		if ( this.state.hasRefunded ) {
			refundDone = <div>
				<h2>Succesfully refunded!</h2>
				<button type="button" onClick={this.reset}>Refund another order</button>
			</div>
		}

		return (
			<div>
				<h2>Refund order</h2>

				<input type="text" className="Reset" onChange={this.setOrderNumber} value={this.state.orderNumber} />

				{message}
				{preview}
				{spinner}
				{error}
				{refundDone}
			</div>
		)
	}
}

export default Refund;
