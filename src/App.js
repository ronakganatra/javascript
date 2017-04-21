/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Main, Content } from "./components/Layout";
import menuItems from "./config/Menu";
import MainMenu, { MainMenuRoutes } from "./components/Menu";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import colors from "yoast-components/style-guide/colors.json";
import { IntlProvider } from "react-intl";
import DebugInfo from "./components/DebugInfo";
import { Logo } from "./components/Logo";
import SitesPageContainer from "./containers/SitesPage";
import SitePageContainer from "./containers/SitePage";
import OrderPage from "./components/OrderPage";

/*
 * Helper method to write global CSS.
 * Only use it for the rare @font-face definition or body styling.
 */
injectGlobal`
	body {
		margin: 0;
		padding: 0;
		font: normal 16px/1.5 "Open Sans", sans-serif;
		font-size: 1rem;
		min-height: 100%;
		background: ${colors.$color_grey_light};
	}
`;

let orders = [
	{
		productId: "1",
		date: new Date( "05/20/2012" ),
		orderNumber: "MOOIE 123 TEST",
		items: "TEST ITEM",
		total: 10010,
		currency: "EUR",
		status: "Failed",
	}, {
		productId: "2",
		date: new Date( "04/04/2012" ),
		orderNumber: "MOOIE 456 TEST",
		items: "TEST ITEM",
		total: 40010,
		currency: "USD",
		status: "Failed",
	}, {
		productId: "3",
		date: new Date( "01/17/2017" ),
		orderNumber: "MOOIE 789 TEST",
		items: "TEST ITEM",
		total: 12000,
		currency: "USD",
		status: "Failed",
	} ];

let onClickInvoice = () => {
	console.log( "Invoice clicked" );
};

let searchProps = {
	id: "orderSearchBar",
	description: "I am an order search bar",
	descriptionId: "I am an order search bar id",
	onChange: () => {},
};

class App extends Component {
	render() {
		return (
			<IntlProvider locale="en">
				<Provider store={ this.props.store }>
					<ConnectedRouter history={ this.props.history }>
						<Layout>
							<Sidebar>
								<header role="banner">
									<Logo size="200px" />
								</header>
								<UserStatus/>
								<MainMenu menuRoutes={ menuItems }  />
							</Sidebar>
							<Main>
								<DebugInfo />
								<Content>
									<Route exact path="/" component={ SitesPageContainer } />
									<Route path="/sites/:id" component={ SitePageContainer } />
									<MainMenuRoutes menuRoutes={ menuItems }  />
									<OrderPage orders={ orders } onClickInvoice={ onClickInvoice } searchProps={ searchProps } />
								</Content>
							</Main>
						</Layout>
					</ConnectedRouter>
				</Provider>
			</IntlProvider>
		);
	}
}

App.propTypes = {
	store: React.PropTypes.object,
	history: React.PropTypes.object,
};

export default App;
