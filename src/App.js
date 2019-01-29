// External dependencies.
import PropTypes from "prop-types";
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "react-select/dist/react-select.css";
import colors from "yoast-components/style-guide/colors.json";
import { injectGlobal } from "styled-components";
import { IntlProvider } from "react-intl";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import * as queryString from "query-string";
import omit from "lodash/omit";
import isEqual from "lodash/isEqual";
import { defineMessages } from "react-intl";

// Internal dependencies.
import "./App.css";
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
	fetchAccessToken,
	getRedirectUrl,
	hasPeriLoginCookie,
	removeCookies,
	removePeriLoginCookie,
	saveIntendedDestination,
	setPeriLoginCookie,
} from "./functions/auth";
import ActivateContainer from "./containers/ActivateContainer";
import { sentUserDataToBeacon } from "./actions/user";
import Connect from "./containers/connect/Connect";

const titles = defineMessages( {
	login: {
		id: "menu.title.login",
		defaultMessage: "Login",
	},
	signup: {
		id: "menu.title.signup",
		defaultMessage: "Signup",
	},
	accountActivate: {
		id: "menu.title.accountActivate",
		defaultMessage: "Activate account",
	},
	accountEnterDetails: {
		id: "menu.title.accountEnterDetails",
		defaultMessage: "Enter account details",
	},
	passwordForgot: {
		id: "menu.title.passwordForgot",
		defaultMessage: "Reset your password",
	},
	passwordCheckEmail: {
		id: "menu.title.passwordCheckEmail",
		defaultMessage: "Check your email",
	},
	passwordReset: {
		id: "menu.title.passwordReset",
		defaultMessage: "Enter a new password",
	},
	passwordSuccess: {
		id: "menu.title.passwordSuccess",
		defaultMessage: "Password changed successfully!",
	},
	manageSite: {
		id: "menu.title.manageSite",
		defaultMessage: "Manage site",
	},
	manageSubscription: {
		id: "menu.title.manageSubscription",
		defaultMessage: "Manage subscription",
	},
	notFound: {
		id: "menu.title.notFound",
		defaultMessage: "Page not found",
	},
	connect: {
		id: "menu.title.connect",
		defaultMessage: "Connect",
	},
} );

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

/**
 * The Routes component.
 */
class Routes extends React.Component {
	/**
	 * The Routes component constructor.
	 *
	 * @param {object} props Properties of the component.
	 *
	 * @returns {ReactElement} Routes component.
	 *
	 * @constructor
	 */
	constructor( props ) {
		super( props );
		this.state = {};
	}

	/**
	 * Sets the redirect cookie to the state.
	 *
	 * @returns {void}
	 */
	componentWillReceiveProps() {
		const newState = this.getCookieState();
		this.setState( newState );
	}

	/**
	 * Sets the redirect cookie to the state.
	 *
	 * @returns {Object} The change in state containing the redirect cookie.
	 */
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
	 * Redirects the user to the login page while saving the location the user was actually trying to reach.
	 * Saving this location allows us to redirect the user back to it as soon as the login succeeds.
	 *
	 * @returns {ReactElement} The redirect component.
	 */
	redirectToLogin() {
		removePeriLoginCookie();
		setPeriLoginCookie();
		return ( <Redirect to={ "/login" } /> );
	}

	/**
	 * Will send the userData to the dataLayer, only if the beacon has no data yet, and only if the email is available.
	 * Will also dispatch the sentUserDataBeacon action, in order to set beaconHasData to true.
	 *
	 * @returns {void}
	 */
	populateBeacon() {
		if ( ! this.props.beaconHasData ) {
			if ( this.props.userData.email.length > 0 ) {
				const userData = this.props.userData;

				/* eslint-disable camelcase */
				window.dataLayer.push( {
					user_name: ( userData.userFirstName || userData.niceName ) + ( userData.userLastName ? ` ${ userData.userLastName }` : "" ),
					user_email: userData.email,
					helpscout_signature: userData.helpScoutSignature,
					event: "yoast_app_user_populated",
				} );
				/* eslint-enable camelcase */

				this.props.sentUserDataToBeacon();
			}
		}
	}

	componentDidUpdate() {
		this.populateBeacon();
	}

