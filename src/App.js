import React from "react";
import { getAccessToken } from "./functions/auth"
import "./App.css";
import AccessTokenForm from './menu/AccessTokenForm';
import Api from './Api';
import Search from "./search/Search";
import Transfer from "./transfer/Transfer";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navigation from "./menu/Navigation";
import { path } from "./functions/helpers";
import Refund from "./refund/Refund";
import ConfigurationServiceRequests from "./configuration-service-requests/ConfigurationServiceRequests";
import Finance from "./finance/Finance";
import Loader from "./shared/Loader";
import _intersection from "lodash/intersection";

class App extends React.Component {
	/**
	 * Creates the main component and set it's initial state.
	 */
	constructor() {
		super();

		let accessToken = localStorage.getItem( "yoast-support-access-token" );

		if ( accessToken === 'null' ) {
			accessToken = null;
		}

		if ( accessToken === null ) {
			accessToken = getAccessToken();
		}

		this.state = {
			accessToken: accessToken,
			roles: null
		};

		this.updateAccessToken = this.updateAccessToken.bind( this );
		this.accessibleByRoles = this.accessibleByRoles.bind( this );

		this.api = new Api( accessToken, this.updateAccessToken );

		this.api.getUserRoles().then( roles => {
			this.setState( { roles: roles } )
		} )
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
	 * Returns whether or not the current user has one of the supplied roles or is admin.
	 *
	 * @param {array} roles The roles that should have access.
	 *
	 * @returns {boolean} Whether or not the current user has access.
	 */
	accessibleByRoles( roles ) {
		if ( this.state.role === null ) {
			return false;
		}

		return _intersection( this.state.roles, roles.concat( [ 'admin' ] ) ).length > 0;
	}

	/**
	 * Renders the component
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		if ( this.state.roles === null ) {
			return <Loader />
		}

		return (
			<Router>
				<div className="App">
					{ this.state.accessToken &&
					  	<div className="LoggedIn">
							<div className="Menu">
								<Navigation accessibleByRoles={ this.accessibleByRoles }/>
							</div>
							<div className="Main">
								<Route exact path={ path( "/" ) } render={ () => <Redirect to={ path( "/search" ) } /> } />
								<Route path={ path( "/search" ) } render={ () => <Search api={ this.api } accessibleByRoles={ this.accessibleByRoles } /> } />
								{ this.accessibleByRoles( [ 'support' ] ) && <Route path={ path( "/transfer" ) } render={ () => <Transfer api={ this.api } /> } /> }
								{ this.accessibleByRoles( [ 'support' ] ) && <Route path={ path( "/refund" ) } render={ () => <Refund api={ this.api } /> } /> }
								{ this.accessibleByRoles( [ 'support' ] ) && <Route path={ path( "/configurationServiceRequests" ) } render={ () => <ConfigurationServiceRequests api={ this.api }/> } /> }
								{ this.accessibleByRoles( [ 'finance' ] ) && <Route path={ path( "/finance" ) } render={ () => <Finance api={ this.api } /> } /> }
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
