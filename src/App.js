import React, { Component } from "react";
import "./App.css";
import "normalize.css/normalize.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Content } from "./components/Layout";
import menuItems from "./config/Menu";
import { MainMenu, MainMenuRoutes } from "./components/Menu";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

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

					<Content>
						<MainMenuRoutes menuRoutes={ menuItems }  />
					</Content>
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
