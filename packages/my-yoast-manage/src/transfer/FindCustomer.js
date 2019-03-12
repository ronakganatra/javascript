import React from "react";
import config from "../config.json";
import { capitalize } from "../functions/helpers";

const InitialState = {
	searched: false,
	found:    false,
	error:    false,
	results:  [],
	query:    "",
};

const CustomersHeader = config.headers['Customers'] || {};

export default class FindCustomer extends React.Component {
	constructor() {
		super();

		this.state = InitialState;

		this.search            = this.search.bind( this );
		this.handleQueryChange = this.handleQueryChange.bind( this );
		this.handleResponse    = this.handleResponse.bind( this );
		this.handleError       = this.handleError.bind( this );
	}

	/**
	 * Callback used when the email input changes.
	 *
	 * @param event The change event.
	 */
	handleQueryChange( event ) {
		let query = event.target.value;

		this.setState( { query } );
	}

	/**
	 * Callback used when the search form is submitted.
	 *
	 * @param event The submit event.
	 */
	search( event ) {
		event.preventDefault();

		if ( this.state.query === "" ) {
			return;
		}

		let like   = { like: this.state.query, options: "i" };
		let search = this.props.api.search( "Customers", { where: { or: [ { email: like }, { userEmail: like }, { username: like }, { userFirstName: like }, { userLastName: like } ] }, limit: 500 } );

		search.then( this.handleResponse ).catch( this.handleError );
	}

	/**
	 * Callback used when a customer is selected.
	 *
	 * @param customer The customer.
	 */
	select( customer ) {
		this.props.selectCallback( customer );

		this.setState( InitialState );
	}

	/**
	 * Callback used to handle search request successes.
	 *
	 * @param {Object} responseData The results of the search request.
	 */
	handleResponse( responseData ) {
		if ( responseData.length === 0 ) {
			this.setState( {
				searched: true,
				found: false,
				error: false,
			} );
			return;
		}

		this.setState( {
			searched: true,
			found: true,
			error: false,
			results: responseData,
		} );
	}

	/**
	 * Callback used to handle search request failures.
	 */
	handleError( error ) {
		console.log( error );

		this.setState( {
			error: true,
			searched: true,
			found: false,
		} );
	}

	/**
	 * Gets the header for the search results based on the current state of this component.
	 *
	 * @returns {string} The header
	 */
	getHeader() {
		if ( this.state.searched && this.state.found ) {
			return "Found " + this.state.results.length + " result(s)";
		}

		if ( ! this.state.found && ! this.state.error ) {
			return "No results found";
		}

		if ( this.state.error ) {
			return "An error occured";
		}

		return "";
	}

	/**
	 * Gets a table with all results.
	 *
	 * @returns {ReactElement} The table with results.
	 */
	getResultsTable() {
		return (
			<table>
				<thead><tr>
					{ [ "username", "userEmail", "userFirstName", "userLastName", "select" ].map( attribute =>
						<th key={ attribute }>{ CustomersHeader[ attribute ] || capitalize( attribute )}</th>
					) }
				</tr></thead>
				<tbody>{ this.state.results.map( result =>
					<tr key={ result.id }>
						<td>{ result.username }</td>
						<td>{ result.userEmail }</td>
						<td>{ result.userFirstName }</td>
						<td>{ result.userLastName }</td>
						<td><button type="button" onClick={ this.select.bind( this, result ) }>Select Customer</button></td>
					</tr>
				) }</tbody>
			</table>
		);
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.search }>
					<input className="wide" onChange={ this.handleQueryChange } value={ this.state.query } />
					<button type="submit">Search</button>
				</form>
				<h2>{ this.getHeader() }</h2>
				{ this.state.searched && this.state.found && this.getResultsTable() }
			</div>
		);
	}
}
