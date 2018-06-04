import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";

import SubNavigation, { SubNavigationItem } from "../SubNavigation";

import Login from "./Login";
import Signup from "./Signup";

let itemRoutes = [
	{
		component: Login,
		path: "/login/login",
		title: "Login",
		isActive: ( match, location ) => {
			if ( match ) {
				return match;
			}

			return location.pathname === "/login" || location.pathname === "/login/";
		},
	},
	{
		component: Signup,
		path: "/login/signup",
		title: "Sign up",
	},
];

/**
 * Test page to test the login layout / styling.
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
				<SubNavigationItem itemRoutes={ [
					{
						path: "/login",
						component: Login,
					},
				] } />
			</div>
		);
	}
}

LoginSignup.propTypes = {
	children: PropTypes.array,
};

export default injectIntl( LoginSignup );
