import React, { Fragment } from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import PropTypes from "prop-types";
import queryString from "query-string";
import styled from "styled-components";

// Images;
import { Redirect } from "react-router";

// Components;
import LoginMessage from "./LoginMessage";
import ErrorDisplay from "../../errors/ErrorDisplay";

const StyledErrorDisplay = styled( ErrorDisplay )`
	max-width: 480px;
	align-content: center;
`;

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
	header: {
		id: "profileDetails.alreadyactive.header",
		defaultMessage: "Your account was already activated",
	},
	message: {
		id: "profileDetails.login.now",
		defaultMessage: "Login now",
	},
} );

const generalActivationFailureMessages = defineMessages( {
	header: {
		id: "profileDetails.generalActivationFailure.header",
		defaultMessage: "Activating your account failed",
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

		if ( ! this.props.loading && ! this.props.loggedIn ) {
			this.props.activateUser( this.state.key );
		}

		this.resetOauthError = this.resetOauthError.bind( this );
	}

	resetOauthError() {
		this.props.resetOauthError();
	}

	hasError() {
		return this.props.activationError && this.props.activationError.error;
	}

	alreadyActiveError() {
		return this.props.activationError.error.code === "already_active";
	}

	render() {
		if ( this.props.loggedIn ) {
			return ( <Redirect to={ "/enter-details" }/> );
		}

		if ( this.hasError() ) {
			if ( this.alreadyActiveError() ) {
				return <LoginMessage { ...userAlreadyActiveMessages }
				                     buttonLinkTo="/login"
				                     onClick={ this.props.resetOauthError }
				/>;
			}
			return ( <Fragment>
					<LoginMessage { ...generalActivationFailureMessages } />
					<StyledErrorDisplay error={ this.props.activationError }/>
				</Fragment>
			);
		}

		return <LoginMessage { ...activatingMessages } />;
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
	resetOauthError: PropTypes.func.isRequired,
};

Activate.defaultProps = {
	loggedIn: false,
	activationError: null,
};
