import React from "react";
import { defineMessages, injectIntl } from "react-intl";

// Components.
import LoginMessagePaper from "./LoginMessagePaper";

const messages = defineMessages( {
	header: {
		id: "login.header",
		defaultMessage: "Welcome back!",
	},
	message: {
		id: "login.message",
		defaultMessage: "Log in with your email address and password. If you don't remember your password, just reset it!",
	},
} );

/**
 * A function that returns the Courses Page component.
 *
 * @returns {ReactElement} The component that contains the courses page.
 */
class LoginPage extends React.Component {
	/**
	 * Sets the CoursesPage object.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();
	}

	render() {
		return (
			<LoginMessagePaper header={ messages.header } message={ messages.message }/>
		);
	}
}

export default injectIntl( LoginPage );

