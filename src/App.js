import React from "react";
import { getAccessToken } from "./clientImports/auth"
import "./App.css";
import AccessTokenForm from './forms/AccessTokenForm';
import Api from './Api';
import Search from "./Search";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

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
		};

		this.updateAccessToken = this.updateAccessToken.bind( this );

		this.api = new Api( accessToken );
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
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Router>
				<div className="App">
					<AccessTokenForm accessToken={ this.state.accessToken } updateAccessToken={ this.updateAccessToken }/>
					<nav>
						<Link to="/search">Search</Link>
					</nav>
					<Redirect from="/" to="/search" />
					<Route path="/search" render={ () => <Search api={ this.api } /> }/>
				</div>
			</Router>
		);
	}
}

export default App;
