import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";

import SubNavigation, { SubNavigationItem } from "../SubNavigation";

import Login from "./Login";
import Signup from "./Signup";

let itemRoutes = [
	{
		component: Signup,
		path: "/signup",
		title: "Sign up",
	},
	{
		component: Login,
		path: "/login",
		title: "Login",
	},
];

/**
 * Login / sign up column for on the standard login page.
 */
class LoginSignup extends React.Component {

	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div>
				<SubNavigation itemRoutes={ itemRoutes } />
				<SubNavigationItem itemRoutes={ itemRoutes } />
			</div>
		);
	}
}

LoginSignup.propTypes = {
	children: PropTypes.array,
};

export default injectIntl( LoginSignup );
