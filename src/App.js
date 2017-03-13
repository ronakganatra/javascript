/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "./App.css";
import "normalize.css/normalize.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Main, Content } from "./components/Layout";
import menuItems from "./config/Menu";
import { MainMenu, MainMenuRoutes } from "./components/Menu";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import colors from "yoast-components/style-guide/colors.json";

/*
 * Helper method to write global CSS.
 * Only use it for the rare @font-face definition or body styling.
 */
injectGlobal`
	body {
		margin: 0;
		padding: 0;
		font-family: "Open Sans", sans-serif;
		min-height: 100%;
		background: ${colors.$background};
	}
`;

class App extends Component {
	render() {
		return (

		<Provider store={this.props.store}>
			<Router>
				<Layout>
					<Sidebar>
						<UserStatus/>

						<MainMenu menuRoutes={ menuItems }  />
					</Sidebar>
					<Main>
						<Content>
							<MainMenuRoutes menuRoutes={ menuItems }  />
						</Content>
					</Main>
				</Layout>
			</Router>
		</Provider>
		);
	}
}

App.propTypes = {
	store: React.PropTypes.object,
};

export default App;
