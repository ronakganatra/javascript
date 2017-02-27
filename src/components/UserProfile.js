import React from "react";

export default function UserProfile( props ) {
	let loggedIn = null;
	if ( props.loggedIn ) {
		loggedIn = "You are logged in!";
	}

	return <div>
		{loggedIn}

		<img src="" />

		{ props.displayName }

		<button type="button" onClick={props.onLogoutClick}>Logout</button>
	</div>
}

UserProfile.propTypes = {
	displayName: React.PropTypes.string.isRequired,
	onLogoutClick: React.PropTypes.func.isRequired,
	loggedIn: React.PropTypes.bool,
};

UserProfile.defaultProps = {
	displayName: "",
	loggedIn: false
};
