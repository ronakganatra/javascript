import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl } from "react-intl";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import LoginMessage from "./LoginMessage";
import Signup from "./Signup";

const messages = defineMessages( {
	header: {
		id: "login.header",
		defaultMessage: "Welcome back!",
	},
	message: {
		id: "login.message",
		defaultMessage: "Log in with your email address and password. If you don't remember your password, just reset it!",
	},
	headerReset: {
		id: "login.headerReset",
		defaultMessage: "Password changed successfully!",
	},
	button: {
		id: "login.button",
		defaultMessage: "Continue to MyYoast",
	},
} );

/**
 * Test page to test the login layout / styling.
 */
class LoginPage extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<LoginColumnLayout>
				<LoginMessage header={ messages.header } message={ messages.message } />
				<Signup />
			</LoginColumnLayout>
		);
	}
}

LoginPage.propTypes = {
	children: PropTypes.array,
};

export default injectIntl( LoginPage );
