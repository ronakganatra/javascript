import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import UserStatus from "../containers/UserStatus";
import menuItems from "../config/Menu";
import MainMenu from "../components/Menu";
import { FormattedMessage, defineMessages } from "react-intl";
import DebugInfo from "../components/DebugInfo";
import { Logo } from "../components/Logo";
import SkipLink from "../components/SkipLink";
import BeaconButtonContainer from "../containers/BeaconButton";
import GettingStartedModalContainer from "../containers/GettingStartedModal";
import MobileHeaderContainer from "../containers/MobileHeaderContainer";
import MediaQuery from "react-responsive";

const messages = defineMessages( {
	beacon: {
		id: "needhelp",
		defaultMessage: "Need help?",
	},
} );

const Layout = styled.div`
	display: flex;
	min-height: 100%;

	@media screen and ( max-width: 1024px ) {
		display: block;
		min-height: 0;
	}
`;

const Sidebar = styled.div`
	flex: 0 0 300px;
	background-color: ${colors.$color_pink_dark};
	// Firefox needs this for user-email break word to work inside flex items.
	max-width: 300px;
	padding-left: 20px;

	@media screen and ( max-width: 1024px ) {
		position: fixed;
		z-index: 1;
		width: 100%;
		height: 74px;
		bottom: 0;
		max-width: none;
		padding-left: 0;

		& header,
		& .user-info {
		 display: none;
		}
	}
`;


const Main = styled.main`
	flex: 1 1 auto;
	background: ${colors.$color_grey_light};
	margin: 42px 2%;
	padding: 40px 0;
	// Firefox needs this for site-name break word to work.
	min-width: 0;

	@media screen and ( max-width: 1024px ) {
		margin: 4% 4% 0 4%;
		padding: 40px 0 100px 0;
		position: relative;
		z-index: 0;
	}
`;

const Content = styled.div`
	max-width: 1200px;
	margin: 0 auto;

	@media screen and ( max-width: 1024px ) {
		margin: 0 auto;
	}
`;

Main.propTypes = {
	id: React.PropTypes.string,
};

Main.defaultProps = {
	id: "content",
};

export const inSingleLayout = ( WrappedComponent ) => {
	return class SingleLayout extends Component {
		render() {
			return (
				<Layout>
					<header role="banner">
						<MobileHeaderContainer/>
					</header>
					<Main>
						<Content>
							<WrappedComponent { ...this.props } />
							<GettingStartedModalContainer />
						</Content>
					</Main>
				</Layout>
			);
		}
	};
};

export const inMainLayout = ( WrappedComponent ) => {
	return class MainLayout extends Component {
		render() {
			return (
				<Layout>
					<header role="banner">
						<SkipLink>
							<FormattedMessage id="skiplink" defaultMessage="Skip to main content" />
						</SkipLink>
						<MediaQuery query="(max-width: 1024px)">
							<MobileHeaderContainer/>
						</MediaQuery>
					</header>
					<Sidebar>
						<MediaQuery query="(min-width: 1025px)">
							<Logo context="sidebar" size="200px"/>
						</MediaQuery>
						<UserStatus/>
						<MainMenu menuRoutes={ menuItems }  />
						<DebugInfo />
					</Sidebar>
					<Main>
						<BeaconButtonContainer>
							<FormattedMessage id="beacon.id" defaultMessage={ messages.beacon.defaultMessage } />
						</BeaconButtonContainer>
						<Content>
							<WrappedComponent { ...this.props } />
							<GettingStartedModalContainer />
						</Content>
					</Main>
				</Layout>
			);
		}
	};
};

export default inMainLayout;
