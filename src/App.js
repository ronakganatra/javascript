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
import { Route, Switch } from "react-router-dom";
import menuItems from "./config/Menu";
import { inMainLayout, inSingleLayout } from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import AccountDisabled from "./components/AccountDisabled";
import SitePageContainer from "./containers/SitePage";
import SubscriptionPageContainer from "./containers/SubscriptionPage";

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
	if ( props.userEnabled === false ) {
		return (
			<ConnectedRouter history={ props.history }>
				<Route path="*" component={ inSingleLayout( AccountDisabled ) } />
			</ConnectedRouter>
		);
	}

	if ( props.userEnabled === true ) {
		return (
			<ConnectedRouter history={ props.history }>
				<Switch>
					<Route path="/sites/:id" component={ inSingleLayout( SitePageContainer ) } />
					<Route path="/account/subscriptions/:id" component={ inSingleLayout( SubscriptionPageContainer ) } />
					{	menuItems.map( function( route, routeKey ) {
						return <Route { ...route } key={ routeKey } path={ route.path } component={ inMainLayout( route.component ) }/>;
					} )
					}
					<Route path="*" component={ inMainLayout( PageNotFound ) } />
				</Switch>
			</ConnectedRouter>
		);
	}

	// We don't want to render anything until user is fetched, user.enabled is null by default.
	return <span />;
};

Routes.propTypes = {
	userEnabled: PropTypes.bool,
	history: PropTypes.object,
};

const RoutesContainer = connect(
	( state ) => {
		return {
			userEnabled: state.user.enabled,
		};
	}
)( Routes );

class App extends Component {
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
