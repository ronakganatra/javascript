import React, { Component } from "react";
import "./App.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Content } from "./components/Layout";
import { Provider } from "react-redux";

class App extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<Layout>
					<Sidebar>
						<UserStatus />
					</Sidebar>
					<Content>
					</Content>
				</Layout>
			</Provider>
		);
	}
}

App.propTypes = {
	store: React.PropTypes.object,
};

export default App;
