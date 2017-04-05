/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Main, Content } from "./components/Layout";
import menuItems from "./config/Menu";
import { MainMenu, MainMenuRoutes } from "./components/Menu";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import colors from "yoast-components/style-guide/colors.json";
import { IntlProvider } from "react-intl";
import DebugInfo from "./components/DebugInfo";
import { Logo } from "./components/Logo";
import SitesPageContainer from "./containers/SitesPage";
import premiumIcon from "./icons/Yoast/Yoast_SEO_Icon_Small.svg";
import SiteSubscriptionDetail from "./components/SiteSubscriptionDetail";

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

class App extends Component {
	render() {
		let subscription = {
			isEnabled: true,
			productName: "SEO premium for WordPress",
			productLogo: premiumIcon,
			slots: {
				amountAvailable: 20,
				amountUsed: 14,
				addMoreSlots: "Add more slots for $69",
				onAddMoreSlotsClick: () => {
					console.log( "Add more slots" );
				},
			},
			onToggleSubscription: () => {
				console.log( "on toggle subscription" );
			},
			onMoreInfoClick: () => {
				console.log( "on more info click" );
			},
			onSettingsClick: () => {
				console.log( "on settings click" );
			},
		};

		return (
			<IntlProvider locale="en">
				<Provider store={this.props.store}>
					<Router>
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
									<MainMenuRoutes menuRoutes={ menuItems }  />
									<SiteSubscriptionDetail { ...subscription } />
								</Content>
							</Main>
						</Layout>
					</Router>
				</Provider>
			</IntlProvider>
		);
	}
}

App.propTypes = {
	store: React.PropTypes.object,
};

export default App;
