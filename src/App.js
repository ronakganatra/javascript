import PropTypes from "prop-types";
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import "react-select/dist/react-select.css";
import colors from "yoast-components/style-guide/colors.json";
import { injectGlobal } from "styled-components";
import { IntlProvider } from "react-intl";
import { Provider, connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import menuItems from "./config/Menu";
import { inMainLayout, inSingleLayout, inLoginLayout } from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import AccountDisabled from "./components/AccountDisabled";
import SitesPageContainer from "./containers/SitesPage";
import SitePageContainer from "./containers/SitePage";
import SubscriptionPageContainer from "./containers/SubscriptionPage";
import ProfileDetails from "./containers/ProfileDetails";
import AlmostThere from "./components/login/AlmostThere";
import LoginPage from "./components/login/LoginSignupPage";
import ResetPasswordEmailContainer from "./containers/ResetPasswordEmail";
import ResetPasswordContainer from "./containers/ResetPassword";
import SendResetEmailSuccessPage from "./components/login/SendResetEmailSuccessPage";
import ResetPasswordSuccessPage from "./components/login/ResetPasswordSuccessPage";
import {
	getRedirectUrl,
	hasPeriLoginCookie,
	removePeriLoginCookie,
	setPeriLoginCookie,
} from "./functions/auth";
import ActivateContainer from "./containers/ActivateContainer";

/*
 * Helper method to write global CSS.
 * Only use it for the rare @font-face definition or body styling.
 */
/* eslint-disable no-unused-expressions */
injectGlobal`
	body {
		margin: 0;
		padding: 0;
		font: normal 16px/1.5 "Open Sans", sans-serif;
		font-size: 1rem;
		min-height: 100%;
		background: ${colors.$color_grey_light};
	}

	a {
		color: ${ colors.$color_blue };
	}

	a:hover,
	a:focus {
		color: ${ colors.$color_pink_dark };
	}
`;
/* eslint-enable no-unused-expressions */

class Routes extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	componentWillReceiveProps() {
		const newState = this.getCookieState();
		this.setState( newState );
	}

	getDerivedStateFromProps() {
		return this.getCookieState();
	}

	/**
	 * Gets the state for the redirect cookie.
	 *
	 * @returns {Object} The new state.
	 */
	getCookieState() {
		if ( hasPeriLoginCookie() ) {
			return { redirectTo: getRedirectUrl() };
		}
		return {};
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		if ( this.props.loggedIn === false ) {
			return (
				<ConnectedRouter history={ this.props.history }>
					<Switch>
						<Route exact={ true } path="/login" component={ inLoginLayout( LoginPage ) } />
						<Route exact={ true } path="/signup" component={ inLoginLayout( LoginPage ) } />
						<Route exact={ true } path="/activate" component={ inLoginLayout( ActivateContainer ) } />
						<Route exact={ true } path="/almost-there" component={ inLoginLayout( AlmostThere ) } />
						<Route
							exact={ true } path="/forgot-password"
							component={ inLoginLayout( ResetPasswordEmailContainer ) }
						/>
						<Route
							exact={ true } path="/forgot-password/check-your-email"
							component={ inLoginLayout( SendResetEmailSuccessPage ) }
						/>
						<Route
							exact={ true } path="/forgot-password/reset-password"
							component={ inLoginLayout( ResetPasswordContainer ) }
						/>
						<Route
							exact={ true } path="/forgot-password/success"
							component={ inLoginLayout( ResetPasswordSuccessPage ) }
						/>
						<Route
							path="*" render={ () => {
								removePeriLoginCookie();
								setPeriLoginCookie();
								return ( <Redirect to={ "/login" } /> );
							} }
						/>
					</Switch>
				</ConnectedRouter>
			);
		}

		if ( this.props.userEnabled === false ) {
			return (
				<ConnectedRouter history={ this.props.history }>
					<Route path="*" component={ inSingleLayout( AccountDisabled ) } />
				</ConnectedRouter>
			);
		}

		if ( this.props.userEnabled === true ) {
			if ( this.state.redirectTo ) {
				removePeriLoginCookie();
				window.location.replace( this.state.redirectTo );
				return null;
			}

			return (
				<ConnectedRouter history={ this.props.history }>
					<Switch>
						<Route exact={ true } path="/activate" component={ inLoginLayout( ActivateContainer ) } />
						<Route exact={ true } path="/enter-details" component={ inLoginLayout( ProfileDetails ) } />
						<Route exact={ true } path="/" component={ inMainLayout( SitesPageContainer ) } />
						<Route exact={ true } path="/login" render={ () => <Redirect to={ "/" } /> } />
						<Route path="/sites/:id" component={ inSingleLayout( SitePageContainer ) } />
						<Route
							path="/account/subscriptions/:id"
							component={ inSingleLayout( SubscriptionPageContainer ) }
						/>
						{ menuItems.map(
							function( route, routeKey ) {
								const config = Object.assign( { exact: true }, route );

								return <Route
									{ ...config } key={ routeKey } path={ route.path }
									component={ inMainLayout( route.component ) }
								/>;
							}
						) }
						<Route path="*" component={ inMainLayout( PageNotFound ) } />;
					</Switch>
				</ConnectedRouter>
			);
		}

		// We don't want to render anything until user is fetched, user.enabled is null by default.
		return <span />;
	}
}

Routes.propTypes = {
	userEnabled: PropTypes.bool,
	loggedIn: PropTypes.bool.isRequired,
	history: PropTypes.object,
	completedLogin: PropTypes.bool,
	router: PropTypes.object,
};

const RoutesContainer = connect(
	( state ) => {
		return {
			userEnabled: state.user.enabled,
			loggedIn: state.user.loggedIn,
			completedLogin: state.ui.login.completedLogin,
			router: state.router,
		};
	}
)( Routes );

class App extends Component {
	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<IntlProvider locale="en">
				<Provider store={ this.props.store }>
					<RoutesContainer history={ this.props.history } />
				</Provider>
			</IntlProvider>
		);
	}
}

App.propTypes = {
	store: PropTypes.object,
	history: PropTypes.object,
};

export default App;
