import React, { Component } from "react";
import "./App.css";
import "normalize.css/normalize.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Content } from "./components/Layout";
import { MainMenu, Subscriptions, Courses, Account, Sites } from "./components/Menu";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {
	render() {
		return (

		<Provider store={this.props.store}>
			<Router>
				<Layout>
					<Sidebar>
						<UserStatus/>

						<MainMenu/>
					</Sidebar>

					<Content>
						<Route path="/subscriptions" component={Subscriptions} />
						<Route path="/courses" component={Courses} />
						<Route path="/sites" component={Sites} />
						<Route path="/account" component={Account} />
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
