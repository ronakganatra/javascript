import React from "react";
import { getAccessToken } from "./clientImports/auth"
import "./App.css";
import AccessTokenForm from './forms/AccessTokenForm';
import SearchForm from './forms/SearchForm';
import Api from './Api';
import ResultsList from "./results/ResultsList";

class App extends React.Component {
	/**
	 * Creates the main component and set it's initial state.
	 */
	constructor() {
		super();

		let accessToken = localStorage.getItem( "yoast-support-access-token" );

		if ( accessToken === null ) {
			accessToken = getAccessToken();
		}

		this.state = {
			accessToken: accessToken,
			searched: false,
			found: false,
			error: false,
			query: null,
			results: null,
		};

		this.updateAccessToken = this.updateAccessToken.bind( this );
		this.search            = this.search.bind( this );
		this.handlePopState    = this.handlePopState.bind( this );
		this.handleResponse    = this.handleResponse.bind( this );
		this.handleError       = this.handleError.bind( this );

		this.api = new Api( accessToken );

		window.onpopstate = this.handlePopState;
	}

	/**
	 * Callback used when the access token is updated.
	 *
	 * @param {string} accessToken The new access token.
	 *
	 * @returns {void}
	 */
	updateAccessToken( accessToken ) {
		localStorage.setItem( "yoast-support-access-token", accessToken );

		this.setState( { accessToken } );

		this.api = new Api( accessToken );
	}

	/**
	 * Callback used when a history state is popped.
	 *
	 * @param {Object} event The history pop event, it's a popStateEvent.
	 *
	 * @returns {void}
	 */
	handlePopState( event ) {
		this.search( event.state, true );
	}

	/**
	 * Executes a search query and adds it"s state to the history stack.
	 *
	 * @param {Object}  query             The query to run.
	 * @param {string}  query.resource    The resource to query.
	 * @param {string}  query.attribute   The attribute to query.
	 * @param {string}  query.searchValue The value to query.
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
			window.history.pushState( query, "Support" );
		}

		let filters = {};
		filters[ query.attribute ] = query.searchValue;


		let search = this.api.search( query.resource, { where: filters, limit: 500 } );

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
		if ( this.state.searched && this.state.found ) {
			result = <ResultsList
				results={ this.state.results }
				api={ this.api }
				search={ this.search }
				resource={ this.state.query.resource } />;
		}

		return (
			<div className="App">
				<AccessTokenForm accessToken={ this.state.accessToken } updateAccessToken={ this.updateAccessToken }/>

				<SearchForm searchCallback={ this.search }/>

				<h2>{header}</h2>
				{result}
			</div>
		);
	}
}

export default App;
