import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl } from "react-intl";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import LoginMessage from "./LoginMessage";
import SignupContainer from "../../containers/Signup";
import LoginContainer from "../../containers/Login";
import SubNavigation, { SubNavigationItem } from "../SubNavigation";

let itemRoutes = [
	{
		component: SignupContainer,
		path: "/signup",
		title: "Sign up",
	},
	{
		component: LoginContainer,
		path: "/login",
		title: "Login",
	},
];

const messages = defineMessages( {
	loginHeader: {
		id: "login.header",
		defaultMessage: "Welcome back!",
	},
	loginMessage: {
		id: "login.message",
		defaultMessage: "Log in with your email address and password. If you don't remember your password, just reset it!",
	},
	signupHeader: {
		id: "signup.header",
		defaultMessage: "Welcome!",
	},
	signupMessage: {
		id: "signup.message",
		defaultMessage: "MyYoast is the portal to all things Yoast. Whether you want to comment on a post, " +
		"take our free SEO for beginners training or find a product you have purchased: it's all there!",
	},
	button: {
		id: "login.button",
		defaultMessage: "Continue to MyYoast",
	},
} );

/**
 * Test page to test the login layout / styling.
 */
class LoginSignupPage extends React.Component {

	getLoginMessage() {
		if ( this.props.location.pathname === "/login" || this.props.location.pathname === "/login/" ) {
			return <LoginMessage header={ messages.loginHeader } message={ messages.loginMessage } />;
		}
		return <LoginMessage header={ messages.signupHeader } message={ messages.signupMessage } />;
	}

	render() {
		return (
			<LoginColumnLayout>
				{ this.getLoginMessage() }
				<div>
					<SubNavigation itemRoutes={ itemRoutes } />
					<SubNavigationItem itemRoutes={ itemRoutes } />
				</div>
			</LoginColumnLayout>
		);
	}
}

LoginSignupPage.propTypes = {
	children: PropTypes.array,
	location: PropTypes.object,
};

export default injectIntl( LoginSignupPage );
