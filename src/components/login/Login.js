import PropTypes from "prop-types";
import React from "react";
import { intlShape, injectIntl } from "react-intl";

// Components.
import LoginForm from "./LoginForm";
import { prepareInternalRequest, doRequest } from "../../functions/api";
import { authenticate, hasWPCookie, redirectToOAuthUrl } from "../../functions/auth";


/**
 * Login component for logging in to MyYoast.
 */
class Login extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			email: "",
			password: "",
			errors: this.props.errors,
			rememberMe: false,
		};

		this.handleSubmit = this.handleSubmit.bind( this );
		this.onRememberCheck = this.onRememberCheck.bind( this );
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
	 * Opens the door to the treasures of MyYoast,
	 * if their credentials are correctly filled in.
	 * @param {Object} event The event
	 * @returns {Object} request The Request
	 */
	handleSubmit( event ) {
		event.preventDefault();
		let params = { email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe };
		let request = prepareInternalRequest( "Customers/login/", "POST", params, { credentials: "include" } );
		doRequest( request )
			.then( () => {
				authenticate()
					.then( ( userId ) => {
						// Redirect to home.
					} )
					.catch( () => {
						// If the user has already logged in on WordPress, but the OAuth authentication fails, redirect to OAuth manually.
						if ( hasWPCookie() ) {
							redirectToOAuthUrl();
						}
						// Else, don't do anything while the user fills out the login/signup forms.
					} );
			} )
			.catch( ( error ) => {
				this.setState( {
					errors: error,
				} );
			} );
	}

	render() {
		return (
			<LoginForm rememberMe={this.state.rememberMe}
			           email={this.state.email}
			           password={this.state.password}
			           errors={this.state.errors}
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
	errors: PropTypes.object,
};

Login.defaultProps = {
	errors: null,
};

export default injectIntl( Login );
