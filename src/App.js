import PropTypes from "prop-types";
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import "react-select/dist/react-select.css";
import colors from "yoast-components/style-guide/colors.json";
import { injectGlobal } from "styled-components";
import { IntlProvider } from "react-intl";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import menuItems from "./config/Menu";
import { inLoginLayout, inMainLayout, inSingleLayout } from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import AccountDisabled from "./components/AccountDisabled";
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
	directToIntendedDestination,
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


const Routes = ( props ) => {
	if ( props.loggedIn === false ) {
		return (
			<ConnectedRouter history={ props.history }>
				<Switch>
					<Route exact path="/login" component={ inLoginLayout( LoginPage ) }/>
					<Route exact path="/signup" component={ inLoginLayout( LoginPage ) }/>
					<Route exact path="/activate" component={ inLoginLayout( ActivateContainer ) }/>
					<Route exact path="/almost-there" component={ inLoginLayout( AlmostThere ) }/>
					<Route exact path="/forgot-password" component={ inLoginLayout( ResetPasswordEmailContainer ) }/>
					<Route exact path="/forgot-password/check-your-email"
					       component={ inLoginLayout( SendResetEmailSuccessPage ) }/>
					<Route exact path="/forgot-password/reset-password"
					       component={ inLoginLayout( ResetPasswordContainer ) }/>
					<Route exact path="/forgot-password/success"
					       component={ inLoginLayout( ResetPasswordSuccessPage ) }/>
					<Route path="*" render={ () => {
						removePeriLoginCookie();
						setPeriLoginCookie();
						return ( <Redirect to={ "/login" }/> );
					} }/>
				</Switch>
			</ConnectedRouter>
		);
	}

	if ( props.userEnabled === false ) {
		return (
			<ConnectedRouter history={ props.history }>
				<Route path="*" component={ inSingleLayout( AccountDisabled ) }/>
			</ConnectedRouter>
		);
	}

	if ( props.userEnabled === true ) {
		let fallbackRoute = null;

		if ( hasPeriLoginCookie() ) {
			fallbackRoute = <Route path="*" render={ () => {
				directToIntendedDestination();
				return null;
			} }/>;
		} else {
			fallbackRoute = <Route path="*" component={ inMainLayout( PageNotFound ) }/>;
		}

		return (
			<ConnectedRouter history={ props.history }>
				<Switch>
					<Route exact path="/activate" component={ inLoginLayout( ActivateContainer ) }/>
					<Route exact path="/enter-details" component={ inLoginLayout( ProfileDetails ) }/>
					<Route exact path="/login" render={ () => <Redirect to={ "/" }/> }/>
					<Route path="/sites/:id" component={ inSingleLayout( SitePageContainer ) }/>
					<Route path="/account/subscriptions/:id" component={ inSingleLayout( SubscriptionPageContainer ) }/>
					{ menuItems.map( function( route, routeKey ) {
						return <Route { ...route } key={ routeKey } path={ route.path } component={ inMainLayout( route.component ) }/>;
					} ) }
					{ fallbackRoute }
				</Switch>
			</ConnectedRouter>
		);
	}

	// We don't want to render anything until user is fetched, user.enabled is null by default.
	return <span/>;
};

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
	render() {
		return (
			<IntlProvider locale="en">
				<Provider store={ this.props.store }>
					<RoutesContainer history={ this.props.history }/>
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
