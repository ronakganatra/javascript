import PropTypes from "prop-types";
import React from "react";
import { intlShape, injectIntl } from "react-intl";

// Components.
import LoginForm from "./LoginForm";
import {
	directToIntendedDestination,
	hasAccessToken,
	hasWPCookie,
	redirectToOAuthUrl,
	shouldBeRedirected,
} from "../../functions/auth";
import getEnv from "../../functions/getEnv";


/**
 * Login component for logging in to MyYoast.
 */
class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			email: "",
			password: "",
			rememberMe: false,
		};

		this.onRememberCheck = this.onRememberCheck.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.onUpdateEmail = this.onUpdateField.bind( this, "email" );
		this.onUpdatePassword = this.onUpdateField.bind( this, "password" );
	}

	/**
	 * Event listener, listening to changes of the
	 * 'remember me' checkbox (e.g. whether it is checked or not).
	 * @param {Object} event the input change event.
	 * @returns {void}
	 */
	onRememberCheck( event ) {
		this.setState( {
			rememberMe: event.target.checked,
		} );
	}

	/**
	 * Updates the specified field in the state,
	 * to be used as callback functions in text input fields.
	 *
	 * @param {string} field the field in the state that should be updated.
	 * @param {Object} event the input field change event.
	 * @returns {void}
	 */
	onUpdateField( field, event ) {
		let obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	/**
	 * Handles the login submit by attempting a login.
	 *
	 * @param {Object} event The event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		let data = { email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe };
		this.props.attemptLogin( data );
	}

	shouldComponentUpdate() {
		if ( this.props.oauthError && hasWPCookie() ) {
			redirectToOAuthUrl();
			return false;
		}
		if ( hasWPCookie() && hasAccessToken() ) {
			if ( shouldBeRedirected() ) {
				directToIntendedDestination();
				return false;
			}
			document.location.href = getEnv( "HOME_URL", "http://my.yoast.test:3001" );
			return false;
		}

		return true;
	}

	render() {
		return (
			<LoginForm rememberMe={this.state.rememberMe}
			           email={this.state.email}
			           password={this.state.password}
			           errors={this.props.error}
			           loading={this.props.loading}
			           onUpdateEmail={this.onUpdateEmail}
			           onUpdatePassword={this.onUpdatePassword}
			           onRememberCheck={this.onRememberCheck}
			           handleSubmit={this.handleSubmit}
			/>
		);
	}
}

Login.propTypes = {
	intl: intlShape.isRequired,
	error: PropTypes.object,
	attemptLogin: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	oauthError: PropTypes.bool,
};

Login.defaultProps = {
	error: null,
	loading: false,
};

export default injectIntl( Login );
