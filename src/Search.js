import React from "react";
import { withRouter } from "react-router-dom";
import SearchForm from './forms/SearchForm';
import ResultsList from "./results/ResultsList";
import config from "./config.json";

class Search extends React.Component {
	/**
	 * Creates the main component and set it's initial state.
	 */
	constructor() {
		super();

		this.state = {
			searched: false,
			found: false,
			error: false,
			results: null,
		};

		this.search         = this.search.bind( this );
		this.handleResponse = this.handleResponse.bind( this );
		this.handleError    = this.handleError.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		let state = nextProps.location.state;

		if ( state && state.resource && state.filters ) {
			this.search( state, true );
		}
	}

	/**
	 * Executes a search query and adds it"s state to the history stack.
	 *
	 * @param {Object}  query             The query to run.
	 * @param {string}  query.resource    The resource to query.
	 * @param {array}   query.filters     The filters to apply to the query.
	 * @param {boolean} skipHistory       Whether or not this state should be added to the history stack.
	 *
	 * @returns {void}
	 */
	search( query, skipHistory ) {
		this.setState( {
			query: query,
			results: []
		} );

		if ( ! skipHistory ) {
			this.props.history.push( "/Search", query );
		}

		let filters = [];
		let order   = [];
		query.filters.forEach( ( filter ) => {
			if ( filter[1] && filter[1].length > 0 ) {
				filters.push( { [ filter[ 0 ] ]: { like: filter[ 1 ], options: "i" } } );
				order.push( `${ filter[ 0 ] } DESC` );
			}
		} );

		if ( config.order[ query.resource ] ) {
			order.push( `${ config.order[ query.resource ] }` );
		}

		// Make order unique.
		order = Array.from( new Set( order ) );

		let search = this.props.api.search( query.resource, { where: { and: filters }, limit: 500, order: order.join( ", " ) } );

		search.then( this.handleResponse ).catch( this.handleError );
	}

	/**
	 * Callback used to handle search request successes.
	 *
	 * @param {Object} responseData The results of the search request.
	 */
	handleResponse( responseData ) {
		// For some reason successful requests with bad status codes still hit the success handler.
		if ( responseData.error ) {
			this.handleError( responseData.error );
			return;
		}

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
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		let result = null;
		let header = this.getHeader();
		if ( this.state.searched && this.state.found && this.props.location.state ) {
			result = <ResultsList
				results={ this.state.results }
				api={ this.api }
				search={ this.search }
				resource={ this.props.location.state.resource } />;
		}

		return (
			<div className="Search">
				<SearchForm search={ this.search }/>

				<h2>{header}</h2>
				{result}
			</div>
		);
	}
}

const SearchWithRouter = withRouter( Search );

export default SearchWithRouter;
