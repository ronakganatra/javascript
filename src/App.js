import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import UserStatus from './containers/UserStatus';
import { Layout, Sidebar, Content } from "./components/Layout";
import { MainMenu, Subscriptions, Account, Sites, Courses } from "./components/Menu";

import { Provider} from "react-redux";


class App extends Component {
	render() {
        const routes = [
            { path: '/',
                exact: true,
                sidebar: () => <div>home!</div>,
                main: () => <h2>Home</h2>
            },
            { path: '/bubblegum',
                sidebar: () => <div>bubblegum!</div>,
                main: () => <h2>Bubblegum</h2>
            },
            { path: '/shoelaces',
                sidebar: () => <div>shoelaces!</div>,
                main: () => <h2>Shoelaces</h2>
            }
        ]

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
			{/*<Router>*/}
                {/*<Layout>*/}
					{/*<Route component={Sidebar}>*/}
						{/*<Route component={UserStatus} />*/}

						{/*<Route component={MainMenu} />*/}
					{/*</Route>*/}
					{/*<Route>*/}
						{/*<Route path="subscriptions" component={Subscriptions} />*/}
						{/*<Route path="courses" component={Courses} />*/}
						{/*<Route path="sites" component={Sites} />*/}
						{/*<Route path="account" component={Account} />*/}
					{/*</Route>*/}
                {/*</Layout>*/}
			{/*</Router>*/}
		</Provider>
		);
	}
}

export default App;
