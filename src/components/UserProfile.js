import React from "react";

/**
 * @param {Object} props Component props.
 * @param {boolean} props.loggedIn Whether or not we are currently logged in.
 * @returns {ReactElement} A react component.
 * @constructor
 */
export default function UserProfile( props ) {
	let loggedIn = null;
	if ( props.loggedIn ) {
		loggedIn = "You are logged in!";
	}

	return <aside>
		{loggedIn}

		<img src="" alt="" />

		{ props.displayName }

		<button type="button" onClick={props.onLogoutClick}>Logout</button>
	</aside>;
}

UserProfile.propTypes = {
	displayName: React.PropTypes.string.isRequired,
	onLogoutClick: React.PropTypes.func.isRequired,
	loggedIn: React.PropTypes.bool,
};

UserProfile.defaultProps = {
	displayName: "",
	loggedIn: false,
};
