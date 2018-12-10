import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import UserStatus from "../containers/UserStatus";
import menuItems from "../config/Menu";
import MainMenu from "../components/Menu";
import { defineMessages, FormattedMessage } from "react-intl";
import DebugInfo from "../components/DebugInfo";
import { Logo } from "../components/Logo";
import SkipLink from "../components/SkipLink";
import BeaconButtonContainer from "../containers/BeaconButton";
import GettingStartedModalContainer from "../containers/GettingStartedModal";
import MobileHeaderContainer from "../containers/MobileHeaderContainer";
import MediaQuery from "react-responsive";
import { WhitePage } from "../components/PaperStyles";
import loginBackground from "../images/login-background.jpg";
import RenewalNotificationContainer from "../containers/RenewalNotification";

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

const LayoutLogin = styled.div`
	background: ${colors.$color_pink_dark} url( ${ loginBackground } ) no-repeat 100% 0;
	background-size: cover;

	font-family: "Open Sans", sans-serif;
	color: #000;

	display: flex;
	min-height: 100%;
`;

const Sidebar = styled.div`
	flex: 0 0 300px;
	background-color: ${colors.$color_pink_dark};
	// Firefox needs this for user-email break word to work inside flex items.
	max-width: 300px;
	padding-left: 16px;

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
	margin: 0 2%;
	padding: 24px 0;
	// Firefox needs this for site-name break word to work.
	min-width: 0;

	@media screen and ( max-width: 1024px ) {
		margin: 48px 4% 0 4%;
		padding: 24px 0 100px 0;
		position: relative;
		z-index: 0;
	}
`;

const SingleMain = styled( Main )`
	margin: 48px 2% 0 2%;
`;

const Content = styled.div`
	max-width: 1200px;
	margin: 0 auto;

	@media screen and ( max-width: 1024px ) {
		margin: 0 auto;
	}
`;

Main.propTypes = {
	id: PropTypes.string,
};

Main.defaultProps = {
	id: "content",
};

const WhitePaper = styled( WhitePage )`
	margin: auto;
	padding: 48px;
`;

/**
 * Wraps a component in the layout used for the login.
 *
 * @param {ReactElement} WrappedComponent The React component to wrap.
 *
 * @returns {ReactElement} The login layout with the wrapped component.
 */
export const inLoginLayout = ( WrappedComponent ) => {
	return class LoginLayout extends Component {
		/**
		 * Renders the component.
		 *
		 * @returns {ReactElement} The rendered component.
		 */
		render() {
			return (
				<LayoutLogin>
					<WhitePaper>
						<WrappedComponent { ...this.props } />
					</WhitePaper>
				</LayoutLogin>
			);
		}
	};
};

/**
 * Wraps a component in the single column layout.
 *
 * @param {ReactElement} WrappedComponent The React component to wrap.
 *
 * @returns {ReactElement} The single column layout with the wrapped component.
 */
export const inSingleLayout = ( WrappedComponent ) => {
	return class SingleLayout extends Component {
		/**
		 * Renders the component.
		 *
		 * @returns {ReactElement} The rendered component.
		 */
		render() {
			return (
				<Layout>
					<SkipLink>
						<FormattedMessage id="skiplink" defaultMessage="Skip to main content" />
					</SkipLink>
					<MobileHeaderContainer { ...this.props } detailPage={ true } />
					<SingleMain>
						<Content>
							<RenewalNotificationContainer />
							<WrappedComponent { ...this.props } />
							<GettingStartedModalContainer />
						</Content>
					</SingleMain>
				</Layout>
			);
		}
	};
};

/**
 * Wraps a component in the main layout.
 *
 * @param {ReactElement} WrappedComponent The React component to wrap.
 *
 * @returns {ReactElement} The main layout with the wrapped component.
 */
export const inMainLayout = ( WrappedComponent ) => {
	return class MainLayout extends Component {
		/**
		 * Renders the component.
		 *
		 * @returns {ReactElement} The rendered component.
		 */
		render() {
			return (
				<Layout>
					<SkipLink>
						<FormattedMessage id="skiplink" defaultMessage="Skip to main content" />
					</SkipLink>
					<MediaQuery query="(max-width: 1024px)">
						<MobileHeaderContainer detailPage={ false } />
					</MediaQuery>
					<Sidebar>
						<MediaQuery query="(min-width: 1025px)">
							<header>
								<Logo context="sidebar" size="200px" />
							</header>
						</MediaQuery>
						<UserStatus />
						<MainMenu menuRoutes={ menuItems } />
						<DebugInfo />
					</Sidebar>
					<Main>
						<BeaconButtonContainer>
							<FormattedMessage id="beacon.id" defaultMessage={ messages.beacon.defaultMessage } />
						</BeaconButtonContainer>
						<Content>
							<RenewalNotificationContainer />
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
