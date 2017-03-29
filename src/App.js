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
import AddSiteModal from "./components/AddSiteModal";

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
	constructor( props ) {
		super( props );

		this.state = {
			modalOpen: true,
		};

		this.openModal = this.openModal.bind( this );
		this.closeModal = this.closeModal.bind( this );
		this.link = this.link.bind( this );
	}

	openModal() {
		this.setState( {
			modalOpen: true,
		} );
	}

	closeModal() {
		console.log( "Closing" );

		this.setState( {
			modalOpen: false,
		} );
	}

	link() {
		console.log( "Linking (and closing)" );

		this.setState( {
			modalOpen: false,
		} );
	}

	render() {
		console.log( "Modal open: " + this.state.modalOpen );
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
									<button onClick={ () => {
										this.openModal();
									} }>
										Gandalf! Give me a modal!
									</button>
									<AddSiteModal onClose={ this.closeModal } onLink={ this.link } isOpen={ this.state.modalOpen } />
								</Content>
							</Main>
						</Layout>
					</Router>
				</Provider>
			</IntlProvider>
		);
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( {
			modalOpen: true,
		} );
		// }
	}
}

App.propTypes = {
	store: React.PropTypes.object,
};

export default App;
