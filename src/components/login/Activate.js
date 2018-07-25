import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import PropTypes from "prop-types";
import queryString from "query-string";

// Images;
import { Redirect } from "react-router";

// Components;
import LoginMessage from "./LoginMessage";

const messages = defineMessages( {
	message: {
		id: "profileDetails.activating",
		defaultMessage: "We are activating your MyYoast account. Please stay with us for a little while longer.",
	},
	header: {
		id: "profileDetails.loggingIn.header",
		defaultMessage: "Logging in...",
	},
} );

/**
 * Component in first login flow, where the user is asked to
 * enter some personal details: first name, last name and profile image.
 */
class Activate extends React.Component {

	constructor( props ) {
		super( props );
		let parsedQuery = queryString.parse( this.props.location.search, { arrayFormat: "bracket" } );

		// Default state.
		this.state = {
			key: parsedQuery.key || "",
		};

		this.props.activateUser( this.state.key );
	}

	render() {
		if ( this.props.isLoggedIn ) {
			return ( <Redirect to={"/enter-details"}/> );
		}
		return (
			<LoginMessage { ...messages } />
		);
	}
}

export default injectIntl( Activate );

Activate.propTypes = {
	intl: intlShape.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	activateUser: PropTypes.func.isRequired,
	location: PropTypes.object,
};

Activate.defaultProps = {
	isLoggedIn: false,
};
