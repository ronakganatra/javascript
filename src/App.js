/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import colors from "yoast-components/style-guide/colors.json";
import { injectGlobal } from "styled-components";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { MainMenuRoutes } from "./components/Menu";
import menuItems from "./config/Menu";

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
		return (
			<IntlProvider locale="en">
				<Provider store={ this.props.store }>
					<ConnectedRouter history={ this.props.history }>
						<MainMenuRoutes menuRoutes={ menuItems }  />
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