	/**
	 * Checks whether or not the App should trigger the router and re-render.
	 *
	 * @param {Object} nextProps The next props.
	 *
	 * @returns {boolean} Whether the App should trigger the router and re-render.
	 */
	shouldComponentUpdate( nextProps ) {
		const simpleProps     = omit( this.props, [ "router", "history" ] );
		const simpleNextProps = omit( nextProps, [ "router", "history" ] );

		if ( ! isEqual( simpleNextProps, simpleProps ) ) {
			return true;
		}

		if (
			// Same page.
			( this.props.router.location && this.props.router.location.pathname === nextProps.router.location.pathname ) ||
			// Skip to Main Content link.
			( nextProps.router.location && nextProps.router.location.hash === "#content" )
		) {
			return false;
		}

		return true;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		try {
			if ( window.self !== window.top ) {
				return <span />;
			}
		} catch ( e ) {
			return <span />;
		}

		if ( this.props.loggedIn === false ) {
			return (
				<ConnectedRouter history={ this.props.history }>
					<Switch>
						<Route
							exact={ true }
							path="/login"
							component={ inLoginLayout( LoginPage, titles.login.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/signup"
							component={ inLoginLayout( LoginPage, titles.signup.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/activate"
							component={ inLoginLayout( ActivateContainer, titles.accountActivate.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/almost-there"
							component={ inLoginLayout( AlmostThere, titles.accountActivate.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/forgot-password"
							component={ inLoginLayout( ResetPasswordEmailContainer, titles.passwordForgot.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/forgot-password/check-your-email"
							component={ inLoginLayout( SendResetEmailSuccessPage, titles.passwordCheckEmail.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/forgot-password/reset-password"
							component={ inLoginLayout( ResetPasswordContainer, titles.passwordReset.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/forgot-password/success"
							component={ inLoginLayout( ResetPasswordSuccessPage, titles.passwordSuccess.defaultMessage ) }
						/>
						<Route
							path="*"
							render={ this.redirectToLogin }
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

			const queryParams = queryString.parse( window.location.search );
			if ( queryParams.redirect_to ) {
				removeCookies();
				fetchAccessToken()
					.then( () => {
						window.location.replace( queryParams.redirect_to );
					} )
					.catch( () => {
						saveIntendedDestination( queryParams.redirect_to );
						window.location.replace( "/login" );
					} );
				return null;
			}

			return (
				<ConnectedRouter history={ this.props.history }>
					<Switch>
						<Route
							exact={ true }
							path="/connect"
							component={ inLoginLayout( Connect, titles.connect.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/activate"
							component={ inLoginLayout( ActivateContainer, titles.accountActivate.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/enter-details"
							component={ inLoginLayout( ProfileDetails, titles.accountEnterDetails.defaultMessage ) }
						/>
						<Route
							exact={ true }
							path="/login"
							render={ () => <Redirect to={ "/" } /> }
						/>
						<Route
							path="/sites/:id"
							component={ inSingleLayout( SitePageContainer, titles.manageSite.defaultMessage ) }
						/>
						<Route
							path="/account/subscriptions/:id"
							component={ inSingleLayout( SubscriptionPageContainer, titles.manageSubscription.defaultMessage ) }
						/>
						{ menuItems.map( function( route, routeKey ) {
							return <Route
								{ ...route }
								key={ routeKey }
								path={ route.path }
								component={ inMainLayout( route.component, route.title.defaultMessage ) }
							/>;
						} ) }
						<Route
							path="*"
							component={ inMainLayout( PageNotFound, titles.notFound.defaultMessage ) }
						/>;
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
	userData: PropTypes.object,
	beaconHasData: PropTypes.bool,
	loggedIn: PropTypes.bool.isRequired,
	history: PropTypes.object,
	completedLogin: PropTypes.bool,
	router: PropTypes.object,
	sendUserDataToBeacon: PropTypes.func,
};

const mapStateToProps = ( state ) => {
	return {
		userEnabled: state.user.enabled,
		userData: state.user.data.profile,
		beaconHasData: state.user.beaconHasData,
		loggedIn: state.user.loggedIn,
		completedLogin: state.ui.login.completedLogin,
		router: state.router,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		sentUserDataToBeacon: () => {
			dispatch( sentUserDataToBeacon() );
		},
	};
};

const RoutesContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
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
