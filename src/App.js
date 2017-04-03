/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import "normalize.css/normalize.css";
import "./App.css";
import UserStatus from "./containers/UserStatus";
import { Layout, Sidebar, Main, Content } from "./components/Layout";
import menuItems, { Sites } from "./config/Menu";
import { MainMenu, MainMenuRoutes } from "./components/Menu";
import { Provider } from "react-redux";
import { injectGlobal } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import colors from "yoast-components/style-guide/colors.json";
import { IntlProvider } from "react-intl";
import DebugInfo from "./components/DebugInfo";
import { Logo } from "./components/Logo";

import { Table, Zebra } from "./components/Tables";
import Paper from "./components/Paper";
import Subscription from "./components/Subscription";


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
									<Route exact path="/" component={ Sites } />
									<MainMenuRoutes menuRoutes={ menuItems }  />

									<Table>
										<Paper>
											<Zebra>
												<Subscription id="a" icon="https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png" name="SEO Premium for WordPress"
												              used={ 14 } max={ 20 }
												              nextBilling={ new Date() }
												              billingAmount={ 125.12 }
												              billingCurrency="$"
												              onManage={ () => {
													              console.log( "clicked on manage button" );
												              } }
												              />
												<Subscription id="b" icon="https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png" name="SEO Premium for WordPress"
												              used={ 4 } max={ 10 }
												              nextBilling={ new Date() }
												              billingAmount={ 125.12 }
												              billingCurrency="$"
												              onManage={ () => {
													              console.log( "clicked on manage button" );
												              } }
												              />
											</Zebra>
										</Paper>
									</Table>

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
