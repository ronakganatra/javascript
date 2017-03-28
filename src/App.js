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
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import colors from "yoast-components/style-guide/colors.json";
import { IntlProvider } from "react-intl";
import DebugInfo from "./components/DebugInfo";

import { Logo } from "./components/Logo";

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

	.ReactModal__Body--open {
		overflow: hidden;
	}
`;

class App extends Component {
	render() {
		return (
			<IntlProvider locale="en">
				<Provider store={this.props.store}>
					<Router>
						<Layout>
							<Redirect from='/' to='/sites'/>
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
									<MainMenuRoutes menuRoutes={ menuItems }  />
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
