import React, { Fragment } from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import queryString from "query-string";
import styled from "styled-components";

// Images;
import { Redirect } from "react-router";

// Components;
import LoginMessage from "./LoginMessage";
import { ButtonLink } from "../Button";
import ErrorDisplay from "../../errors/ErrorDisplay";

const LoginButton = styled( ButtonLink )`
	display: block;
	margin: 1em auto;
	width:100%;
`;

const StyledErrorDisplay = styled( ErrorDisplay )`
	max-width: 480px;
	align-content: center;
`;

const messages = defineMessages( {
	loginNow: {
		id: "profileDetails.login.now",
		defaultMessage: "Login now",
	},
} );

const activatingMessages = defineMessages( {
	message: {
		id: "profileDetails.activating",
		defaultMessage: "We are activating your MyYoast account. Please stay with us for a little while longer.",
	},
	header: {
		id: "profileDetails.loggingIn.header",
		defaultMessage: "Logging in...",
	},
} );

const userAlreadyActiveMessages = defineMessages( {
	message: {
		id: "profileDetails.alreadyactive",
		defaultMessage: "Your account has already been activated. {login}",
		values: { login: <LoginButton to={ "/login" }>
				<FormattedMessage { ...messages.loginNow }/>
			</LoginButton> },
	},
	header: {
		id: "profileDetails.alreadyactive.header",
		defaultMessage: "Your account was already activated",
	},
} );

/**
 * The activate component to activate the user. Activation and logging in happens automatically.
 * A link to the login window will be displayed when a user was already activated.
 */
class Activate extends React.Component {

	constructor( props ) {
		super( props );
		let parsedQuery = queryString.parse( this.props.location.search, { arrayFormat: "bracket" } );

		// Default state.
		this.state = {
			key: parsedQuery.key || "",
		};

		if ( ! this.props.loading ) {
			this.props.activateUser( this.state.key );
		}
	}

	render() {
		if ( this.props.loggedIn ) {
			return ( <Redirect to={ "/enter-details" }/> );
		}

		let errorDisplayContainer = null;

		let messages = activatingMessages;
		if ( this.alreadyActiveError() ) {
			messages = userAlreadyActiveMessages;
		} else {
			errorDisplayContainer = <StyledErrorDisplay error={ this.props.activationError }/>;
		}

		return ( <Fragment>
				<LoginMessage { ...messages } />
				{ errorDisplayContainer }
			</Fragment>

		);
	}

	alreadyActiveError() {
		return this.props.activationError && this.props.activationError.error && this.props.activationError.error.code === "already_active";
	}
}

export default injectIntl( Activate );

Activate.propTypes = {
	intl: intlShape.isRequired,
	loggedIn: PropTypes.bool.isRequired,
	activateUser: PropTypes.func.isRequired,
	location: PropTypes.object,
	activationError: PropTypes.object,
	loading: PropTypes.bool,
};

Activate.defaultProps = {
	loggedIn: false,
	activationError: null,
};
