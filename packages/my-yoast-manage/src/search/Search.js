import React from "react";
import { withRouter } from "react-router-dom";
import _isObject from "lodash/isObject";
import _isString from "lodash/isString";
import SearchForm from './SearchForm';
import ResultsList from "./results/ResultsList";
import Loader from "../shared/Loader";
import queryString from "query-string";
import config from "../config.json";
import { path } from "../functions/helpers";

export const InitialState = {
	query: null,
	searching: false,
	searched: false,
	found: false,
	error: false,
	results: null,
};

class Search extends React.Component {
	/**
	 * Creates the main component and set it's initial state.
	 */
	constructor( props ) {
		super( props );

		this.state = InitialState;

		this.search         = this.search.bind( this );
		this.handleResponse = this.handleResponse.bind( this );
		this.handleError    = this.handleError.bind( this );

		this.loadQueryFromQueryString( props.location.search );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.history.action === "PUSH" ) {
			return;
		}

		this.loadQueryFromQueryString( nextProps.location.search );
	}

	loadQueryFromQueryString( string ) {
		let query = queryString.parse( string, { arrayFormat: "bracket" } );

		if ( query.resource && query.filters && query.filters.length > 0 ) {
			query.filters = query.filters.map( filter => filter.split(",") );
			setTimeout( this.search.bind( this, query, true ) );
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
			searching: true,
			query: query,
			results: []
		} );

		if ( ! skipHistory ) {
			this.props.history.push( path( "/Search?" + queryString.stringify( query, { arrayFormat: "bracket" } ) ) );
		}

		let filters = [];
		let order   = [];
		query.filters.forEach( ( filter ) => {
			if ( filter[ 1 ] && filter[ 1 ].length > 0 ) {
				filters.push( { [ filter[ 0 ] ]: { like: filter[ 1 ], options: "i" } } );
				order.push( `${ filter[ 0 ] } DESC` );
			}
		} );

		if ( config.order[ query.resource ] ) {
			order.unshift( `${ config.order[ query.resource ] }` );
		}
		query.filters.forEach( ( filter ) => {
			if ( config.filteredOrder[ query.resource ] && config.filteredOrder[ query.resource ][ filter[ 0 ] ] ) {
				let filteredOrder = config.filteredOrder[ query.resource ][ filter[ 0 ] ];

				if ( _isObject( filteredOrder ) && filteredOrder[ filter[ 1 ] ] ) {
					order.unshift( `${ filteredOrder[ filter[ 1 ] ] }` );
				} else if ( _isString( filteredOrder ) ) {
					order.unshift( `${ filteredOrder }` );
				}
			}
		} );

		let include = null;
		if ( config.include[ query.resource ] ) {
			include = config.include[ query.resource ];
		}

		// Make order unique.
		order = Array.from( new Set( order ) );

		let search = this.props.api.search( query.resource, { where: { and: filters }, limit: 1000, order: order.join( ", " ), include } );

		search.then( this.handleResponse ).catch( this.handleError );
	}

	/**
	 * Callback used to handle search request successes.
	 *
	 * @param {Object} responseData The results of the search request.
	 */
	handleResponse( responseData ) {
		if ( responseData.length === 0 ) {
			this.setState( {
				searching: false,
				searched: true,
				found: false,
				error: false,
			} );
			return;
		}

		this.setState( {
			searching: false,
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
			searching: false,
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

		if ( ! this.state.searching && ! this.state.found && ! this.state.error ) {
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

		if ( this.state.searching ) {
			result = <Loader />;
		}

		if ( this.state.searched && this.state.query ) {
			result = <ResultsList
				query={ this.state.query }
				results={ this.state.results }
				api={ this.props.api }
				search={ this.search }
				resource={ this.state.query.resource }
				accessibleByRoles={ this.props.accessibleByRoles }/>;
		}

		return (
			<div className="Search">
				<SearchForm search={ this.search } query={ this.state.query }/>

				<h2>{header}</h2>
				{result}
			</div>
		);
	}
}

const SearchWithRouter = withRouter( Search );

export default SearchWithRouter;
