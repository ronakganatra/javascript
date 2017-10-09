import React from "react";
import { getAccessToken } from "./functions/auth"
import "./App.css";
import AccessTokenForm from './menu/AccessTokenForm';
import Api from './Api';
import Search from "./search/Search";
import Transfer from "./transfer/Transfer";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navigation from "./menu/Navigation";

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

		this.api = new Api( accessToken, this.updateAccessToken );
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

		this.api = new Api( accessToken, this.updateAccessToken );
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		console.log( this.state.accessToken);
		return (
			<Router>
				<div className="App">
					{ this.state.accessToken &&
					  	<div className="LoggedIn">
							<div className="Menu">
								<Navigation/>
							</div>
							<div className="Main">
								<Route exact path="/" render={ () => <Redirect to="/search"/> } />
								<Route path="/search" render={ () => <Search api={ this.api } /> } />
								<Route path="/transfer" render={ () => <Transfer api={ this.api } /> } />
							</div>
						</div>
					}
					{ ! this.state.accessToken &&
					  	<div className="Main">
				  			<h2>Please enter a valid access token</h2>
				  			<AccessTokenForm accessToken={ this.state.accessToken } updateAccessToken={ this.updateAccessToken } />
						</div>
					}
				</div>
			</Router>
		);
	}
}

export default App;
